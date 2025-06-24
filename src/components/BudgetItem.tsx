import type { Budget } from '../types/budget';

type Props = {
  budget: Budget;
};

const BudgetItem = ({ budget }: Props) => (
  <div>
    {budget.year} | {budget.month} | {budget.category} | ¥{budget.amount}
  </div>
);

export default BudgetItem;