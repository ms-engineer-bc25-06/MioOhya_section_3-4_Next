import type { Expense } from '../types/expense'

type Props = {
  expense: Expense
}

const ExpenseItem = ({ expense }: Props) => {
  // 日付をYYYY-MM-DD形式に整形
  const formattedDate = new Date(expense.date).toISOString().slice(0, 10)
  return (
    <div>
      {formattedDate} | {expense.category} | ¥{expense.amount}
    </div>
  )
}

export default ExpenseItem
