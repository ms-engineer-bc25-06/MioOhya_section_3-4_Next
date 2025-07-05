// エラーオブジェクトにプロパティを追加するための型定義
export interface FetchError extends Error {
  status?: number
  info?: any
}

export const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    // 技術的なエラーオブジェクトを作成
    const error: FetchError = new Error(`HTTP error! status: ${res.status}`)
    // エラーオブジェクトにステータス番号とAPIからの詳細情報格納
    error.status = res.status

    try {
      error.info = await res.json() // APIが返すエラー詳細
    } catch (e) {
      // レスポンスがJSONでない場合もあるため、念のためcatch
      try {
        error.info = await res.text()
      } catch (textError) {
        // テキスト取得も失敗した場合
        error.info = `レスポンスの取得に失敗しました: ${textError}`
      }
    }
    throw error
  }

  return res.json()
}
