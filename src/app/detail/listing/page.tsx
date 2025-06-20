'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Expense } from '../../../type/expense';
import ExpenseItem from '../../template/ExpenseItem';
import Link from 'next/link';
import { PrimaryButton } from '../../../component/MUIButton';

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


  return (
    <div>
      <h1>家計簿一覧</h1>
      <ul>
        {expenses.map((expense) => (
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
