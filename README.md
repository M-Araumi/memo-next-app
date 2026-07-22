# メモ管理アプリ

## アプリ概要

Next.jsとTypeScriptを使用して作成したシンプルなメモ管理アプリです。

メモの追加・編集・削除・一覧表示ができ、ブラウザのLocalStorageを利用してデータを保存するため、ページを再読み込みしても登録したメモが保持されます。

Reactのコンポーネント設計やCustom Hookを利用したロジックの分離を意識して開発しました。

---

## 使用技術

| カテゴリ | 技術 | バージョン |
|----------|------|------------|
| フレームワーク | Next.js | 16.2.6 |
| ライブラリ | React | 19.2.4 |
| 言語 | TypeScript | 5.x |
| スタイリング | CSS Modules | - |
| データ保存 | LocalStorage | - |
| パッケージ管理 | npm | - |
| バージョン管理 | Git / GitHub | - |

---

## 機能一覧

- メモの追加
- メモ一覧表示
- メモ編集
- メモ削除
- LocalStorageによるデータ永続化
- 入力バリデーション
  - タイトル必須
  - 本文必須
  - 空文字禁止
  - 最大文字数チェック
- 存在しないメモの更新・削除時のエラーチェック
- エラーメッセージ表示

---

## 起動方法

### リポジトリをクローン

```bash
git clone https://github.com/M-Araumi/memo-next-app
```

### プロジェクトフォルダへ移動

```bash
cd memo-next-app
```

### 必要なパッケージをインストール

```bash
npm install
```

### 開発サーバーを起動

```bash
npm run dev
```

### ブラウザでアクセス

以下のURLを開きます。

```
http://localhost:3000
```

---

## ディレクトリ構成

```text
src
├── app
│   └── page.tsx
├── components
│   ├── EditMemoForm.tsx
│   ├── Header.tsx
│   ├── MemoCard.tsx
│   └── MemoForm.tsx
├── hooks
│   ├── useLocalStorage.ts
│   └── useMemos.ts
├── types
│   └── types.ts
└── validators
    └── memoValidator.ts
```

---

## 設計方針

画面表示とロジックを分離し、保守性・再利用性を高めることを意識して設計しました。

- UIはComponentsへ分割
- メモの操作はCustom Hook（useMemos）へ集約
- LocalStorageの処理はuseLocalStorageへ分離
- 入力チェックはvalidatorsへ切り出し
- 型定義はtypesへまとめて管理

---

## 今後の改善予定

- メモ検索機能
- メモの並び替え
- カテゴリ・タグ機能
- データベースとの連携
- メモ操作ロジックを関数として切り出し、責務をさらに分離する