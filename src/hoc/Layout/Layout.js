import { Fragment, useState } from "react";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
const [sideDrawe, setSideDrawe] = useState(false)
const sideDrawerCloseHandler = () => {
  setSideDrawe(false);
}

const sideDrawerToggleHandler = () => {
  setSideDrawe((prev)=>{
    return !prev
  });
}
  return (
    <Fragment>
      <Toolbar clicked={sideDrawerToggleHandler} />
      <SideDrawer isShown={sideDrawe} clicked={sideDrawerCloseHandler}/>
      <main className={classes.content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
