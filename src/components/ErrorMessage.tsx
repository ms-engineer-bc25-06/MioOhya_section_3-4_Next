import { type FetchError } from '@/lib/fetcher'

interface ErrorMessageProps {
  error: Error | FetchError
  className?: string
}

/**
 * ステータスコードに応じたユーザーフレンドリーなエラーメッセージを取得
 * @param status - HTTPステータスコード
 * @returns エラーメッセージ
 */
const getUserErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return 'リクエストの形式が正しくありません。入力内容を確認してください。'
    case 401:
      return '認証が必要です。ログインしてください。'
    case 403:
      return 'アクセス権限がありません。'
    case 404:
      return 'データが見つかりません。'
    case 409:
      return 'データが重複しています。'
    case 422:
      return '入力データに問題があります。内容を確認してください。'
    case 500:
      return 'サーバーでエラーが発生しました。しばらく時間をおいて再度お試しください。'
    case 502:
      return 'サーバーが一時的に利用できません。しばらく時間をおいて再度お試しください。'
    case 503:
      return 'サーバーがメンテナンス中です。しばらく時間をおいて再度お試しください。'
    default:
      return `エラーが発生しました (${status})`
  }
}

/**
 * エラーメッセージを表示するコンポーネント
 * @param error - エラーオブジェクト
 * @param className - CSSクラス名（オプション）
 */
export default function ErrorMessage({ error, className = '' }: ErrorMessageProps) {
  const fetchError = error as FetchError
  const userMessage = fetchError.status 
    ? getUserErrorMessage(fetchError.status)
    : error.message

  return (
    <div className={`error-message ${className}`}>
      <p>Error: {userMessage}</p>
    </div>
  )
} 