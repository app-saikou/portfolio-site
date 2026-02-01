export type Language = "ja" | "en";

export const translations = {
  ja: {
    nav: {
      home: "ホーム",
      apps: "アプリ",
      blog: "ブログ",
      magazine: "マガジン",
      roadmap: "ロードマップ",
      sponsor: "スポンサー",
      omikuji: "おみくじ",
    },
    home: {
      title: "Moedora",
      subtitle: "Vibe Coder",
      quote: {
        line1: "個人開発者として、主にiOSアプリを作っています。",
        line2: "自分自身が欲しいと思えるアプリを開発中。",
        line3: "あなたにも気に入ってもらえれば最高です！",
      },
      apps: {
        title: "Apps",
        subtitle: "開発アプリ一覧",
        viewAll: "すべて見る",
      },
      blog: {
        title: "Blog",
        subtitle: "ブログ記事一覧",
        viewAll: "すべて見る",
        description:
          "個人開発の経験談、技術的な学び、プロダクト開発のプロセスについて書いています。",
        empty: {
          icon: "📝",
          title: "まだ記事がありません",
          description:
            "個人開発の経験談や技術的な学びについて、今後記事を公開予定です。",
          backToHome: "ホームに戻る",
        },
        readArticle: "記事を読む",
      },
      magazine: {
        title: "Magazine",
        subtitle: "個人開発特化マガジン",
        viewAll: "すべて見る",
        description:
          "個人開発者のための雑誌「Solo Dev」。開発の舞台裏、技術、マインドセットをシェアします。",
      },
      roadmap: {
        title: "Roadmap",
        subtitle: "開発ロードマップ",
        viewAll: "すべて見る",
        description:
          "現在開発中のプロジェクトや今後の予定を公開しています。開発の透明性を大切にしています。",
      },
      sponsor: {
        title: "Sponsor",
        subtitle: "開発をサポート",
        viewAll: "詳細を見る",
        description:
          "個人開発を応援してくださる方を募集しています。ご支援は開発の継続に使わせていただきます。",
      },
    },
    apps: {
      title: "Apps",
      subtitle: "開発アプリ一覧",
      description:
        "個人開発したアプリの一覧です。まずは自分がユーザーになれるアプリを心がけて開発しています。",
      viewDetails: "詳細を見る",
      status: {
        released: "リリース済み",
        developing: "開発中",
        idea: "アイデア段階",
      },
      detail: {
        notFound: "アプリが見つかりません",
        backToList: "アプリ一覧に戻る",
        screenshots: "スクリーンショット",
        developmentStatus: "開発状況",
        availableNow: "今すぐ無料でダウンロードできます",
        inDevelopment: "現在開発中です。完成次第、公開予定です",
        checkProgress: "📱 開発進捗や最新情報は",
        checkProgressSuffix: "でご確認ください",
        download: "ダウンロード",
        inDevelopmentStatus: "開発中",
        overview: "概要",
        features: "Features",
        featuresSubtitle: "主な機能",
        technologies: "Technologies",
        technologiesSubtitle: "使用技術",
        howToUse: "How to Use",
        howToUseSubtitle: "使用方法",
        howToUseSteps: [
          "上記のダウンロードボタンからアプリをダウンロード",
          "インストール後、アプリを起動",
          "初回セットアップでアカウントを作成",
          "すぐに使い始めることができます",
        ],
        faq: "❓ よくある質問（FAQ）",
        relatedPosts: "関連記事",
        feedback: "フィードバックをお聞かせください",
        feedbackDescription:
          "ご意見・ご要望があれば X の DM でお気軽にお送りください！",
        sendDM: "で DM を送る",
        appData: {
          tanao: {
            description:
              "Tanaoは、個人向けの資産管理アプリです。月1回の棚卸しを前提としたシンプルな設計で、資産の管理を効率化します。",
            features: [
              "資産棚卸し機能",
              "複数資産の見える化",
              "100歳までの資産予測",
            ],
            faq: [
              {
                question: "Q1. アプリの料金はいくらですか？",
                answer:
                  "A. 現在は基本機能を無料でご利用いただけます。アプリ内に広告が表示される場合があります。将来的にプレミアム機能を追加する際は、事前にご案内いたします。",
              },
              {
                question: "Q2. 計算結果は正確ですか？",
                answer:
                  "A. アプリは設定された年利率で複利計算を行います。これは参考値であり、実際の投資成果とは異なる場合があります。投資判断はご自身の責任で行ってください。",
              },
              {
                question: "Q3. データは安全に保存されますか？",
                answer:
                  "A. はい。Supabaseを使用したセキュアな認証システムで、ユーザーデータを安全に保護しています。すべての通信は暗号化されています。",
              },
              {
                question: "Q4. 棚卸し機能とは何ですか？",
                answer:
                  "A. 現在の資産額を簡単に入力・更新できる機能です。従来の家計簿のように毎日の支出を記録する必要はなく、月に一回程度の棚卸しで資産管理ができます。",
              },
              {
                question: "Q5. 複数の資産を管理できますか？",
                answer:
                  "A. はい。現金、株式など複数の資産タイプを一括で管理できます。設定された年利率で将来価値を予測できます。",
              },
              {
                question: "Q6. 履歴はどのくらい保存されますか？",
                answer:
                  "A. 計算履歴はアカウントに紐付けて永続的に保存されます。いつでも過去の資産推移を確認できます。",
              },
              {
                question: "Q7. 広告を非表示にできますか？",
                answer:
                  "A. 現在は広告を非表示にする機能はありませんが、将来的にプレミアムプランで対応予定です。",
              },
              {
                question: "Q8. データのエクスポートはできますか？",
                answer: "A. 現在は対応していませんが、将来的に検討いたします。",
              },
            ],
            privacyPolicy: {
              title: "プライバシーポリシー",
              lastUpdated: "最終更新日：2025年10月1日",
              dataCollection: {
                title: "データの収集・使用について",
                intro:
                  "本アプリ「Tanao」（以下「本アプリ」）は、以下のデータを収集・使用します。",
              },
              collectedData: {
                title: "収集するデータ",
                items: [
                  "メールアドレス（アカウント認証用）",
                  "資産額データ（現金・株式など）",
                  "年利率設定",
                  "計算履歴",
                  "アカウント作成日時",
                  "広告関連データ",
                  "広告ID（ユーザーの許可を得た場合のみ）",
                  "アプリ使用状況データ（広告配信の最適化用）",
                ],
              },
              dataUsage: {
                title: "データの使用目的",
                items: [
                  "アプリ機能の提供",
                  "資産計算結果の表示と保存",
                  "アカウント管理",
                  "広告の配信と最適化",
                  "アプリの改善とバグ修正",
                ],
              },
              dataStorage: {
                title: "データの保存",
                items: [
                  "Supabaseを使用した安全なデータベースに保存",
                  "すべての通信はHTTPSで暗号化",
                  "Row Level Security（RLS）によるアクセス制御",
                  "ユーザーごとにデータを分離して管理",
                ],
              },
              dataDeletion: {
                title: "データの削除",
                items: [
                  "アカウント削除時にすべての個人データを自動削除",
                  "アプリ内の設定からいつでもアカウントを削除可能",
                  "ユーザーの要求に応じてデータを削除",
                ],
              },
              thirdPartyServices: {
                title: "第三者サービス",
                intro: "本アプリは以下の第三者サービスを使用しています：",
                items: [
                  "Supabase: 認証・データベースサービス",
                  "Google AdMob: 広告配信",
                  "App Tracking Transparency（iOS）",
                ],
                note: "iOSでは、App Tracking Transparencyにより、ユーザーの許可を得た場合のみトラッキングを行います。トラッキングを拒否しても、アプリの基本機能は問題なくご利用いただけます。",
              },
              dataSharing: {
                title: "データの共有",
                items: [
                  "個人を特定できる情報を第三者に販売・共有することはありません",
                  "法的要請がある場合を除き、ユーザーの同意なしにデータを共有することはありません",
                ],
              },
              policyChanges: {
                title: "プライバシーポリシーの変更",
                text: "本プライバシーポリシーは予告なく変更される場合があります。重要な変更がある場合は、アプリ内で通知いたします。",
              },
            },
          },
          sugumemo: {
            description:
              "「あ、何だっけ…？」となる前に。思いついてから10秒で、記録とリマインドを完了。ロック画面から0秒起動、音声入力と1タップ予約で、あなたの「ひらめき」を忘れる前に確実に記録。",
            features: [
              "ロック画面から0秒で起動",
              "10秒でリマインド完了",
              "音声入力機能",
              "手書き風デザイン",
              "スヌーズ機能",
              "多言語対応（11言語）",
            ],
            faq: [
              {
                question: "Q1. アプリの料金はいくらですか？",
                answer:
                  "A. 現在は基本機能を無料でご利用いただけます。アプリ内に広告が表示される場合があります。将来的にプレミアム機能を追加する際は、事前にご案内いたします。",
              },
              {
                question: "Q2. 音声入力はどのように使いますか？",
                answer:
                  "A. マイクボタンを長押しして話すだけです。リアルタイムで文字が浮かび上がり、指を離した瞬間に予約完了します。",
              },
              {
                question: "Q3. データは安全に保存されますか？",
                answer:
                  "A. はい。すべてのメモ・リマインダーデータは、デバイス内のローカルストレージにのみ保存されます。外部サーバーには送信されません。",
              },
              {
                question: "Q4. スヌーズ機能とは何ですか？",
                answer:
                  "A. 通知が来ても、ロック画面から「あと10分」と延長できる機能です。忙しい時でも簡単にリマインドを調整できます。",
              },
              {
                question: "Q5. どの言語に対応していますか？",
                answer:
                  "A. 日本語、英語、中国語、韓国語、スペイン語、フランス語、ドイツ語、ポルトガル語、ヒンディー語、アラビア語、イタリア語の11言語に対応しています。",
              },
              {
                question: "Q6. データの自動削除について教えてください",
                answer:
                  "A. 完了済みリマインダーは完了から7日経過後に、期限切れリマインダーは期限切れから30日経過後に自動削除されます。また、最大保存件数が50件を超える場合、古いデータから自動削除されます。",
              },
            ],
            privacyPolicy: {
              title: "プライバシーポリシー",
              lastUpdated: "最終更新日：2025年1月31日",
              dataCollection: {
                title: "データの収集・使用について",
                intro:
                  "SuguMemo（以下「本アプリ」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。本プライバシーポリシーは、本アプリがどのような情報を収集し、どのように使用するかについて説明します。",
              },
              collectedData: {
                title: "収集する情報",
                items: [
                  "メモ・リマインダーの内容: ユーザーが入力したメモテキスト",
                  "作成日時: メモ・リマインダーが作成された日時",
                  "通知予定日時: リマインダーの通知が予定されている日時",
                  "ステータス情報: リマインダーの状態（予定済み、完了、期限切れ）",
                  "設定情報: 最後に使用したプリセット時間などの設定",
                  "デバイス情報: デバイスの種類、OSバージョン、言語設定など（アプリの動作に必要な範囲内）",
                  "広告識別子: Google AdMobによる広告表示のために使用されます",
                ],
              },
              dataUsage: {
                title: "情報の使用方法",
                items: [
                  "メモ・リマインダー機能の提供",
                  "通知機能の提供",
                  "音声入力機能の提供",
                  "アプリの動作に必要な技術的な処理",
                  "広告の配信と効果測定",
                ],
              },
              dataStorage: {
                title: "データの保存と削除",
                items: [
                  "すべてのメモ・リマインダーデータは、ユーザーのデバイス内にのみ保存されます。外部サーバーには送信されません。",
                  "データはデバイス内のローカルストレージ（AsyncStorage）に保存され、暗号化されたストレージを使用します。",
                  "完了済みリマインダー: 完了から7日経過後に自動削除",
                  "期限切れリマインダー: 期限切れから30日経過後に自動削除",
                  "最大保存件数: 50件を超える場合、古いデータから自動削除",
                  "ユーザーは、アプリをアンインストールすることで、すべてのデータを削除できます。",
                ],
              },
              dataDeletion: {
                title: "権限の使用",
                items: [
                  "マイクアクセス: 音声入力機能を使用するために必要です。音声データはデバイス上で処理され、外部サーバーには送信されません。",
                  "音声認識アクセス: 音声をテキストに変換するために必要です。音声認識はデバイスの機能を使用し、外部サーバーには送信されません。",
                  "通知権限: リマインダーの通知を送信するために必要です。",
                ],
              },
              thirdPartyServices: {
                title: "外部サービスのプライバシーポリシー",
                intro: "本アプリは、以下の外部サービスを使用しています。各サービスのプライバシーポリシーをご確認ください：",
                items: [
                  "Google AdMob: 広告の配信と効果測定のために、広告識別子（IDFA/AAID）、デバイス情報、広告の表示・クリック履歴を収集・使用する場合があります。",
                  "Apple App Store / Google Play Store: 各ストアのプライバシーポリシー",
                ],
                note: "AdMobのプライバシーポリシーについては、Google AdMob プライバシーポリシー（https://policies.google.com/privacy）をご確認ください。",
              },
              dataSharing: {
                title: "情報の共有",
                items: [
                  "本アプリは、以下の場合を除き、ユーザーの個人情報を第三者と共有することはありません：",
                  "広告配信: Google AdMobによる広告配信のため",
                  "法的要求: 法律、規制、または法的プロセスに従う必要がある場合",
                ],
              },
              policyChanges: {
                title: "プライバシーポリシーの変更",
                text: "本プライバシーポリシーは、予告なく変更される場合があります。重要な変更がある場合は、アプリ内で通知するか、本ページを更新します。",
              },
            },
          },
        },
      },
    },
    roadmap: {
      title: "Roadmap",
      subtitle: "開発ロードマップ",
      description:
        "現在の開発状況と今後の予定を特別にご紹介します。アプリアイデアを含む開発ロードマップを公開しています。進捗状況は随時更新予定です！",
      lastUpdated: "最終更新日",
      sections: {
        now: "現在開発中",
        next: "次に予定",
        future: "将来のアイデア",
        done: "完了済み",
      },
      priority: {
        label: "優先度",
        high: "高",
        medium: "中",
        low: "低",
      },
      categories: {
        appDevelopment: "アプリ開発",
        newApp: "新規アプリ",
        siteDevelopment: "サイト開発",
        planning: "企画・設計",
      },
      voting: {
        title: "機能リクエスト・投票機能",
        description:
          "今後、フィードバックや機能リクエストの投票機能を追加予定です。",
        note: "現在は X の DM でご要望をお聞かせください。",
      },
      items: {
        1: {
          title: "Tanao v1.0 リリース準備",
          description:
            "資産棚卸しアプリのベータテストを経て、App Storeで正式リリースしました。",
        },
        2: {
          title: "ThinkMagic プロトタイプ開発",
          description:
            "AIが「気づき」を抽象化・転用・行動化する新しいToDoアプリの開発開始。",
        },
        3: {
          title: "読書引用SNS 開発開始",
          description:
            "本の印象的な部分を引用してシェアできるSNSアプリの開発を計画。",
        },
        4: {
          title: "あさイチ ToDo 開発",
          description:
            "毎朝1回だけ登録するシンプルなタスク管理アプリ。習慣化に特化した設計。",
        },
        5: {
          title: "お散歩ビンゴ 開発",
          description: "散歩中に出会うものでビンゴを楽しめる散歩習慣化アプリ。",
        },
        6: {
          title: "LIFE RESULT 開発",
          description:
            "日々の行動や感情をゲームUI風に記録・演出するライフログアプリ。",
        },
        7: {
          title: "乗り合わせアプリ",
          description:
            "友達と別々の目的でも同じ場所まで一緒に行く約束ができるアプリ。",
        },
        8: {
          title: "ランダムアラーム",
          description:
            "停止ボタン位置がランダムで変わる確実に起きる目覚ましアプリ。",
        },
        9: {
          title: "友達リスト",
          description:
            "家族や友達との会ったログを記録できる人間関係管理アプリ。",
        },
        10: {
          title: "人生年表",
          description: "自分の人生を振り返れるタイムラインアプリ。",
        },
        11: {
          title: "カタンスコア記録アプリ",
          description: "カタンのスコア記録とサイコロ機能付きゲーム支援アプリ。",
        },
        12: {
          title: "ゲームアプリ（HP100）",
          description: "ゲーム風UIの不気味なミッション系習慣化アプリ。",
        },
        13: {
          title: "ピタミツ",
          description:
            "予算から自分に合ったモノ・経験を探せるライフスタイルアプリ。",
        },
        14: {
          title: "本スワイプアプリ",
          description: "ランダムな本にスワイプで出会える読書発見アプリ。",
        },
        15: {
          title: "読書しおり×タイマー",
          description: "どの本を何ページまで読んだか記録する読書管理アプリ。",
        },
        16: {
          title: "ビジョンボード",
          description:
            "年間目標を忘れずに意識できる目標管理アプリ（ウィジェット対応）。",
        },
        17: {
          title: "シンプルなメモとアラート",
          description: "シンプルなメモとアラート機能のみのミニマルアプリ。",
        },
        18: {
          title: "Tanao プロトタイプ開発完了",
          description:
            "資産棚卸しアプリの基本機能を実装し、プロトタイプを完成させました。",
        },
        19: {
          title: "ポートフォリオサイト 作成",
          description: "このサイトを作成しました。",
        },
        20: {
          title: "アプリアイデア整理",
          description:
            "17個の新しいアプリアイデアを整理し、開発ロードマップを作成しました。",
        },
      },
    },
    sponsor: {
      title: "Sponsorship",
      subtitle: "スポンサーシップ",
      description:
        "個人開発を継続するために、もしよろしければご支援をお願いいたします。ご支援いただいた方々には心より感謝申し上げます。",
      about: {
        title: "スポンサーシップについて",
        intro:
          "スポンサーシップは、個人開発者の活動を応援していただく仕組みです。いただいたご支援は、以下の用途に使用させていただきます：",
        uses: [
          "開発環境・ツールの維持費用",
          "サーバー・インフラ運営費",
          "新しい技術の学習・検証",
          "開発時間の確保",
        ],
      },
      plans: {
        title: "スポンサープラン",
        benefitsTitle: "特典内容",
        individual: {
          type: "個人スポンサー",
          amount: "月額 ¥500〜",
          benefits: [
            "ポートフォリオサイトにお名前を掲載",
            "開発の進捗報告を共有",
            "Xでの感謝のメンション",
            "心からの感謝の気持ち",
          ],
        },
        corporate: {
          type: "企業スポンサー",
          amount: "月額 ¥2,000〜",
          benefits: [
            "ポートフォリオサイトにロゴ掲載",
            "開発ロードマップへの要望反映",
            "Xでの感謝のメンション",
            "心からの感謝の気持ち",
          ],
        },
      },
      currentSponsors: {
        title: "現在のスポンサー様",
        description:
          "以下の皆様にご支援いただいております。心から感謝申し上げます。",
      },
      howToSupport: {
        title: "ご支援の方法",
        description:
          "スポンサーシップにご興味をお持ちの方は、以下のリンクからお気軽にご連絡ください。",
        sendDM: "で DM を送る",
        note: "※ 金額や支援方法については、個別にご相談させていただきます",
      },
      thankYou: {
        title: "ご支援いただく皆様へ",
        message:
          "個人開発の継続には、挑戦だけでなく、経済的な基盤も重要です。\n皆様のご支援が、より良いアプリケーションの開発につながっていきます。\n支援いただいた方々には心から感謝申し上げます。",
      },
    },
    magazine: {
      title: "Solo Dev Magazine",
      subtitle: "個人開発特化の雑誌",
      description: "個人開発に関する情報をまとめた雑誌です",
      prototype: "プロトタイプ",
      issue: "号",
      page: "ページ",
      comingSoon: "Coming Soon",
      note: "左右の矢印キーまたはボタンでページをめくることができます。",
    },
    footer: {
      description: "- 個人開発者のポートフォリオサイト -",
      pages: "ページ",
      sns: "SNS",
      home: "ホーム",
      apps: "アプリ",
      blog: "ブログ",
      magazine: "マガジン",
      roadmap: "ロードマップ",
      sponsor: "スポンサー",
      copyright: "© 2025 app_saikou All rights reserved.",
    },
    common: {
      viewAll: "すべて見る",
      readMore: "続きを読む",
      back: "戻る",
    },
  },
  en: {
    nav: {
      home: "Home",
      apps: "Apps",
      blog: "Blog",
      magazine: "Magazine",
      roadmap: "Roadmap",
      sponsor: "Sponsor",
      omikuji: "Fortune",
    },
    home: {
      title: "Moedora",
      subtitle: "Vibe Coder",
      quote: {
        line1: "As an independent developer, I mainly create iOS apps.",
        line2: "I'm developing apps that I would want to use myself.",
        line3: "I hope you'll like them too!",
      },
      apps: {
        title: "Apps",
        subtitle: "Developed Apps",
        viewAll: "View All",
      },
      blog: {
        title: "Blog",
        subtitle: "Blog Posts",
        viewAll: "View All",
        description:
          "I write about my experiences as an independent developer, technical learnings, and product development processes.",
        empty: {
          icon: "📝",
          title: "No posts yet",
          description:
            "I plan to publish articles about my experiences as an independent developer and technical learnings in the future.",
          backToHome: "Back to Home",
        },
        readArticle: "Read Article",
      },
      magazine: {
        title: "Magazine",
        subtitle: "Indie Dev Magazine",
        viewAll: "View All",
        description:
          "Solo Dev magazine for independent developers. Sharing behind-the-scenes, technology, and mindsets.",
      },
      roadmap: {
        title: "Roadmap",
        subtitle: "Development Roadmap",
        viewAll: "View All",
        description:
          "Public roadmap of current projects and future plans. Transparency is important to me.",
      },
      sponsor: {
        title: "Sponsor",
        subtitle: "Support Development",
        viewAll: "Learn More",
        description:
          "Looking for supporters to help independent development. Your support helps me continue creating.",
      },
    },
    apps: {
      title: "Apps",
      subtitle: "Developed Apps",
      description:
        "A list of apps I've developed independently. I focus on creating apps that I would want to use myself.",
      viewDetails: "View Details",
      status: {
        released: "Released",
        developing: "In Development",
        idea: "Idea Stage",
      },
      detail: {
        notFound: "App not found",
        backToList: "Back to Apps",
        screenshots: "Screenshots",
        developmentStatus: "Development Status",
        availableNow: "Available for free download now",
        inDevelopment:
          "Currently in development. Will be released upon completion.",
        checkProgress: "📱 Check development progress and latest updates on",
        checkProgressSuffix: "",
        download: "Download",
        inDevelopmentStatus: "In Development",
        overview: "Overview",
        features: "Features",
        featuresSubtitle: "Main Features",
        technologies: "Technologies",
        technologiesSubtitle: "Technologies Used",
        howToUse: "How to Use",
        howToUseSubtitle: "Usage Instructions",
        howToUseSteps: [
          "Download the app using the download button above",
          "Launch the app after installation",
          "Create an account in the initial setup (optional)",
          "You can start using it right away",
        ],
        faq: "❓ Frequently Asked Questions (FAQ)",
        relatedPosts: "Related Posts",
        feedback: "Share Your Feedback",
        feedbackDescription:
          "If you have any opinions or requests, please feel free to send a DM on X!",
        sendDM: "Send DM on",
        appData: {
          tanao: {
            description:
              "Tanao is an asset management app for individuals and small teams. With a simple design based on monthly inventory, it streamlines asset management.",
            features: [
              "Asset inventory feature",
              "Visualization of multiple assets",
              "10-year asset forecast",
            ],
            faq: [
              {
                question: "Q1. How much does the app cost?",
                answer:
                  "A. Currently, basic features are available for free. Ads may be displayed in the app. We will notify you in advance when premium features are added in the future.",
              },
              {
                question: "Q2. Are the calculation results accurate?",
                answer:
                  "A. The app performs compound interest calculations using the annual interest rate you set individually. This is a reference value and may differ from actual investment results. Please make investment decisions at your own responsibility.",
              },
              {
                question: "Q3. Is my data stored securely?",
                answer:
                  "A. Yes. We use a secure authentication system with Supabase to safely protect user data. All communications are encrypted.",
              },
              {
                question: "Q4. What is the inventory feature?",
                answer:
                  "A. This feature allows you to easily enter and update current asset values. Unlike traditional household accounting, you don't need to record daily expenses - you can manage your assets with monthly inventory.",
              },
              {
                question: "Q5. Can I manage multiple assets?",
                answer:
                  "A. Yes. You can manage multiple asset types such as cash and stocks all together. You can set individual annual interest rates for each to forecast future values.",
              },
              {
                question: "Q6. How long is history stored?",
                answer:
                  "A. Calculation history is permanently stored linked to your account. You can check past asset trends at any time.",
              },
              {
                question: "Q7. Can I hide ads?",
                answer:
                  "A. Currently, there is no feature to hide ads, but we plan to support this in a premium plan in the future.",
              },
              {
                question: "Q8. Can I export my data?",
                answer:
                  "A. This is not currently supported, but we are considering it for the future.",
              },
            ],
            privacyPolicy: {
              title: "Privacy Policy",
              lastUpdated: "Last Updated: October 1, 2025",
              dataCollection: {
                title: "Data Collection and Usage",
                intro:
                  'This app "Tanao" (hereinafter referred to as "this app") collects and uses the following data.',
              },
              collectedData: {
                title: "Data Collected",
                items: [
                  "Email address (for account authentication)",
                  "Asset data (cash, stocks, etc.)",
                  "Annual interest rate settings",
                  "Calculation history",
                  "Account creation date and time",
                  "Advertising-related data",
                  "Advertising ID (only with user permission)",
                  "App usage data (for ad delivery optimization)",
                ],
              },
              dataUsage: {
                title: "Purpose of Data Usage",
                items: [
                  "Providing app functionality",
                  "Display and storage of asset calculation results",
                  "Account management",
                  "Ad delivery and optimization",
                  "App improvement and bug fixes",
                ],
              },
              dataStorage: {
                title: "Data Storage",
                items: [
                  "Stored in a secure database using Supabase",
                  "All communications are encrypted with HTTPS",
                  "Access control via Row Level Security (RLS)",
                  "Data is separated and managed per user",
                ],
              },
              dataDeletion: {
                title: "Data Deletion",
                items: [
                  "All personal data is automatically deleted when an account is deleted",
                  "Accounts can be deleted at any time from the app settings",
                  "Data will be deleted upon user request",
                ],
              },
              thirdPartyServices: {
                title: "Third-Party Services",
                intro: "This app uses the following third-party services:",
                items: [
                  "Supabase: Authentication and database service",
                  "Google AdMob: Ad delivery",
                  "App Tracking Transparency (iOS)",
                ],
                note: "On iOS, through App Tracking Transparency, tracking is only performed with user permission. Even if you decline tracking, you can use the basic features of the app without any problems.",
              },
              dataSharing: {
                title: "Data Sharing",
                items: [
                  "We do not sell or share personally identifiable information with third parties",
                  "We will not share data without user consent, except when required by law",
                ],
              },
              policyChanges: {
                title: "Privacy Policy Changes",
                text: "This privacy policy may be changed without notice. If there are significant changes, we will notify you within the app.",
              },
            },
          },
          sugumemo: {
            description:
              "Before you forget. Complete recording and reminders in 10 seconds from the moment you think of it. Launch in 0 seconds from the lock screen, record your 'inspirations' reliably before you forget with voice input and one-tap scheduling.",
            features: [
              "Launch in 0 seconds from lock screen",
              "Complete reminders in 10 seconds",
              "Voice input feature",
              "Handwritten-style design",
              "Snooze feature",
              "Multi-language support (11 languages)",
            ],
            faq: [
              {
                question: "Q1. How much does the app cost?",
                answer:
                  "A. Currently, basic features are available for free. Ads may be displayed in the app. We will notify you in advance when premium features are added in the future.",
              },
              {
                question: "Q2. How do I use voice input?",
                answer:
                  "A. Just long-press the microphone button and speak. Text appears in real-time, and scheduling completes the moment you release your finger.",
              },
              {
                question: "Q3. Is my data stored securely?",
                answer:
                  "A. Yes. All memo and reminder data is stored only in the device's local storage. It is not sent to external servers.",
              },
              {
                question: "Q4. What is the snooze feature?",
                answer:
                  "A. This feature allows you to extend reminders by '10 more minutes' from the lock screen even after notifications arrive. You can easily adjust reminders even when busy.",
              },
              {
                question: "Q5. What languages are supported?",
                answer:
                  "A. Supports 11 languages: Japanese, English, Chinese, Korean, Spanish, French, German, Portuguese, Hindi, Arabic, and Italian.",
              },
              {
                question: "Q6. Tell me about automatic data deletion",
                answer:
                  "A. Completed reminders are automatically deleted 7 days after completion, and expired reminders are automatically deleted 30 days after expiration. Also, if the maximum storage limit of 50 items is exceeded, old data is automatically deleted.",
              },
            ],
            privacyPolicy: {
              title: "Privacy Policy",
              lastUpdated: "Last Updated: January 31, 2025",
              dataCollection: {
                title: "Data Collection and Usage",
                intro:
                  "SuguMemo (hereinafter referred to as 'this app') respects user privacy and strives to protect personal information. This privacy policy explains what information this app collects and how it is used.",
              },
              collectedData: {
                title: "Information Collected",
                items: [
                  "Memo/Reminder content: Memo text entered by users",
                  "Creation date and time: Date and time when memos/reminders were created",
                  "Scheduled notification date and time: Date and time when reminder notifications are scheduled",
                  "Status information: Reminder status (scheduled, completed, expired)",
                  "Settings information: Settings such as last used preset time",
                  "Device information: Device type, OS version, language settings, etc. (within the scope necessary for app operation)",
                  "Advertising identifier: Used for ad display by Google AdMob",
                ],
              },
              dataUsage: {
                title: "How Information is Used",
                items: [
                  "Providing memo/reminder features",
                  "Providing notification features",
                  "Providing voice input features",
                  "Technical processing necessary for app operation",
                  "Ad delivery and effectiveness measurement",
                ],
              },
              dataStorage: {
                title: "Data Storage and Deletion",
                items: [
                  "All memo/reminder data is stored only on the user's device. It is not sent to external servers.",
                  "Data is stored in the device's local storage (AsyncStorage) and uses encrypted storage.",
                  "Completed reminders: Automatically deleted 7 days after completion",
                  "Expired reminders: Automatically deleted 30 days after expiration",
                  "Maximum storage: If exceeding 50 items, old data is automatically deleted",
                  "Users can delete all data by uninstalling the app.",
                ],
              },
              dataDeletion: {
                title: "Permission Usage",
                items: [
                  "Microphone access: Required to use voice input features. Voice data is processed on the device and is not sent to external servers.",
                  "Speech recognition access: Required to convert speech to text. Speech recognition uses device features and is not sent to external servers.",
                  "Notification permission: Required to send reminder notifications.",
                ],
              },
              thirdPartyServices: {
                title: "Third-Party Service Privacy Policies",
                intro: "This app uses the following external services. Please check each service's privacy policy:",
                items: [
                  "Google AdMob: May collect and use advertising identifiers (IDFA/AAID), device information, and ad display/click history for ad delivery and effectiveness measurement.",
                  "Apple App Store / Google Play Store: Each store's privacy policy",
                ],
                note: "For AdMob's privacy policy, please check the Google AdMob Privacy Policy (https://policies.google.com/privacy).",
              },
              dataSharing: {
                title: "Information Sharing",
                items: [
                  "This app does not share users' personal information with third parties except in the following cases:",
                  "Ad delivery: For ad delivery by Google AdMob",
                  "Legal requirements: When required by law, regulations, or legal processes",
                ],
              },
              policyChanges: {
                title: "Privacy Policy Changes",
                text: "This privacy policy may be changed without notice. If there are significant changes, we will notify you within the app or update this page.",
              },
            },
          },
        },
      },
    },
    roadmap: {
      title: "Roadmap",
      subtitle: "Development Roadmap",
      description:
        "I'm sharing my current development status and future plans. I'm publishing a development roadmap including app ideas. Progress will be updated regularly!",
      lastUpdated: "Last Updated",
      sections: {
        now: "Currently in Development",
        next: "Planned Next",
        future: "Future Ideas",
        done: "Completed",
      },
      priority: {
        label: "Priority",
        high: "High",
        medium: "Medium",
        low: "Low",
      },
      categories: {
        appDevelopment: "App Development",
        newApp: "New App",
        siteDevelopment: "Site Development",
        planning: "Planning & Design",
      },
      voting: {
        title: "Feature Request & Voting",
        description:
          "I plan to add a voting feature for feedback and feature requests in the future.",
        note: "For now, please send your requests via DM on X.",
      },
      items: {
        1: {
          title: "Tanao v1.0 Release Preparation",
          description:
            "After beta testing the asset inventory app, officially released on the App Store.",
        },
        2: {
          title: "ThinkMagic Prototype Development",
          description:
            "Starting development of a new ToDo app where AI abstracts, transfers, and acts on 'insights'.",
        },
        3: {
          title: "Book Quote SNS Development",
          description:
            "Planning development of an SNS app where users can quote and share impressive parts of books.",
        },
        4: {
          title: "Morning ToDo Development",
          description:
            "A simple task management app where you register only once in the morning. Designed specifically for habit formation.",
        },
        5: {
          title: "Walking Bingo Development",
          description:
            "A walking habit formation app where you can enjoy bingo with things you encounter while walking.",
        },
        6: {
          title: "LIFE RESULT Development",
          description:
            "A life log app that records and presents daily actions and emotions in a game-like UI.",
        },
        7: {
          title: "Ride Together App",
          description:
            "An app where you can make plans to go to the same place together with friends, even for different purposes.",
        },
        8: {
          title: "Random Alarm",
          description:
            "An alarm app that ensures you wake up, with the stop button position changing randomly.",
        },
        9: {
          title: "Friends List",
          description:
            "A relationship management app that records logs of meetings with family and friends.",
        },
        10: {
          title: "Life Timeline",
          description: "A timeline app that lets you look back on your life.",
        },
        11: {
          title: "Catan Score Tracker App",
          description:
            "A game support app with Catan score recording and dice functionality.",
        },
        12: {
          title: "Game App (HP100)",
          description:
            "A habit formation app with a creepy mission system and game-like UI.",
        },
        13: {
          title: "Pitamitsu",
          description:
            "A lifestyle app that helps you find things and experiences that fit your budget.",
        },
        14: {
          title: "Book Swipe App",
          description:
            "A reading discovery app where you can swipe to encounter random books.",
        },
        15: {
          title: "Reading Bookmark × Timer",
          description:
            "A reading management app that records which book you've read and up to which page.",
        },
        16: {
          title: "Vision Board",
          description:
            "A goal management app that helps you stay aware of your annual goals (with widget support).",
        },
        17: {
          title: "Simple Notes & Alerts",
          description:
            "A minimal app with only simple note and alert features.",
        },
        18: {
          title: "Tanao Prototype Development Complete",
          description:
            "Implemented the basic features of the asset inventory app and completed the prototype.",
        },
        19: {
          title: "Portfolio Site Created",
          description: "Created this site.",
        },
        20: {
          title: "App Ideas Organized",
          description:
            "Organized 17 new app ideas and created a development roadmap.",
        },
      },
    },
    sponsor: {
      title: "Sponsorship",
      subtitle: "Sponsorship",
      description:
        "If you would like to support my continued independent development, I would be very grateful. I sincerely thank all those who support me.",
      about: {
        title: "About Sponsorship",
        intro:
          "Sponsorship is a system to support independent developers' activities. The support received will be used for the following purposes:",
        uses: [
          "Maintenance costs for development environment and tools",
          "Server and infrastructure operating costs",
          "Learning and verification of new technologies",
          "Securing development time",
        ],
      },
      plans: {
        title: "Sponsor Plans",
        benefitsTitle: "Benefits",
        individual: {
          type: "Individual Sponsor",
          amount: "¥500/month ~",
          benefits: [
            "Your name listed on the portfolio site",
            "Share development progress reports",
            "Thank you mention on X",
            "Heartfelt gratitude",
          ],
        },
        corporate: {
          type: "Corporate Sponsor",
          amount: "¥2,000/month ~",
          benefits: [
            "Logo displayed on portfolio site",
            "Reflect requests in development roadmap",
            "Thank you mention on X",
            "Heartfelt gratitude",
          ],
        },
      },
      currentSponsors: {
        title: "Current Sponsors",
        description:
          "We are supported by the following people. Thank you from the bottom of my heart.",
      },
      howToSupport: {
        title: "How to Support",
        description:
          "If you are interested in sponsorship, please feel free to contact us via the link below.",
        sendDM: "Send DM on",
        note: "※ We will discuss the amount and support method individually",
      },
      thankYou: {
        title: "To All Supporters",
        message:
          "To continue independent development, not only challenges but also an economic foundation is important.\nYour support leads to the development of better applications.\nI sincerely thank all those who support me.",
      },
    },
    magazine: {
      title: "Solo Dev Magazine",
      subtitle: "A Magazine for Solo Developers",
      description: "A magazine featuring information about solo development",
      prototype: "Prototype",
      issue: "Issue",
      page: "Page",
      comingSoon: "Coming Soon",
      note: "You can flip pages using the arrow keys or buttons on the sides.",
    },
    footer: {
      description: "- Independent Developer Portfolio Site -",
      pages: "Pages",
      sns: "Social",
      home: "Home",
      apps: "Apps",
      blog: "Blog",
      magazine: "Magazine",
      roadmap: "Roadmap",
      sponsor: "Sponsor",
      copyright: "© 2025 app_saikou All rights reserved.",
    },
    common: {
      viewAll: "View All",
      readMore: "Read More",
      back: "Back",
    },
  },
} as const;

export function getTranslation(lang: Language) {
  return translations[lang];
}
