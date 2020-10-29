import React from "react";
import BigNumber from "bignumber.js";

import { BalanceBlock } from "../common/index";
import TextBlock from "../common/TextBlock";
import { ownership } from "../../utils/number";

type PoolPageHeaderProps = {
  accountUNIBalance: BigNumber;
  accountBondedBalance: BigNumber;
  accountRewardedESDBalance: BigNumber;
  accountClaimableESDBalance: BigNumber;
  poolTotalBonded: BigNumber;
  accountPoolStatus: number;
};

const STATUS_MAP = ["Frozen", "Fluid"];

const PoolPageHeader = ({
  accountUNIBalance,
  accountBondedBalance,
  accountRewardedESDBalance,
  accountClaimableESDBalance,
  poolTotalBonded,
  accountPoolStatus,
}: PoolPageHeaderProps) => (
  <div style={{ padding: "2%", display: "flex", alignItems: "center" }}>
    <div style={{ width: "20%" }}>
      <BalanceBlock
        asset="Balance"
        balance={accountUNIBalance}
        suffix={" UNI-V2"}
      />
    </div>
    <div style={{ width: "20%" }}>
      <BalanceBlock
        asset="Rewarded"
        balance={accountRewardedESDBalance}
        suffix={" EDI"}
      />
    </div>
    <div style={{ width: "20%" }}>
      <BalanceBlock
        asset="Claimable"
        balance={accountClaimableESDBalance}
        suffix={" EDI"}
      />
    </div>
    <div style={{ width: "20%" }}>
      <BalanceBlock
        asset="Pool Ownership"
        balance={ownership(accountBondedBalance, poolTotalBonded)}
        suffix={"%"}
      />
    </div>
    <div style={{ width: "20%" }}>
      <TextBlock label="Pool Status" text={STATUS_MAP[accountPoolStatus]} />
    </div>
  </div>
);

export default PoolPageHeader;
