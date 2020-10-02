import React from "react";

import classes from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={classes.lds_ellipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
