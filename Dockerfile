# Playwrightのブラウザが含まれた公式イメージを使う
FROM mcr.microsoft.com/playwright:v1.53.2-jammy

# コンテナ内の作業ディレクトリを指定
WORKDIR /app

# 1. package.jsonとlockファイルを先にコピー
COPY package.json package-lock.json ./

# 2. 依存関係をインストール（package.jsonに変更がなければキャッシュが使われる）
RUN npm install

# 3. ソースコードをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]