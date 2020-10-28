import React, { useEffect, useState } from "react";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Main } from "@aragon/ui";
import { updateModalMode } from "./utils/web3";
import { storePreference, getPreference } from "./utils/storage";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Trade from "./components/Trade/index";
import Footer from "./components/Footer";
import Wallet from "./components/Wallet";
import EpochDetail from "./components/EpochDetail";
import CouponMarket from "./components/CouponMarket";
import CouponEpoch from "./components/CouponEpoch";
import Governance from "./components/Governance";
import Candidate from "./components/Candidate";
import Regulation from "./components/Regulation";
import Pool from "./components/Pool";
import HomePageNoWeb3 from "./components/HomePageNoWeb3";

function App() {
  const storedTheme = getPreference("theme", "light");

  const [hasWeb3, setHasWeb3] = useState(false);
  const [user, setUser] = useState(""); // the current connected user
  const [theme, setTheme] = useState(storedTheme);

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    updateModalMode(newTheme);
    storePreference("theme", newTheme);
  };

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      if (!isCancelled) {
        // @ts-ignore
        setHasWeb3(typeof window.ethereum !== "undefined");
      }
    }

    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <Router>
      <Main assetsUrl={`${process.env.PUBLIC_URL}/aragon-ui/`} theme={theme}>
        <NavBar
          hasWeb3={hasWeb3}
          user={user}
          setUser={setUser}
          theme={theme}
          updateTheme={updateTheme}
        />
        {hasWeb3 ? (
          <Switch>
            <Route path="/wallet/:override">
              <Wallet user={user} />
            </Route>
            <Route path="/wallet/">
              <Wallet user={user} />
            </Route>
            <Route path="/epoch/">
              <EpochDetail user={user} />
            </Route>
            <Route path="/coupons/epoch/:epoch">
              <CouponEpoch user={user} />
            </Route>
            <Route path="/coupons/:override">
              <CouponMarket user={user} />
            </Route>
            <Route path="/coupons/">
              <CouponMarket user={user} />
            </Route>
            <Route path="/governance/candidate/:candidate">
              <Candidate user={user} />
            </Route>
            <Route path="/governance/">
              <Governance user={user} />
            </Route>
            <Route path="/trade/">
              <Trade user={user} />
            </Route>
            <Route path="/regulation/">
              <Regulation user={user} />
            </Route>
            <Route path="/pool/:override">
              <Pool user={user} />
            </Route>
            <Route path="/pool/">
              <Pool user={user} />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/">
              <HomePageNoWeb3 />
            </Route>
          </Switch>
        )}
        <div style={{ height: "128px", width: "100%" }} />
        <Footer theme={theme} />
      </Main>
    </Router>
  );
}

export default App;
