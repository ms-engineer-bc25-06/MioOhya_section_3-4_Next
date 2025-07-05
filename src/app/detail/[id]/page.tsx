'use client'

import { useState } from 'react'
import type { Expense } from '../../../types/expense'
import ExpenseForm from '../../../components/ExpenseForm'
import {
  PrimaryButton,
  DeleteButton,
  BackButton,
} from '../../../components/MUIButton'
import ErrorMessage from '../../../components/ErrorMessage'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import { fetcher, type FetchError } from '@/lib/fetcher'

function Detail() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [isEditMode, setIsEditMode] = useState(false)
  const [editExpense, setEditExpense] = useState<Expense | null>(null)

  // SWRを使用してデータを取得
  const {
    data: expense,
    error,
    isLoading,
  } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/expenses/${id}` : null,
    fetcher,
  )

  /**
   * 編集モードの切り替え処理
   * 日付をYYYY-MM-DD形式に変換して編集用データを設定
   */
  const handleEditMode = () => {
    if (expense) {
      // 日付をYYYY-MM-DD形式に変換
      const formattedDate = expense.date
        ? new Date(expense.date).toISOString().slice(0, 10)
        : ''
      setEditExpense({ ...expense, date: formattedDate })
    } else {
      setEditExpense(null)
    }
    setIsEditMode(true)
  }

  /**
   * フォーム入力値の変更を処理
   * @param e - 入力イベント
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setEditExpense((prev: Expense | null) => {
      if (!prev) return null
      return { ...prev, [name]: value }
    })
  }

  /**
   * 支出データの更新処理
   * @param e - フォーム送信イベント
   */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editExpense || !editExpense.id) {
      return
    }
    try {
      const response = await fetch(
        `http://localhost:3003/expenses/${editExpense.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editExpense),
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `更新に失敗しました (${response.status})`)
      }

      alert('更新が完了しました！')
      router.push('/detail/listing')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'エラーが発生しました'
      alert(errorMessage)
    }
  }

  /**
   * 支出データの削除処理
   */
  const handleDelete = async () => {
    if (!expense || !expense.id) {
      alert('削除するデータがありません')
      return
    }

    if (!window.confirm('本当に削除しますか？')) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:3003/expenses/${String(expense.id)}`,
        {
          method: 'DELETE',
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `削除に失敗しました (${response.status})`)
      }

      alert('削除が完了しました！')
      router.push('/detail/listing')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '削除中にエラーが発生しました'
      alert(errorMessage)
    }
  }

  // SWRの状態に応じた表示制御
  // ローディング状態の表示
  if (isLoading) return <div>Loading...</div>
  
  // エラー状態の表示
  if (error) {
    return <ErrorMessage error={error} />
  }
  
  // データが存在しない場合の表示
  if (!expense) return <div>データが見つかりません</div>

  // データ取得成功時の表示（詳細表示モードまたは編集モードの表示内容を定義）
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
          <p>
            日付:{' '}
            {expense.date
              ? new Date(expense.date).toISOString().slice(0, 10)
              : ''}
          </p>
          <p>種類: {expense.type}</p>
          <p>カテゴリ: {expense.category}</p>
          <p>金額: ¥{expense.amount.toLocaleString()}</p>
          <p>メモ: {expense.memo || 'なし'}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <PrimaryButton onClick={handleEditMode}>更新</PrimaryButton>
            <DeleteButton onClick={handleDelete}>削除</DeleteButton>
            <BackButton onClick={() => router.push('/detail/listing')}>
              戻る
            </BackButton>
          </div>
        </div>
      )}
    </div>
  )
}

export default Detail
