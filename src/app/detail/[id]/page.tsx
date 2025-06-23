'use client';

import { useState, useEffect } from 'react';
import type { Expense } from '../../../types/expense';
import { ExpenseForm } from '../../register/amend/page';
import { PrimaryButton, DeleteButton, BackButton } from '../../../components/MUIButton';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

function Detail() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editExpense, setEditExpense] = useState<Expense | null>(null);

  const { data: expense, error, isLoading } = useSWR(
    id ? `http://localhost:4000/expenses/${id}` : null,
    fetcher
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditExpense((prev: Expense | null) => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editExpense || !editExpense.id) {
      
      return;
    }
    // fetchでPUTリクエスト
  };

  const handleDelete = async () => {
    if (!expense || !expense.id) {
      throw new Error('削除するデータがありません');
    }

    if (!window.confirm('本当に削除しますか？')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/expenses/${String(expense.id)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('削除に失敗しました');
      }

      alert('削除が完了しました！');
      router.push('/detail/listing');
    } catch (err) {
      throw err instanceof Error ? err : new Error('削除中にエラーが発生しました');
    }
  };

  const handleEditMode = () => {
    setEditExpense(expense ? { ...expense } : null);
    setIsEditMode(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!expense) return <div>データが見つかりません</div>;

  return (
    <div>
      <h2>詳細</h2>
      {isEditMode && editExpense ? (
        <form onSubmit={handleUpdate}>
          <ExpenseForm
            formData={editExpense}
            onChange={handleChange}
            submitButtonText="保存"
          />
        </form>
      ) : (
        <div>
          <p>日付: {expense.date}</p>
          <p>種類: {expense.type}</p>
          <p>カテゴリ: {expense.category}</p>
          <p>金額: ¥{expense.amount.toLocaleString()}</p>
          <p>メモ: {expense.memo || 'なし'}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <PrimaryButton onClick={handleEditMode}>
              更新
            </PrimaryButton>
            <DeleteButton onClick={handleDelete}>
              削除
            </DeleteButton>
            <BackButton onClick={() => router.push('/detail/listing')}>
              戻る
            </BackButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
