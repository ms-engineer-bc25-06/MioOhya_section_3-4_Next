import type { Expense } from '../../../types/expense';
import { Category } from '../../../data/category';
import { PrimaryButton } from '../../../components/MUIButton';

type ExpenseFormProps = {
  formData: Expense | Omit<Expense, 'id'>;
  onChange: (expense: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  submitButtonText: string;
  errors?: { date?: string, category?: string, amount?: string };
};

export function ExpenseForm({ 
  formData, 
  onChange, 
  submitButtonText,
  errors = {}
}: ExpenseFormProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label>日付: </label>
        <input type="date" name="date" value={formData.date} onChange={onChange} required />
      </div>
      <div>
        <label>種別: </label>
        <select name="type" value={formData.type} onChange={onChange}>
          <option value="支出">支出</option>
          <option value="収入">収入</option>
        </select>
      </div>
      <div>
        <label>カテゴリ: </label>
        <select name="category" value={formData.category} onChange={onChange} required>
          <option value="">選択してください</option>
          {Category.map((category: string) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        <label>金額: </label>
        <input 
          type="text" 
          name="amount" 
          value={formData.amount || ''} 
          onChange={onChange}
          placeholder="金額を入力"
          required 
        />
        {errors.amount && <span style={{ color: 'red', fontSize: '0.8em' }}>{errors.amount}</span>}
      </div>
      <div>
        <label>メモ: </label>
        <input type="text" name="memo" value={formData.memo} onChange={onChange} />
      </div>
      <PrimaryButton type="submit" sx={{ alignSelf: 'flex-start' }}>{submitButtonText}</PrimaryButton>
    </div>
  );
}