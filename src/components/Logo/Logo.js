
import classes from './Logo.css';
import burgerLogo from '../../assets/images/logo.png';
const Logo = (props) => (
  <div className={classes.logo} style={{height: props.height}}>
    <img src={burgerLogo} alt="burger"></img>
  </div>
);

export default Logo;
