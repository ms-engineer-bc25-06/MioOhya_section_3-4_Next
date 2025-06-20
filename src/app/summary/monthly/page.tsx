'use client';

<<<<<<< HEAD
import { useState } from 'react';
import { TextField } from '@mui/material';
import type { Expense } from '../../../type/expense';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

function MonthlySummary() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM形式

  const { data: allExpenses, error, isLoading } = useSWR<Expense[]>(
    'http://localhost:3002/expenses',
    fetcher
  );

  const expenses: Expense[] = allExpenses
    ? allExpenses.filter((expense) => expense.date.startsWith(selectedMonth))
    : [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
=======
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import type { Expense } from '../../../type/expense';

function MonthlySummary() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM形式
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    // APIからデータを取得
    fetch('http://localhost:3001/expenses')
      .then((res) => res.json())
      .then((data: Expense[]) => {
        setExpenses(data.filter(expense => 
          expense.date.startsWith(selectedMonth)
        ));
      })
      .catch((error) => {
        console.error('API取得エラー:', error);
      });
  }, [selectedMonth]); // selectedMonthが変更されたら再取得
>>>>>>> bb8e2b832ed264e8ed1995a871a0bc3db211aa3e

  const income = expenses
    .filter((expense) => expense.type === '収入')
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  const outcome = expenses
    .filter((expense) => expense.type === '支出')
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div>
      <h1>月次サマリー</h1>
      <TextField
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        sx={{ mb: 3 }}
      />
      <div>
        <h2>{selectedMonth.replace('-', '年')}月の集計</h2>
        <p>収入合計: ¥{income.toLocaleString()}</p>
        <p>支出合計: ¥{outcome.toLocaleString()}</p>
        <p>差額: ¥{(income - outcome).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default MonthlySummary;
