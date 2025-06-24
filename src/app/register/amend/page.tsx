'use client'

import type { Expense } from '../../../types/expense';
import  ExpenseForm  from '../../../components/ExpenseForm';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '../../../lib/fetcher';

function AmendExpense() {
  const [formData, setFormData] = useState<Omit<Expense, 'id'>>({
    date: '',
    type: '支出',
    category: '',
    amount: 0,
    memo: '',
  });

  const [errors, setErrors] = useState({
    date: '',
    category: '',
    amount: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { mutate } = useSWR('http://localhost:4000/expenses', fetcher);
  const params = useParams();
  const id = params.id;

  // フォーム入力変更時のハンドラ
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // 金額のバリデーション
    if (name === 'amount') {
      if (!value) {
        setErrors(prev => ({ ...prev, amount: '金額を入力してください' }));
      } else {
        setErrors(prev => ({ ...prev, amount: '' }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch(`http://localhost:4000/expenses/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    mutate();
    router.push('/detail/listing');
  };

  // 成功時のメッセージ表示
  useEffect(() => {
    if (submitted) {
      alert('更新が完了しました🌼');
      setSubmitted(false);
    }
  }, [submitted]);

  return (
    <div>
      <h2>家計を更新</h2>
      <form onSubmit={handleSubmit}>
        <ExpenseForm
          formData={formData}
          onChange={onChange}
          submitButtonText="更新"
          errors={errors}
        />
      </form>
    </div>
  );
}

export default AmendExpense;