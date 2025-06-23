'use client';

import useSWR from 'swr';
import { Box, Card, CardContent, Typography } from '@mui/material';

type Budget = {
  id: number;
  year: number;
  month: number;
  category: string;
  amount: number;
};

type Expense = {
  id: number;
  date: string;       // 例: '2025-06-01'
  category: string;
  amount: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BudgetSummary() {
  const { data: budgets = [] } = useSWR<Budget[]>('http://localhost:3001/budgets', fetcher);
  const { data: expenses = [] } = useSWR<Expense[]>('http://localhost:3001/expenses', fetcher);

  // 年月ごとの実績と予算の突き合わせ
  const getExpenseTotal = (year: number, month: number, category: string) => {
    return expenses
      .filter((e) => {
        const date = new Date(e.date);
        return (
          date.getFullYear() === year &&
          date.getMonth() + 1 === month &&
          e.category === category
        );
      })
      .reduce((sum, e) => sum + e.amount, 0);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        年間予算一覧
      </Typography>

      {budgets.map((budget) => {
        const actual = getExpenseTotal(budget.year, budget.month, budget.category);
        const diff = budget.amount - actual;
        const status = diff >= 0 ? '✅ 範囲内' : '⚠️ オーバー';

        return (
          <Card key={budget.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {budget.year}年{budget.month}月 - {budget.category}
              </Typography>
              <Typography>予算：¥{budget.amount.toLocaleString()}</Typography>
              <Typography>支出：¥{actual.toLocaleString()}</Typography>
              <Typography>差額：¥{diff.toLocaleString()}（{status}）</Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
