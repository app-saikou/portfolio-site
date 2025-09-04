import { BlogPost as BlogPostType } from "../types/blog";

// サイトの基本情報
export const SITE_CONFIG = {
  name: "DOOWN TOOWN",
  description:
    "DOOWN TOOWNは、すべてのアイテムが10点限定のポップでストリートなファッションブランド。「ここだけ」「今だけ」「10人だけ」のユニークなデザインを提供します。",
  url: "https://doowntoown.netlify.app",
  ogImage: "https://doowntoown.netlify.app/img/ogp.jpg",
  twitterHandle: "@DOOWNTOOWN",
};

// メタタグを動的に更新する関数
export const updateMetaTags = (
  title: string,
  description: string,
  image?: string,
  url?: string
) => {
  // タイトル
  document.title = title;

  // メタディスクリプション
  updateMetaTag("name", "description", description);

  // OGP
  updateMetaTag("property", "og:title", title);
  updateMetaTag("property", "og:description", description);
  updateMetaTag("property", "og:url", url || window.location.href);
  if (image) {
    updateMetaTag("property", "og:image", image);
  }

  // Twitter Card
  updateMetaTag("name", "twitter:title", title);
  updateMetaTag("name", "twitter:description", description);
  if (image) {
    updateMetaTag("name", "twitter:image", image);
  }

  // Canonical URL
  updateCanonicalUrl(url || window.location.href);
};

// メタタグを更新するヘルパー関数
const updateMetaTag = (attribute: string, value: string, content: string) => {
  let meta = document.querySelector(
    `meta[${attribute}="${value}"]`
  ) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, value);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

// Canonical URLを更新
const updateCanonicalUrl = (url: string) => {
  let canonical = document.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = url;
};

// ブログ記事用のSEOメタタグ生成
export const generateBlogPostSEO = (post: BlogPostType) => {
  const title = `${post.title} | DOOWN TOOWN Blog`;
  const description = post.excerpt;
  const image = `${SITE_CONFIG.url}${post.featuredImage}`;
  const url = `${SITE_CONFIG.url}/blog/${post.slug}`;

  return {
    title,
    description,
    image,
    url,
  };
};

// ブログ一覧用のSEOメタタグ生成
export const generateBlogListSEO = () => {
  const title = "Blog | DOOWN TOOWN";
  const description =
    "DOOWN TOOWNの公式ブログ。「逆さま」で「真っ直ぐ」な世界の最新ストーリー、ブランド哲学、ファッション考察をお届けします。";
  const url = `${SITE_CONFIG.url}/blog`;

  return {
    title,
    description,
    image: SITE_CONFIG.ogImage,
    url,
  };
};

// 構造化データ（JSON-LD）を生成
export const generateBlogPostStructuredData = (post: BlogPostType) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_CONFIG.url}${post.featuredImage}`,
    author: {
      "@type": "Organization",
      name: "DOOWN TOOWN",
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: "DOOWN TOOWN",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/img/logo.jpg`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
    wordCount: post.content.replace(/<[^>]*>/g, "").length,
    timeRequired: `PT${post.readTime}M`,
  };

  return structuredData;
};

// ブログ一覧用の構造化データ
export const generateBlogListStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "DOOWN TOOWN Blog",
    description:
      "DOOWN TOOWNの公式ブログ。「逆さま」で「真っ直ぐ」な世界の最新ストーリーをお届けします。",
    url: `${SITE_CONFIG.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: "DOOWN TOOWN",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/img/logo.jpg`,
      },
    },
  };

  return structuredData;
};

// 構造化データをDOMに追加
export const addStructuredData = (data: any) => {
  // 既存の構造化データを削除
  const existingScript = document.querySelector(
    'script[type="application/ld+json"]'
  );
  if (existingScript) {
    existingScript.remove();
  }

  // 新しい構造化データを追加
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// パンくずリスト用のデータ生成
export const generateBreadcrumbs = (
  currentPage: string,
  postTitle?: string
) => {
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: "ホーム",
      item: SITE_CONFIG.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${SITE_CONFIG.url}/blog`,
    },
  ];

  if (currentPage === "blog-post" && postTitle) {
    breadcrumbs.push({
      "@type": "ListItem",
      position: 3,
      name: postTitle,
      item: window.location.href,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs,
  };
};
