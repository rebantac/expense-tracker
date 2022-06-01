// Custom hook
// Deals with all logic related to categories and data visualization

import { useContext } from "react";
import { ExpenseTrackerContext } from './context/context';

import { incomeCategories, expenseCategories, resetCategories } from './constants/category';

const useTransactions = (title) => {
    resetCategories();
    const { transactions } = useContext(ExpenseTrackerContext);
    const transactionsPerType = transactions.filter((transaction) => transaction.type === title); // all the transactions belonging to either Income or Expense is stored

    const total = transactionsPerType.reduce((acc, currVal) => acc += currVal.amount, 0); // 0 being the initial value // total value of all transactions is stored

    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    transactionsPerType.forEach((transaction) => {
        const category = categories.find((c) => c.type === transaction.category);

        if (category) {
            category.amount += transaction.amount;
        }
    });

    const filteredCategories = categories.filter((c) => c.amount > 0);

    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color),
        }],
        labels: filteredCategories.map((c) => c.type),
    }

    return {
        filteredCategories,
        total,
        chartData,
    }
}

export default useTransactions;