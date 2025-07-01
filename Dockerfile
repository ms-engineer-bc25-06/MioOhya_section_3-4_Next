# Node.js lts image
# Node.jsの推奨LTSバージョン（alpine版は軽量）
FROM node:lts-alpine

# コンテナ内の作業ディレクトリを指定
WORKDIR /app

# .dockerignoreファイルで不要なファイルを除外するのを忘れない！

# 1. package.jsonとlockファイルを先にコピー
COPY package.json ./
# npmをお使いならpackage-lock.jsonも
COPY package-lock.json ./

# 2. 依存関係をインストール（package.jsonに変更がなければキャッシュが使われる）
RUN npm install

# 3. ソースコードをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]