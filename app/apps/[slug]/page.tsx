import Link from "next/link";
import { Metadata } from "next";
import { AppDetailClient } from "./AppDetailClient";
import type { AppData } from "./AppDetailClient";
import { apps, getAppBySlug } from "@/lib/apps";

const siteUrl = "https://app-saikou.netlify.app";

export async function generateStaticParams() {
  return apps.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const app = getAppBySlug(params.slug);

  if (!app) {
    return {
      title: "アプリが見つかりません",
    };
  }

  const ogImage = app.ogImageUrl || app.iconUrl || "/og-image.png";
  const ogImageUrl = `${siteUrl}${ogImage}`;

  return {
    title: app.name,
    description: app.description || app.tagline,
    openGraph: {
      title: app.name,
      description: app.description || app.tagline,
      type: "website",
      url: `${siteUrl}/apps/${params.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: app.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: app.name,
      description: app.description || app.tagline,
      images: [ogImageUrl],
      creator: "@app_saikou",
    },
  };
}

export default function AppDetail({ params }: { params: { slug: string } }) {
  const app = getAppBySlug(params.slug) as AppData | null;

  if (!app) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            アプリが見つかりません
          </h1>
          <Link
            href="/apps"
            className="text-gray-900 hover:text-gray-700 mt-4 inline-block"
          >
            アプリ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return <AppDetailClient app={app} />;
}
