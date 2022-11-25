import React from 'react';

import classes from './Expense.module.css';

const Expense = (props) => {

  return (
    <li className={classes.expenses}>
      <span className={classes.description}>{props.description}</span>
      <span className={classes.category}>{props.category}</span>
      <span className={classes.price}>$ {props.amount}</span>
    </li>
  );
};

export default Expense;
