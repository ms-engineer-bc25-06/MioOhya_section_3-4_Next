'use client';
import BudgetForm from '../../components/BudgetForm';
import BudgetList from './listing/page';
import BudgetSummary from './summary/page';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

export default function BudgetPage() {
  const [active, setActive] = useState<'form' | 'listing'| 'summary'>('form');

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ position: 'sticky', top: 0, bgcolor: '#fff', zIndex: 1 }}>
        <Button onClick={() => setActive('form')}>入力フォーム</Button>
        <Button onClick={() => setActive('listing')}>予算一覧</Button>
        <Button onClick={() => setActive('summary')}>年間予算一覧</Button>
      </Box>

      {active === 'form' && <BudgetForm />}
      {active === 'listing' && <BudgetList />}
      {active === 'summary' && <BudgetSummary />}
    </Box>
  );
}