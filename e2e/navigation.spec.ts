import { test, expect } from '@playwright/test'

//モックデータ
const mockExpenses = [
  { id: 1, date: '2025-07-03', category: '食費', amount: 1500, memo: 'ランチ' },
  { id: 2, date: '2025-07-02', category: '交通費', amount: 880, memo: '電車' },
]

test('should navigate to the data listing page', async ({ page }) => {
  // 一覧データを取得しにいくAPIリクエストをモックする
  await page.route('**/expenses', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockExpenses),
    })
  })

  // スタートページにアクセス
  await page.goto('/')

  // リンクボタンを押す
  await page.getByRole('button', { name: '明細一覧' }).click()

  // URLが正しく遷移したことを確認
  await expect(page).toHaveURL('/detail/listing')

  // 「家計簿一覧」という見出しが表示されるまで待機する
  await expect(page.getByRole('heading', { name: '家計簿一覧' })).toBeVisible()

  // モックデータの内容が正しく表示されているかを確認
  await expect(page.getByText('食費')).toBeVisible()
  await expect(page.getByText('1500')).toBeVisible()
})
