'use client';

import type { Budget } from '../../../types/budget';
import BudgetItem from '../../../components/BudgetItem';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

function BudgetList() {
  const { data: budgets, error, isLoading } = useSWR(
    'http://localhost:4000/budgets',
    fetcher
  );


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!budgets) return <div>データがありません</div>;

  return (
    <div>
      <h1>予算一覧</h1>
      <ul>
        {budgets.map((budget: Budget) => (
          <li key={budget.id}>
            <Link href={`/budget/${budget.id}`}>
              <BudgetItem budget={budget} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetList;
