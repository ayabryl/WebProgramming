import { Fragment } from "react";

import NavigationBar from "./NavigationBar";
import { SearchContext, SearchProvider } from "../../contexts/SearchContext";

const Layout = (props) => {
  return (
    <Fragment>
      <NavigationBar />

      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
