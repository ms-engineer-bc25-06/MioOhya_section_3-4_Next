'use client';

import { useRouter } from 'next/navigation';
import type { Expense } from '../../../types/expense';
import ExpenseItem from '../../../components/ExpenseItem';
import Link from 'next/link';
import { PrimaryButton } from '../../../components/MUIButton';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

function ExpenseList() {
  const { data: expenses, error, isLoading } = useSWR(
    'http://localhost:4000/expenses',
    fetcher
  );
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!expenses) return <div>データがありません</div>;

  return (
    <div>
      <h1>家計簿一覧</h1>
      <ul>
        {expenses.map((expense: Expense) => (
          <li key={expense.id}>
            <Link href={`/detail/${expense.id}`}>
              <ExpenseItem expense={expense} />
            </Link>
          </li>
        ))}
      </ul>
      <PrimaryButton onClick={() => router.push('/register/add')}>
        新規登録
      </PrimaryButton>
    </div>
  );
}

export default ExpenseList;
