import React from "react";
import { BlogPost as BlogPostType } from "../../types/blog";
import { ArrowDown, Calendar, Clock, Star } from "lucide-react";

interface BlogHeroProps {
  featuredPost: BlogPostType;
}

const BlogHero: React.FC<BlogHeroProps> = ({ featuredPost }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <img
          src={featuredPost.featuredImage}
          alt={featuredPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
            <Star size={16} />
            注目記事
          </span>
        </div>

        <h1 className="font-teko text-5xl md:text-7xl font-black mb-6 leading-tight">
          {featuredPost.title}
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          {featuredPost.excerpt}
        </p>

        <div className="flex items-center justify-center gap-6 mb-8 text-gray-300">
          <span className="flex items-center gap-2">
            <Calendar size={16} />
            {formatDate(featuredPost.publishedAt)}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} />
            {featuredPost.readTime}分で読める
          </span>
        </div>

        <a
          href={`/blog/${featuredPost.slug}`}
          className="inline-block bg-yellow-400 text-black px-8 py-4 text-xl font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          記事を読む
        </a>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center text-white animate-bounce">
        <ArrowDown size={24} />
      </div>
    </div>
  );
};

export default BlogHero;
