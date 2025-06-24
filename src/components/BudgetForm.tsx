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
import type { Budget } from '../types/budget';

type BudgetFormProps = {
  formData?: Budget;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  submitButtonText?: string;
  onSubmit?: (e: React.FormEvent) => void;
};

export default function BudgetForm({
  formData,
  onChange,
  submitButtonText = '登録',
  onSubmit,
}: BudgetFormProps) {
  const [year, setYear] = useState(formData?.year ?? 2025);
  const [month, setMonth] = useState(formData?.month ?? 6);
  const [category, setCategory] = useState(formData?.category ?? '');
  const [amount, setAmount] = useState(formData?.amount?.toString() ?? '');

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

      <Box noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          {submitButtonText}
        </Button>
      </Box>
    </Box>
  );
}
