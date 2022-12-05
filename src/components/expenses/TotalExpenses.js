import { useSelector} from "react-redux";

import classes from "./TotalExpenses.module.css";

const TotalExpenses = () => {
  const amount = useSelector((state) => state.expenses.quantity);
  const activePremium = useSelector((state) => state.expenses.premiumIsActive);

  return (
    <div className={classes.expense}>
      <span>TOTAL EXPENSES</span>
      <span className={classes.amount}>Rs. {amount}</span>
      {activePremium && <button>Activate Premium</button>}
    </div>
  );
};

export default TotalExpenses;
