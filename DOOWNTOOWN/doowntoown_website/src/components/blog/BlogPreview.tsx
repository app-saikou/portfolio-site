import React from "react";
import { BlogPost as BlogPostType } from "../../types/blog";
import { getFeaturedPosts, getPublishedPosts } from "../../data/blogPosts";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const BlogPreview: React.FC = () => {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getPublishedPosts().slice(0, 3); // 最新3件

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-32 px-4 md:px-8 bg-zinc-900">
      <div className="max-w-[980px] mx-auto">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <h2 className="font-teko text-5xl md:text-7xl font-black mb-4 text-white">
            LATEST BLOG
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            「逆さま」で「真っ直ぐ」な世界の
            <br />
            最新ストーリーをお届け
          </p>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 text-lg font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            すべての記事を見る
            <ArrowRight size={20} />
          </a>
        </div>

        {/* 注目記事 */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <div className="relative overflow-hidden rounded-2xl bg-black">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={featuredPosts[0].featuredImage}
                  alt={featuredPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                    注目記事
                  </span>
                </div>

                <h3 className="font-teko text-3xl md:text-4xl font-black mb-3 text-white leading-tight">
                  {featuredPosts[0].title}
                </h3>

                <p className="text-gray-300 mb-4 line-clamp-2">
                  {featuredPosts[0].excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(featuredPosts[0].publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {featuredPosts[0].readTime}分
                    </span>
                  </div>

                  <a
                    href={`/blog/${featuredPosts[0].slug}`}
                    className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold hover:bg-white transition-colors"
                  >
                    読む
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 最新記事一覧 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="font-teko text-xl font-black mb-3 text-black leading-tight">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar size={14} />
                    {formatDate(post.publishedAt)}
                  </div>

                  <a
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-black font-bold hover:text-yellow-400 transition-colors"
                  >
                    続きを読む
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ブログへのリンク */}
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-block bg-white text-black px-8 py-4 text-lg font-bold rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            もっと記事を見る
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
