import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";

import { useState } from "react";

const AddExpense = () => {


  async function  addHandler(NewMovieObj)
  {
    const response=await fetch('https://expense-tracker-ade4f-default-rtdb.firebaseio.com/dailyexpenses.json', 
    {
      method:'POST',
      body:JSON.stringify(NewMovieObj),
      headers : {
        'Content-Type':'application/json'
      }
    }) 
    const data=await response.json()
    console.log(data)
  }

  return (
    <div>
      <ExpenseForm onAdd={addHandler}></ExpenseForm>
      <ExpenseList></ExpenseList>
    </div>
  );
};

export default AddExpense;
