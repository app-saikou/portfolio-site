import React from "react";
import { BlogPost as BlogPostType, BLOG_CATEGORIES } from "../../types/blog";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  BookOpen,
  Shirt,
  AlertTriangle,
  Building2,
  Brain,
  Camera,
} from "lucide-react";

interface BlogPostProps {
  post: BlogPostType;
  relatedPosts?: BlogPostType[];
}

const BlogPost: React.FC<BlogPostProps> = ({ post, relatedPosts = [] }) => {
  const categoryInfo = BLOG_CATEGORIES.find((cat) => cat.id === post.category);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      BookOpen,
      Shirt,
      AlertTriangle,
      Building2,
      Brain,
      Camera,
    };
    const IconComponent = iconMap[iconName] || BookOpen;
    return <IconComponent size={16} />;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // フォールバック: URLをクリップボードにコピー
      navigator.clipboard.writeText(window.location.href);
      alert("URLをクリップボードにコピーしました");
    }
  };

  return (
    <article>
      {/* 記事ヘッダー */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`text-sm font-bold ${categoryInfo?.color} flex items-center gap-1`}
          >
            {categoryInfo && getCategoryIcon(categoryInfo.lucideIcon)}
            {categoryInfo?.name}
          </span>
        </div>

        <h1 className="font-teko text-4xl md:text-6xl font-black mb-6 text-black leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 text-gray-600 mb-6">
          <span className="flex items-center gap-2">
            <Calendar size={16} />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} />
            {post.readTime}分で読める
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <Share2 size={16} />
            シェア
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* 記事画像 */}
      <div className="mb-12">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
        />
      </div>

      {/* 記事本文 */}
      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* 著者情報 */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="font-teko text-2xl font-black text-black">DT</span>
          </div>
          <div>
            <h3 className="font-teko text-2xl font-black text-black mb-2">
              {post.author}
            </h3>
            <p className="text-gray-600">
              DOOWN TOOWNの世界観を発信する公式アカウント。
              「逆さま」で「真っ直ぐ」な世界を追求しています。
            </p>
          </div>
        </div>
      </div>

      {/* 関連記事 */}
      {relatedPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="font-teko text-3xl font-black mb-8 text-black">
            関連記事
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.id} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-4">
                  <img
                    src={relatedPost.featuredImage}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-teko text-xl font-black mb-2 text-black">
                  {relatedPost.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
                <a
                  href={`/blog/${relatedPost.slug}`}
                  className="text-black font-bold hover:text-yellow-400 transition-colors"
                >
                  続きを読む →
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default BlogPost;
