'use client'

import { useRouter } from 'next/navigation'
import type { Expense } from '../../../types/expense'
import ExpenseItem from '../../../components/ExpenseItem'
import Link from 'next/link'
import { PrimaryButton } from '../../../components/MUIButton'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

function ExpenseList() {
  const {
    data: expenses,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/expenses`, fetcher)
  const router = useRouter()

  console.log(expenses)

  // データ取得中
  if (isLoading) return <div>Loading...</div>

  // データ取得時にエラーが発生した場合
  if (error) return <div>Error: {error.message}</div>

  // データが配列でない場合（APIレスポンス不正など）
  if (!Array.isArray(expenses)) {
    return <div>データの取得に失敗しました</div>
  }

  return (
    <div>
      <h1>家計簿一覧</h1>
      <ul>
        {expenses.map((expense: Expense) => (
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
  )
}

export default ExpenseList
