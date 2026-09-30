# メモ管理アプリ

## アプリ概要

Next.jsとTypeScriptを使用して作成したメモ管理アプリです。

メモの追加・編集・削除・一覧表示ができ、Memo APIとHTTP通信を行ってデータを管理しています。

フロントエンドではReactのコンポーネント設計やCustom Hookを利用したロジックの分離を意識して開発しています。

## 使用技術

| カテゴリ    | 技術           | バージョン  |
| ------- | ------------ | ------ |
| フレームワーク | Next.js      | 16.2.6 |
| ライブラリ   | React        | 19.2.4 |
| 言語      | TypeScript   | 5.x    |
| スタイリング  | CSS Modules  | -      |
| API通信   | Fetch API    | -      |
| パッケージ管理 | npm          | -      |
| バージョン管理 | Git / GitHub | -      |

## 機能一覧

* メモの追加
* メモ一覧表示
* メモ編集
* メモ削除
* 入力バリデーション

  * タイトル必須
  * 本文必須
  * 空文字禁止
  * 最大文字数チェック
* エラーメッセージ表示
* Memo APIとの連携

## 起動方法

### 1. リポジトリをクローン

```bash
git clone https://github.com/M-Araumi/memo-next-app
cd memo-next-app
```

### 2. 必要なパッケージをインストール

```bash
npm install
```

### 3. Memo APIを起動

Memo APIのプロジェクトで開発サーバーを起動します。

```bash
npm run dev
```

Memo APIは `http://localhost:3000` で起動します。

### 4. Next.jsを起動

`memo-next-app` で以下を実行します。

```bash
npm run dev
```

Next.jsは `http://localhost:3001` で起動します。

### 5. ブラウザでアクセス

以下のURLを開きます。

```text
http://localhost:3001
```

## ディレクトリ構成

```text
memo-next-app/
├── src/
│   ├── api/
│   │   └── memos.ts
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   ├── page.module.css
│   │   └── page.tsx
│   ├── components/
│   │   ├── EditMemoForm.tsx
│   │   ├── Header.tsx
│   │   ├── MemoCard.module.css
│   │   ├── MemoCard.tsx
│   │   ├── MemoForm.module.css
│   │   └── MemoForm.tsx
│   ├── hooks/
│   │   └── useMemos.ts
│   ├── types/
│   │   └── types.ts
│   └── validators/
│       └── memoValidator.ts
├── .env.local
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

### 各ディレクトリ・ファイルの役割

* `src/app/page.tsx`

  * 画面全体の構成と各コンポーネントの連携を担当

* `src/components/`

  * メモの入力・表示・編集などのUIコンポーネントを配置

* `src/hooks/useMemos.ts`

  * メモの状態管理とAPI呼び出しを担当
  * メモの取得・追加・更新・削除を管理

* `src/api/memos.ts`

  * Memo APIとのHTTP通信を担当
  * `fetch` を使用してAPIへのリクエストを実行

* `src/types/types.ts`

  * Next.js側で使用するメモの型とAPIレスポンスの型を定義

* `src/validators/memoValidator.ts`

  * メモの入力値や操作対象のバリデーションを担当

## データの流れ

Next.jsからMemo APIへHTTPリクエストを送信し、Memo APIがSQLiteへのデータ操作を行います。

```text
Next.js
  │
  │ HTTP
  ↓
Memo API
  │
  │ SQL
  ↓
SQLite
```

### 各処理の責務

**Next.js（フロントエンド）**

* 画面表示
* ユーザー入力の受付
* メモの状態管理
* Memo APIとのHTTP通信
* APIレスポンスを画面表示用のデータへ変換

**Memo API**

* HTTPリクエストの受付
* APIのルーティング
* 入力値のバリデーション
* メモデータの取得・追加・更新・削除
* SQLiteへのSQL実行
* エラーレスポンスの返却

**SQLite（データベース）**

* メモデータの保存
* メモデータの取得・更新・削除

## 設計方針

### UIとロジックを分離する

UIはComponentsへ分割し、メモの状態管理やAPIとの通信処理はCustom Hookへ分離しています。

### API通信処理を分離する

Memo APIとの通信処理を `api/memos.ts` にまとめ、画面側からAPI通信の詳細を分離しています。

### 型を分けて管理する

Next.js側で使用する `Memo` 型と、Memo APIから返される `ApiMemo` 型を分けて定義しています。

APIから返されるデータをNext.js側の形式へ変換することで、それぞれのデータ形式を明確にしています。

### 入力チェックを分離する

入力値のバリデーション処理を `validators` に分離し、UIコンポーネントや状態管理の処理と分けています。

## 今後の改善予定

* メモ検索機能
* メモの並び替え
* カテゴリ・タグ機能
* メモ操作ロジックを関数として切り出し、責務をさらに分離する
