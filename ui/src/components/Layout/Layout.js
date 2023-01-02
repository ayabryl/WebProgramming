import { Fragment } from "react";

import NavigationBar from "./NavigationBar";
const Layout = (props) => {
  return (
    <Fragment>
      <NavigationBar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
