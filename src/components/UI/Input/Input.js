import classes from "./Input.css";
const Input = (props) => {
  let inputEl = null;
  let inputClasses = [classes.InputEl]; 
  let validationError = null;

if(props.isTouched && props.invalid && props.isRequired){
  validationError = <p>Please enter a valid value!</p>;
  inputClasses.push(classes.Invalid);
  inputClasses = inputClasses.join(' ');

}

  switch (props.elementType) {
    case "input":
      inputEl = (
        <input
          className={inputClasses}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          className={inputClasses}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputEl = (
        <select className={inputClasses} value={props.value}
        onChange={props.changed}>
          {props.elementConfig.option.map((op) => {
            return <option key={op.value} value={op.value}>{op.displayValue}</option>;
          })}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={inputClasses}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEl}
      {validationError}
    </div>
  );
};

export default Input;
