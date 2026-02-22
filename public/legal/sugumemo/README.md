# すぐメモ サブスク用 法務ドキュメント（12言語）

**ソース:** `doc/legal/` に置いた `privacy_ja.md` / `terms_ja.md` などの md が正です。

- **ビルド時**に `npm run copy-legal`（または `npm run build`）で、このフォルダへコピーされます。
- 命名: `doc/legal/privacy_ja.md` → `public/legal/sugumemo/ja/privacy-policy-subscription.md`、`terms_ja.md` → `ja/terms-of-service.md`。他言語も同様（`zh-CN`, `zh-TW`, `ko`, `es`, `fr`, `de`, `pt`, `it`, `hi`, `ar`）。
- 表示はすぐメモアプリ詳細ページの「サブスクリプション プライバシーポリシー・利用規約」で、言語ドロップダウンから選択できます。

編集する場合は **doc/legal/** 内のファイルを変更し、必要なら `npm run copy-legal` を実行してください。
