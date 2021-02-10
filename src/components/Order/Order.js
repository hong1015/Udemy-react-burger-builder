import classess from "./Order.css";

const Order = (props) => {
  const ingListArr = [];
  for (let i in props.ingredients) {
    ingListArr.push(
    //   name: i,
    //   amount: props.ingredients[i],
    <span key={i} className={classess.ig}>
    {i} ({props.ingredients[i]})
  </span>
    );
  }
//   const ingList = ingListArr.map(ig => {
//     return (
//       <span key={ig.name} className={classess.ig}>
//         {ig.name} ({ig.amount})
//       </span>
//     );
//   });
  return (
    <div className={classess.order}>
      <p>Ingredients: {ingListArr}</p>

      <p>
        Price: <b>{props.price}</b>
      </p>
    </div>
  );
};

export default Order;
