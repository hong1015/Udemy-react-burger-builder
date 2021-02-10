import { Fragment } from "react";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {

    let sttachedClasses = [classes.sideDrawer, classes.close];
    if(props.isShown){
        sttachedClasses =[classes.sideDrawer, classes.open]
    }

  return (
    <Fragment>
      <Backdrop show={props.isShown} clicked={props.clicked} ></Backdrop>
      <div className={sttachedClasses.join(' ')}>
        <div className={classes.logoWrap}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
