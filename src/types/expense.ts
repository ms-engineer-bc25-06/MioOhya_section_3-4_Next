// src/types/expense.ts

// "支出" か "収入" のみ許容する型
export type ExpenseType = '支出' | '収入'

export type Expense = {
  id: number // 一意の識別子
  date: string // 日付（ISO文字列形式）
  type: ExpenseType // 支出 or 収入
  category: string // カテゴリ（食費・交通費など）
  amount: number // 金額
  memo?: string // 任意のメモ
}
