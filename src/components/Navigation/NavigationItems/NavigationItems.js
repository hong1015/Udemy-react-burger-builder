import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';
const NavigationItems = (props) => (
<ul className={classes.navigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {/* <NavigationItem link="/checkout">Checkout</NavigationItem> */}
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/auth">Auth</NavigationItem>
</ul>
);

export default NavigationItems;
