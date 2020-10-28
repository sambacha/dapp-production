import React, { useState } from "react";
import { Box, TextInput, Button, IconToken } from "@aragon/ui";
import BigNumber from "bignumber.js";
import { recordVote } from "../../utils/web3";

import { ESDS } from "../../constants/tokens";

type ProposeCandidateProps = {
  user: string;
  stake: BigNumber;
  totalStake: BigNumber;
  accountStatus: number;
};

function canPropose(stake: BigNumber, totalStake: BigNumber): boolean {
  return stake.div(totalStake).comparedTo(new BigNumber("0.01")) >= 0;
}

function plausibleCandidate(candidate: string): boolean {
  return /^(0x)[0-9a-fA-F]{40}$/i.test(candidate);
}

function ProposeCandidate({
  user,
  stake,
  totalStake,
  accountStatus,
}: ProposeCandidateProps) {
  const [candidate, setCandidate] = useState("0x");

  return (
    <Box heading="Propose">
      <div style={{ display: "flex" }}>
        {/* User balance */}
        <div style={{ width: "62%", paddingTop: "2%" }}>
          <>
            <TextInput
              wide
              value={candidate}
              onChange={(event) => {
                if (event.target.value) {
                  setCandidate(event.target.value);
                } else {
                  setCandidate("0x");
                }
              }}
            />
          </>
        </div>
        <div style={{ width: "6%" }} />
        {/* Purchase coupons */}
        <div style={{ width: "32%", paddingTop: "2%" }}>
          <Button
            wide
            icon={<IconToken />}
            label="Propose"
            onClick={() => {
              recordVote(
                ESDS.addr,
                candidate,
                1 // APPROVE
              );
            }}
            disabled={
              user === "" ||
              !canPropose(stake, totalStake) ||
              !plausibleCandidate(candidate) ||
              accountStatus === 1
            }
          />
        </div>
      </div>
    </Box>
  );
}

export default ProposeCandidate;
