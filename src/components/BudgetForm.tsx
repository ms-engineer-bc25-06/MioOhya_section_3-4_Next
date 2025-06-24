'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography
} from '@mui/material';
import { Category } from '../data/category';

export default function BudgetForm() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    const newBudget = {
      year,
      month,
      category,
      amount: Number(amount),
    };

    try {
      const res = await fetch('http://localhost:4000/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBudget),
      });

      if (res.ok) {
        alert('登録に成功しました！');
        setCategory('');
        setAmount('');
      } else {
        alert('登録に失敗しました');
      }
    } catch (err) {
      console.error(err);
      alert('エラーが発生しました');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        月別予算の登録
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="年"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <TextField
          label="月"
          type="number"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          inputProps={{ min: 1, max: 12 }}
        />
        <TextField
          select
          label="カテゴリ"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {Category.map((category: string) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="予算金額"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          登録
        </Button>
      </Box>
    </Box>
  );
}
