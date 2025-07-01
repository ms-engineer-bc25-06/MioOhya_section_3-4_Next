'use client'

import { useState } from 'react'
import type { Budget } from '../../../types/budget'
import BudgetForm from '../../../components/BudgetForm'
import {
  PrimaryButton,
  DeleteButton,
  BackButton,
} from '../../../components/MUIButton'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

function BudgetDetail() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [isEditMode, setIsEditMode] = useState(false)
  const [editBudget, setEditBudget] = useState<Budget | null>(null)

  const {
    data: budget,
    error,
    isLoading,
  } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/budgets/${id}` : null,
    fetcher,
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setEditBudget((prev: Budget | null) => {
      if (!prev) return null
      return { ...prev, [name]: value }
    })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editBudget || !editBudget.id) {
      return
    }
    try {
      const response = await fetch(
        `http://localhost:3003/budgets/${String(budget.id)}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editBudget),
        },
      )
      alert('更新が完了しました！')
      router.push('/budget/listing')
    } catch (err) {
      throw err instanceof Error
        ? err
        : new Error('更新中にエラーが発生しました')
    }
  }

  const handleDelete = async () => {
    if (!budget || !budget.id) {
      throw new Error('削除するデータがありません')
    }

    if (!window.confirm('本当に削除しますか？')) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:3003/budgets/${String(budget.id)}`,
        {
          method: 'DELETE',
        },
      )

      if (!response.ok) {
        throw new Error('削除に失敗しました')
      }

      alert('削除が完了しました！')
      router.push('/budget/listing')
    } catch (err) {
      throw err instanceof Error
        ? err
        : new Error('削除中にエラーが発生しました')
    }
  }

  const handleEditMode = () => {
    setEditBudget(budget ? { ...budget } : null)
    setIsEditMode(true)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!budget) return <div>データが見つかりません</div>

  return (
    <div>
      <h2>詳細</h2>
      {isEditMode && editBudget ? (
        <form onSubmit={handleUpdate}>
          <BudgetForm
            formData={editBudget}
            onChange={handleChange}
            submitButtonText="保存"
            onSubmit={handleUpdate}
          />
        </form>
      ) : (
        <div>
          <p>年: {budget.Year}</p>
          <p>月: {budget.month}</p>
          <p>カテゴリ: {budget.category}</p>
          <p>金額: ¥{budget.amount.toLocaleString()}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <PrimaryButton onClick={handleEditMode}>更新</PrimaryButton>
            <DeleteButton onClick={handleDelete}>削除</DeleteButton>
            <BackButton onClick={() => router.push('/budget/listing')}>
              戻る
            </BackButton>
          </div>
        </div>
      )}
    </div>
  )
}

export default BudgetDetail
