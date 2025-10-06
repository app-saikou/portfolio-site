"use client";

import { Heart, Star, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TwitterIcon } from "@/components/TwitterIcon";

const sponsorBenefits = [
  {
    type: "個人スポンサー",
    amount: "月額 ¥500〜",
    benefits: [
      "ポートフォリオサイトにお名前を掲載",
      "開発の進捗報告を共有",
      "Xでの感謝のメンション",
      "心からの感謝の気持ち",
    ],
    icon: "👤",
  },
  {
    type: "企業スポンサー",
    amount: "月額 ¥2,000〜",
    benefits: [
      "ポートフォリオサイトにロゴ掲載",
      "開発ロードマップへの要望反映",
      "Xでの感謝のメンション",
      "心からの感謝の気持ち",
    ],
    icon: "🏢",
  },
];

const currentSponsors: { name: string; type: string; since: string }[] = [];

export default function Sponsor() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-yellow-100 rounded-full">
            <Heart className="text-yellow-600" size={32} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sponsorship
          <span className="block text-lg font-normal text-gray-600 mt-2">
            スポンサーシップ
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          個人開発を継続するために、もしよろしければご支援をお願いいたします。
          ご支援いただいた方々には心より感謝申し上げます。
        </p>
      </div>

      {/* What is Sponsor */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          スポンサーシップについて
        </h2>
        <div className="notion-card">
          <p className="text-gray-700 mb-4">
            スポンサーシップは、個人開発者の活動を応援していただく仕組みです。
            いただいたご支援は、以下の用途に使用させていただきます：
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>開発環境・ツールの維持費用</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>サーバー・インフラ運営費</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>新しい技術の学習・検証</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>開発時間の確保</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Sponsor Plans */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          スポンサープラン
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sponsorBenefits.map((plan, index) => (
            <div key={index} className="notion-card hover-accent-bg">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{plan.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.type}
                </h3>
                <div className="text-2xl font-bold text-yellow-600">
                  {plan.amount}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">特典内容</h4>
                {plan.benefits.map((benefit, benefitIndex) => (
                  <div
                    key={benefitIndex}
                    className="flex items-start space-x-2"
                  >
                    <Star
                      className="text-yellow-500 mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Current Sponsors */}
      {currentSponsors.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="text-gray-700" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">
              現在のスポンサー様
            </h2>
          </div>

          <div className="notion-card">
            <p className="text-gray-600 mb-6">
              以下の皆様にご支援いただいております。心から感謝申し上げます。
            </p>

            <div className="space-y-3">
              {currentSponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <span className="font-medium text-gray-900">
                      {sponsor.name}
                    </span>
                    <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {sponsor.type}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {sponsor.since}〜
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How to Support */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ご支援の方法</h2>
        <div className="notion-card text-center">
          <p className="text-gray-700 mb-6">
            スポンサーシップにご興味をお持ちの方は、以下のリンクからお気軽にご連絡ください。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              onClick={() => window.open("https://x.com/app_saikou", "_blank")}
            >
              <TwitterIcon size={16} className="mr-2" />で DM を送る
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            ※ 金額や支援方法については、個別にご相談させていただきます
          </p>
        </div>
      </section>

      {/* Thank You Message */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          ご支援いただく皆様へ
        </h3>
        <p className="text-gray-700">
          個人開発の継続には、挑戦だけでなく、経済的な基盤も重要です。
          <br />
          皆様のご支援が、より良いアプリケーションの開発につながっていきます。
          <br />
          支援いただいた方々には心から感謝申し上げます。
        </p>
        <div className="mt-4 text-2xl">🙏</div>
      </div>
    </div>
  );
}
