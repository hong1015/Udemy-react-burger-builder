import classes from "./NavigationItem.css";
import { NavLink } from "react-router-dom";
const NavigationItem = (props) => (
  <li className={classes.navigationItem}>
    <NavLink to={props.link}
    exact={props.exact}
    activeClassName={classes.active}>{props.children}</NavLink>
  </li>
);

export default NavigationItem;
