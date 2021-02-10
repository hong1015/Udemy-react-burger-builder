import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const BuildControls = (props) => (
  <div className={classes.buildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        addHandler={() => props.addIngredient(ctrl.type)}
        removeHandler={() => props.removeIngredient(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button className={classes.OrderButton} disabled={!props.isPurchaseable} onClick={props.orderNow}>ORDER NOW</button>
  </div>
);

export default BuildControls;
