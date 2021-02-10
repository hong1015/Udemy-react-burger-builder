import classes from "./CheckoutSummary.css";
import Burger from "../../Burger/Burger";
import Button from '../../UI/Button/Button';
const CheckoutSummary = (props) => {
  return (
    <div className={classes.summary}>
      <h1>well</h1>
      <div className={classes.wrap}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button clicked={props.cancel} btnType="Danger">cancel</Button>
      
      <Button clicked={props.continued} btnType="Success">move on</Button>
    </div>
  );
};

export default CheckoutSummary;
