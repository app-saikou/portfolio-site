# 新しいアプリの法的文書を追加する手順

新しいアプリをリリースするとき、プライバシーポリシー・利用規約・特商法表示（サブスクがあるアプリのみ）をこのポートフォリオサイトに追加する手順。

## 1. テンプレートをコピーする

```bash
mkdir -p doc/apps/{slug}
cp doc/apps/_template/privacy_ja.md doc/apps/_template/terms_ja.md doc/apps/{slug}/
# サブスク課金があるアプリのみ
cp doc/apps/_template/tokusho_ja.md doc/apps/{slug}/
```

`{slug}`はアプリのURLスラッグ（`lib/apps.ts`の`slug`と一致させる）。

## 2. プレースホルダを埋める

コピーしたファイル内の`{{...}}`をすべて実際の値に置き換える。

- `{{APP_NAME}}`：アプリ名
- `{{OPERATOR_NAME}}`：`Moedora`（固定。実名は使わない方針）
- `{{CONTACT_EMAIL}}`：`webzero.net@gmail.com`（固定）
- `{{LAST_UPDATED}}`：公開日
- `{{DATA_COLLECTED}}`・`{{PURPOSE_OF_USE}}`・`{{SERVICE_DESCRIPTION}}`：アプリの実態に合わせて記述する
- tokushoの`{{PLAN_NAME}}`・`{{PLAN_FEATURES}}`：課金プラン名・機能内容

**特商法の「販売事業者名」「代表者名」「所在地」は書き換えない**（開示請求方式の文言のまま。理由は`tokusho_ja.md`内のコメント参照）。

## 3. 生成コマンドを実行する

```bash
npm run copy-legal
```

`doc/apps/{slug}/*.md`が自動検出され、`public/legal/{slug}/ja/`にコピーされる。出力ファイル名を独自にしたい場合のみ`doc/apps/{slug}/_meta.json`を追加する（`scripts/copy-legal.mjs`参照）。

## 4. `lib/apps.ts`にエントリを追加する

該当アプリの`legal`フィールドに、追加したdocの分だけ`docs`配列を追加する（`languages`は日本語のみなら`[{ code: "ja", label: "日本語" }]`）。

## 5. 確認

`npm run dev`で`/apps/{slug}#privacy`等を開き、正しく表示されるか確認する。
