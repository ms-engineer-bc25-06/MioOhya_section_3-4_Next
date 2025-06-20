'use client';

import { useRouter } from 'next/navigation';
<<<<<<< HEAD
=======
import { useEffect, useState } from 'react';
>>>>>>> bb8e2b832ed264e8ed1995a871a0bc3db211aa3e
import type { Expense } from '../../../type/expense';
import ExpenseItem from '../../template/ExpenseItem';
import Link from 'next/link';
import { PrimaryButton } from '../../../component/MUIButton';
<<<<<<< HEAD
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

function ExpenseList() {
  const { data: expenses, error, isLoading } = useSWR(
    'http://localhost:3002/expenses',
    fetcher
  );
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!expenses) return <div>データがありません</div>;
=======

function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetch('http://localhost:3002/expenses')
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error('API取得エラー:', error);
      });
  }, []);

  const router = useRouter();

>>>>>>> bb8e2b832ed264e8ed1995a871a0bc3db211aa3e

  return (
    <div>
      <h1>家計簿一覧</h1>
      <ul>
<<<<<<< HEAD
        {expenses.map((expense: Expense) => (
=======
        {expenses.map((expense) => (
>>>>>>> bb8e2b832ed264e8ed1995a871a0bc3db211aa3e
          <li key={expense.id}>
            <Link href={`/detail/${expense.id}`}>
              <ExpenseItem expense={expense} />
            </Link>
          </li>
        ))}
      </ul>
      <PrimaryButton onClick={() => router.push('/register/add')}>
<<<<<<< HEAD
        新規登録
=======
          新規登録
>>>>>>> bb8e2b832ed264e8ed1995a871a0bc3db211aa3e
      </PrimaryButton>
    </div>
  );
}

export default ExpenseList;
