'use client';

import { useState, useEffect } from 'react';
import type { Expense } from '../../../type/expense';
import { ExpenseForm } from '../../register/amend/page';
import { PrimaryButton, DeleteButton, BackButton } from '../../../component/MUIButton';
import { useParams, useRouter } from 'next/navigation';

function Detail() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3002/expenses/${String(id)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (!data || !data.id) {
          throw new Error('データが見つかりません');
        }
        setExpense(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('データ取得エラー:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpense((prev: Expense | null) => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expense || !expense.id) {
      setError('更新するデータがありません');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/expenses/${String(expense.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error('更新に失敗しました');
      }

      const updatedData = await response.json();
      setExpense(updatedData);
      setIsEditMode(false);
      alert('更新が完了しました！');
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新中にエラーが発生しました');
    }
  };

  const handleDelete = async () => {
    if (!expense || !expense.id) {
      setError('削除するデータがありません');
      return;
    }

    if (!window.confirm('本当に削除しますか？')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/expenses/${String(expense.id)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('削除に失敗しました');
      }

      alert('削除が完了しました！');
      router.push('/detail/listing');
    } catch (err) {
      setError(err instanceof Error ? err.message : '削除中にエラーが発生しました');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!expense) return <div>データが見つかりません</div>;

  return (
    <div>
      <h2>詳細</h2>
      {isEditMode ? (
        <form onSubmit={handleUpdate}>
          <ExpenseForm
            formData={expense}
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
            <PrimaryButton onClick={() => setIsEditMode(true)}>
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
