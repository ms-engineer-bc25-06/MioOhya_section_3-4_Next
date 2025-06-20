import type { Expense } from '../../type/expense';

type Props = {
  expense: Expense;
};

const ExpenseItem = ({ expense }: Props) => (
  <div>
    {expense.date} | {expense.category} | ¥{expense.amount}
  </div>
);

export default ExpenseItem;