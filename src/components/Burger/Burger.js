import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";
const Burger = (props) => {
  const objectKeyArr = Object.keys(props.ingredients); // create a array using the object key

  let burgerArr = objectKeyArr
    .map((ingredientyKey) => {
      const newBlankArr = [...Array(props.ingredients[ingredientyKey])]; // create a new array using the length of each object value, than use ... to merge them

      return newBlankArr.map((_, i) => {
        //use the index to loop out the amount
        return (
          <BurgerIngredient key={ingredientyKey + i} type={ingredientyKey} />
        );
      });
    })
    .reduce((previous, current) => {
      return previous.concat(current); // same as [...previous, ...current] merge 2 arr together
    }, []);
  if (burgerArr.length === 0) {
    burgerArr = <p>add stuff</p>;
  }
  //
  return (
    <div className={classes.burger}>
      <BurgerIngredient type="bread-top" />
      {burgerArr}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
