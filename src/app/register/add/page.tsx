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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // --- バリデーションチェックを追加 ---
        const newErrors = { date: '', category: '', amount: ''};
        let isValid = true;

        if (!formData.date) {
            newErrors.date = '日付を入力してください';
            isValid = false;
        }
        if (!formData.category) {
            newErrors.category = 'カテゴリを選択してください';
            isValid = false;
        }
        if (formData.amount <= 0) {
            newErrors.amount = '金額は0より大きい値を入力してください';
            isValid = false;
        }

        setErrors(newErrors);

        // バリデーションエラーがあれば、ここで処理を中断
        if (!isValid) {
            return;
        }
        // --- バリデーションここまで ---

        const response = await fetch('http://localhost:3002/expenses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const newExpense = await response.json();

        // ここでidが正しく取得できているかconsole.logで確認
        console.log('新規登録データ:', newExpense);

        if (newExpense && newExpense.id) {
          router.push(`/detail/listing`);
        } else {
          alert('登録に失敗しました');
        }
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