import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';


// 標準ボタン
export const PrimaryButton = (props: ButtonProps) => (
  <Button variant="contained" size='medium' color="primary" {...props} />
);

// 削除ボタン
export const DeleteButton = (props: ButtonProps) => (
  <Button variant="contained" size='medium' color="error" {...props} />
);

// 戻るボタン
export const BackButton = (props: ButtonProps) => (
  <Button variant="contained" size='medium' color="secondary" {...props} />
);



export default {
  PrimaryButton,
  DeleteButton,
  BackButton
}