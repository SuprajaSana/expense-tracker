import React, {  useContext } from 'react';
import ExpenseContext from '../../store/expense-context';

import Expense from './Expense';
import classes from './ExpenseList.module.css';

const ExpenseList = (props) => {

  const expenseCtx=useContext(ExpenseContext)

  return (
    <ul className={classes['expenses-list']}>
      {expenseCtx.expenses.map((expense) => (
        <Expense
          key={expense.id}
          id={expense.id}
          description={expense.description}
          category={expense.category}
          amount={expense.amount}
        />
      ))}
    </ul>
  );
};
export default ExpenseList;
