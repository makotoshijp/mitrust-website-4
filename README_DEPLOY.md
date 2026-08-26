# MIトラスト公式サイト 修正版（2026-08-27）

GitHub → Vercel でそのままデプロイできる静的サイト一式です。

## 反映した主な変更

- canonical / OGP / アセットURLを `https://www.mi-trust.net` に統一
- `vercel.json` で `mi-trust.net` → `www.mi-trust.net` の恒久リダイレクト
- OGP画像を `og-image.png`（1200×630）に変更
- `profile.JPG` を `profile.jpg` に変更
- 「提案・検討中」を `Focus Themes / 現在取り組んでいる変革テーマ` に変更
- 支援実績に期間・対象・関与レイヤーを追記
- 「支援の形」3パターンと標準期間を追加
- トップのCEO紹介を短くし、`/founder` に詳細プロフィールを新設
- `/about` の「4つの支援領域」の重複を削除し、「支援の形＋会社情報」に整理
- 住所を `東京都中央区晴海3-16-1-1003` まで記載
- ナビ表記を `CEOプロフィール` / `支援実績・変革テーマ` に統一
- 電話番号は会社概要ページに限定し、トップは初期HTMLで見えるお問い合わせフォームに変更
- `robots.txt` / `sitemap.xml` / JSON-LD を追加
- 将来の Insights 用に `insights-template.html` を同梱（noindex・未リンク）

## デプロイ

1. このフォルダ内のファイルをGitHubリポジトリのルートに置く
2. VercelでそのGitHubリポジトリを接続
3. Domainsで `www.mi-trust.net` をPrimaryに設定
4. `mi-trust.net` も同じProjectに追加（`vercel.json` がwwwへ301/308相当の恒久リダイレクトを実行）
5. デプロイ後に `/`, `/about`, `/founder`, `/privacy` を確認

## お問い合わせフォームについて

静的サイトのまま動くよう、入力内容からメール本文を生成してユーザーのメールソフトを開く方式です。サイト側では入力内容を保存しません。
Webフォームだけで完結する送信に変更する場合は、Vercel Function + Resend等のメール送信APIを別途接続してください。

## Insights

`insights-template.html` は公開ページからリンクしておらず `noindex` です。実際の記事を用意した段階で、記事ページと `/insights` 一覧を公開するのがおすすめです。
