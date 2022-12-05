import { CSVLink } from "react-csv";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from 'react-redux';

import classes from "./FileDownload.module.css";

const FileDownload = () => {

    const email = useSelector((state) => state.auth.email);

    const email1 = email.replace("@", "");
    const newEmail = email1.replace(".", "");
  

    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
  
    const fetchDataHandler = useCallback(async () => {
      setError(null);
      try {
        const response = await fetch(
          `https://expense-tracker-ade4f-default-rtdb.firebaseio.com/dailyexpenses${newEmail}.json`
        );
  
        if (!response.ok) {
          throw new Error("Something went wrong...retrying");
        }
  
        const data = await response.json();
  
        const transformedData = [];
  
        for (const key in data) {
          transformedData.push({
            id: key,
            description: data[key].description,
            category: data[key].category,
            amount: data[key].amount,
          });
        }
        setExpenses(transformedData);
      } catch (error) {
        setError(error.message);
      }
    }, []);
  
    useEffect(() => {
      fetchDataHandler();
    }, [fetchDataHandler]);


  const description = expenses.description;
  const category = expenses.category;
  const amount = expenses.amount;

  /*const csvData = [
    ["Description", "Category", "Amount"],
    [description, category, amount],
    ]; */
    
    const headers = [
        { label: 'Descirtion', key: 'description' },
        { label: 'Category', key: 'category' },
        {label:'Amount',key:'amount'}
    ]

  return (
    <div>
      <button className={classes.expensesfile}>
        <CSVLink data={expenses} headers={headers} filename="file.csv" target="_self" className={classes.link}>
          Download File
        </CSVLink>
      </button>
    </div>
  );
};

export default FileDownload;
