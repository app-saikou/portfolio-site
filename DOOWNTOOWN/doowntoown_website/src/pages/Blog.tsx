import React, { useState, useEffect } from "react";
import { BlogCategory } from "../types/blog";
import { getFeaturedPosts, getPublishedPosts } from "../data/blogPosts";
import BlogHero from "../components/blog/BlogHero";
import BlogCard from "../components/blog/BlogCard";
import CategoryFilter from "../components/blog/CategoryFilter";
import BlogLayout from "../components/layout/BlogLayout";
import {
  updateMetaTags,
  generateBlogListSEO,
  addStructuredData,
  generateBlogListStructuredData,
  generateBreadcrumbs,
} from "../utils/seo";

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    BlogCategory | "ALL"
  >("ALL");

  const featuredPosts = getFeaturedPosts();
  const allPosts = getPublishedPosts();

  // カテゴリフィルタリング
  const filteredPosts =
    selectedCategory === "ALL"
      ? allPosts
      : allPosts.filter((post) => post.category === selectedCategory);

  // 注目記事（最初の注目記事）
  const heroPost = featuredPosts[0];

  // その他の記事（注目記事を除く）
  const otherPosts = filteredPosts.filter((post) => post.id !== heroPost?.id);

  // SEO設定
  useEffect(() => {
    const seoData = generateBlogListSEO();
    updateMetaTags(
      seoData.title,
      seoData.description,
      seoData.image,
      seoData.url
    );

    // 構造化データを追加
    const structuredData = generateBlogListStructuredData();
    addStructuredData(structuredData);

    // パンくずリストの構造化データを追加
    const breadcrumbs = generateBreadcrumbs("blog-list");
    addStructuredData(breadcrumbs);
  }, []);

  return (
    <BlogLayout>
      {/* ヒーローセクション */}
      {heroPost && <BlogHero featuredPost={heroPost} />}

      {/* メインコンテンツ */}
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* ページタイトル */}
          <div className="text-center mb-16">
            <h1 className="font-teko text-5xl md:text-7xl font-black mb-4 text-black">
              BLOG
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              「逆さま」で「真っ直ぐ」な世界の
              <br />
              最新情報とストーリーをお届け
            </p>
          </div>

          {/* カテゴリフィルター */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* 記事一覧 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* 記事がない場合 */}
          {otherPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                このカテゴリには記事がありません。
              </p>
            </div>
          )}
        </div>
      </div>
    </BlogLayout>
  );
};

export default Blog;
