'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';

type BudgetCardProps = {
  year: number;
  month: number;
  category: string;
  budgetAmount: number;
  actualAmount: number;
};

export default function BudgetCard({
  year,
  month,
  category,
  budgetAmount,
  actualAmount,
}: BudgetCardProps) {
  const difference = budgetAmount - actualAmount;
  const status = difference >= 0 ? '✅ 範囲内' : '⚠️ オーバー';

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {year}年{month}月 - {category}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography>予算：¥{budgetAmount.toLocaleString()}</Typography>
          <Typography>支出：¥{actualAmount.toLocaleString()}</Typography>
          <Typography>
            差額：¥{difference.toLocaleString()}（{status}）
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
