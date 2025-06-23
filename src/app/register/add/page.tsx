'use client';

import { useState, useEffect } from 'react';
import type { Expense } from '../../../types/expense';
import { useRouter } from 'next/navigation';
import { ExpenseForm } from '../amend/page';


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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      fetch(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
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