"use client";

import { Heart, Star, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TwitterIcon } from "@/components/TwitterIcon";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/i18n";

const currentSponsors: { name: string; type: string; since: string }[] = [];

export default function Sponsor() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const sponsorBenefits = [
    {
      type: t.sponsor.plans.individual.type,
      amount: t.sponsor.plans.individual.amount,
      benefits: t.sponsor.plans.individual.benefits,
      icon: "👤",
    },
    {
      type: t.sponsor.plans.corporate.type,
      amount: t.sponsor.plans.corporate.amount,
      benefits: t.sponsor.plans.corporate.benefits,
      icon: "🏢",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-yellow-100 rounded-full">
            <Heart className="text-yellow-600" size={32} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.sponsor.title}
          <span className="block text-lg font-normal text-gray-600 mt-2">
            {t.sponsor.subtitle}
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t.sponsor.description}
        </p>
      </div>

      {/* What is Sponsor */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t.sponsor.about.title}
        </h2>
        <div className="notion-card">
          <p className="text-gray-700 mb-4">{t.sponsor.about.intro}</p>
          <ul className="space-y-2 text-gray-700">
            {t.sponsor.about.uses.map((use, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>{use}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sponsor Plans */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {t.sponsor.plans.title}
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
                <h4 className="font-semibold text-gray-900 mb-3">
                  {t.sponsor.plans.benefitsTitle}
                </h4>
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
              {t.sponsor.currentSponsors.title}
            </h2>
          </div>

          <div className="notion-card">
            <p className="text-gray-600 mb-6">
              {t.sponsor.currentSponsors.description}
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t.sponsor.howToSupport.title}
        </h2>
        <div className="notion-card text-center">
          <p className="text-gray-700 mb-6">
            {t.sponsor.howToSupport.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              onClick={() => window.open("https://x.com/app_saikou", "_blank")}
            >
              <TwitterIcon size={16} className="mr-2" />
              {t.sponsor.howToSupport.sendDM}
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            {t.sponsor.howToSupport.note}
          </p>
        </div>
      </section>

      {/* Thank You Message */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {t.sponsor.thankYou.title}
        </h3>
        <p className="text-gray-700 whitespace-pre-line">
          {t.sponsor.thankYou.message}
        </p>
        <div className="mt-4 text-2xl">🙏</div>
      </div>
    </div>
  );
}
