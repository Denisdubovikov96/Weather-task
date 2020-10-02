import classes from "./Layout.module.scss";
import React from "react";
import Searchpanel from "../../components/Searchpanel/Searchpanel";

export default function Layout({ children }) {
  return (
    <div className={classes.layout}>
      <header>
        <Searchpanel />
      </header>
      <main>{children}</main>
    </div>
  );
}
