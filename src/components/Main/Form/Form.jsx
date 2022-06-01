import React, { useState, useContext } from 'react';
import { TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';

import useStyles from './styles';
import { incomeCategories, expenseCategories } from '../../../constants/category';
import formatDate from '../../../utils/formatDate';

const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
}

const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const { addTransaction } = useContext(ExpenseTrackerContext);

  const createTransaction = () => {
    if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return; // no transaction is created if the amount is not a number or if the date entered is invalid

    const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() };

    addTransaction(transaction);
    setFormData(initialState);
  }

  const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={formData.type}
            onChange={(event) => setFormData({ ...formData, type: event.target.value })}>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={formData.category}
            onChange={(event) => setFormData({ ...formData, category: event.target.value })}>
            {selectedCategories.map((selectedCategory) => (
              <MenuItem key={selectedCategory.type} value={selectedCategory.type}>
                {selectedCategory.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField type='number' label='Amount' fullWidth value={formData.amount}
          onChange={(event) => setFormData({ ...formData, amount: event.target.value })}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField type='date' label='Date' fullWidth 
          value={formData.date}
          onChange={(event) => setFormData({ ...formData, date: formatDate(event.target.value) })}
        />
      </Grid>
      
      <Button className={classes.button} variant='outlined' color='primary' fullWidth onClick={createTransaction}>Create</Button>
    </Grid>
  )
}

export default Form;