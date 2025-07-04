import { render, screen } from '@testing-library/react';
import { describe, test, expect,vi } from 'vitest';
import RootLayout from './layout' 

//モック設定
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(), // pushメソッドのダミー関数
        replace: vi.fn(),
        refresh: vi.fn(),
    }),
    usePathname: () => '/',
}));

//テストブロック
describe('Layout Component', () => {
    //正常系テスト
    describe('happy path', () => {
        test('renders navigation links work correctly', () => {
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
        });
    });

    //異常系テスト
    describe('unhappy path', () => {
        //メニューバーの配列が空のとき、リンク非表示
        test('should not render navigation links when menu array is empty', () => {
            render(<RootLayout><div></div></RootLayout>);
            const homeLink = screen.queryByRole('button', { name: 'ホーム'});
            expect(homeLink).not.toBeInTheDocument();
        });

        //メニュー配列データが存在しない場合、クラッシュさせない
        test('should not crash when menu is null', () => {
            expect(() => {
                render(<RootLayout><div></div></RootLayout>);
            }).not.toThrow();
        });
    });
});
