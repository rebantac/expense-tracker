import React, { useReducer, createContext } from "react";

import contextReducer from "./contextReducer";

// pulling data stored from the local storage so that data can be preserved 
const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    // Action Creators
    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction});
        // dispatch() => changes state of the transaction
    }

    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }

    const balance = transactions.reduce((acc, currVal) => {
        return (
            currVal.type === 'Income' ? acc + currVal.amount : acc - currVal.amount
        )
    }, 0)

    return (
        <ExpenseTrackerContext.Provider  value={{ 
            deleteTransaction,
            addTransaction,
            transactions,
            balance,
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}