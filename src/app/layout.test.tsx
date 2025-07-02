import { render, screen } from '@testing-library/react';
import { describe, test, expect,vi } from 'vitest';
import RootLayout from './layout' //テスト対象のコンポーネント

vi.mock('next/navigation', () => ({
    //useRouterをモック
    useRouter: () => ({
        push: vi.fn(), // pushメソッドのダミー関数
        replace: vi.fn(),
        refresh: vi.fn(),
    }),
    usePathname: () => '/',
}));



describe('Layout Component', () =>
    test('renders navigation links work correctly', () => {
        //コンポーネントをレンダリング
        render(<RootLayout><div></div></RootLayout>);

        //要素を探す
        const homeLink = screen.getByRole('button', { name: 'ホーム'});
        const detailListingLink = screen.getByRole('button', { name: '明細一覧'});
        const addLink = screen.getByRole('button', { name: '新規登録'});
        const summaryLink = screen.getByRole('button', { name: '月次集計'});
        const budgetLink = screen.getByRole ('button', { name: '予算管理'});

        //要素が画面の中に存在するか検証
        expect(homeLink).toBeInTheDocument();
        expect(detailListingLink).toBeInTheDocument();
        expect(addLink).toBeInTheDocument();
        expect(summaryLink).toBeInTheDocument();
        expect(budgetLink).toBeInTheDocument();
    }))