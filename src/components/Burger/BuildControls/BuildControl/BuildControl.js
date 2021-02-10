
import classes from './BuildControl.css';

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removeHandler} disabled={props.disabled}>Less</button>
        <button className={classes.More} onClick={props.addHandler}>More</button>
    </div>
)

export default BuildControl;
