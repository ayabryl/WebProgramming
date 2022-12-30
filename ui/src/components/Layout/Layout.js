import { Fragment } from "react";

import MainNavigation from "./MainNavigation";
import NavigationBar from "./NavigationBar";
const Layout = (props) => {
  return (
    <Fragment>
      {/* <MainNavigation /> */}
      <NavigationBar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
