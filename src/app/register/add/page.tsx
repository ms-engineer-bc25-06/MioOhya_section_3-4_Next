'use client';

import { useState, useEffect } from 'react';
import type { Expense } from '../../../types/expense';
import ExpenseForm from '../../../components/ExpenseForm';
import useSWR from 'swr';
import { fetcher } from '../../../lib/fetcher';
import { useRouter } from 'next/navigation';

function AddExpense() {
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

    const { mutate } = useSWR('http://localhost:3003/expenses', fetcher);
    const router = useRouter();

    // フォーム入力変更時のハンドラ
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    // フォーム送信時のハンドラ
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // 日付をISO形式に変換
      const isoDate = formData.date ? new Date(formData.date).toISOString() : '';
      const sendData = { ...formData, date: isoDate };

      await fetch('http://localhost:3003/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sendData),
      });
      mutate();
      router.push('/detail/listing');
    };

    // 成功時のメッセージ表示
    useEffect(() => {
      if (submitted) {
        alert('登録が完了しました🌼');
        setSubmitted(false);
      }
    }, [submitted]);

    return (
      <div>
        <h2>家計を登録</h2>
        <form onSubmit={handleSubmit}>
          <ExpenseForm
            formData={formData}
            onChange={handleChange}
            submitButtonText="登録"
            errors={errors}
          />
        </form>
      </div>
    );
}

export default AddExpense;