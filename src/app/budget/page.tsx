'use client';
import BudgetForm from '../../components/BudgetForm';
import BudgetSummary from '../budget/summary';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

export default function BudgetPage() {
  const [active, setActive] = useState<'form' | 'summary'>('form');

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ position: 'sticky', top: 0, bgcolor: '#fff', zIndex: 1 }}>
        <Button onClick={() => setActive('form')}>入力フォーム</Button>
        <Button onClick={() => setActive('summary')}>年間予算一覧</Button>
      </Box>

      {active === 'form' && <BudgetForm />}
      {active === 'summary' && <BudgetSummary />}
    </Box>
  );
}