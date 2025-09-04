import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostBySlug, getPublishedPosts } from "../data/blogPosts";
import BlogPost from "../components/blog/BlogPost";
import BlogLayout from "../components/layout/BlogLayout";
import {
  updateMetaTags,
  generateBlogPostSEO,
  addStructuredData,
  generateBlogPostStructuredData,
  generateBreadcrumbs,
} from "../utils/seo";
import Breadcrumbs from "../components/blog/Breadcrumbs";

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-teko text-4xl font-black mb-4 text-black">
            記事が見つかりません
          </h1>
          <p className="text-gray-600 mb-8">
            お探しの記事は存在しないか、削除された可能性があります。
          </p>
          <a
            href="/blog"
            className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-colors"
          >
            ブログ一覧に戻る
          </a>
        </div>
      </div>
    );
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-teko text-4xl font-black mb-4 text-black">
            記事が見つかりません
          </h1>
          <p className="text-gray-600 mb-8">
            お探しの記事は存在しないか、削除された可能性があります。
          </p>
          <a
            href="/blog"
            className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-colors"
          >
            ブログ一覧に戻る
          </a>
        </div>
      </div>
    );
  }

  // 関連記事を取得（同じカテゴリの他の記事、最大2件）
  const allPosts = getPublishedPosts();
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  // SEO設定
  useEffect(() => {
    const seoData = generateBlogPostSEO(post);
    updateMetaTags(
      seoData.title,
      seoData.description,
      seoData.image,
      seoData.url
    );

    // 構造化データを追加
    const structuredData = generateBlogPostStructuredData(post);
    addStructuredData(structuredData);

    // パンくずリストの構造化データを追加
    const breadcrumbs = generateBreadcrumbs("blog-post", post.title);
    addStructuredData(breadcrumbs);
  }, [post]);

  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Breadcrumbs
          items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
        />
        <BlogPost post={post} relatedPosts={relatedPosts} />
      </div>
    </BlogLayout>
  );
};

export default BlogPostPage;
