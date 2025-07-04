import type { Metadata } from 'next';
import ClientLayout from './clientLayout'; // クライアントコンポーネントをインポート
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export const metadata: Metadata = {
  title: '家計簿アプリ',
  description: 'Next.jsで作成した家計簿アプリです。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {/* Material-UIをApp Routerで使うためのおまじない */}
        <AppRouterCacheProvider>
          {/* 実際のレイアウトはClientLayoutコンポーネントに任せる */}
          <ClientLayout>{children}</ClientLayout>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}