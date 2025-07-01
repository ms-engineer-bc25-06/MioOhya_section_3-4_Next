// TODO: これはコンポーネントが正しく画面に表示されるかを確認するテストファイルなのであとで削除すること。
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header Component', () => {
  it('renders the heading text', () => {
    // 1. RTLの`render`でコンポーネントを描画
    render(<Header />);

    // 2. `screen`を使って描画された要素を取得
    const headingElement = screen.getByRole('heading', { name: /my app header/i });

    // 3. Vitestの`expect`で要素が存在することを確認
    expect(headingElement).toBeInTheDocument();
  });
});