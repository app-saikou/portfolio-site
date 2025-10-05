import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const blogPosts: any[] = [];

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Blog
          <span className="block text-lg font-normal text-gray-600 mt-2">
            ブログ
          </span>
        </h1>
        <p className="text-xl text-gray-600">
          個人開発の経験談、技術的な学び、プロダクト開発のプロセスについて書いています。
        </p>
      </div>

      <div className="space-y-8">
        {blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              まだ記事がありません
            </h3>
            <p className="text-gray-600 mb-6">
              個人開発の経験談や技術的な学びについて、今後記事を公開予定です。
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors font-medium"
            >
              <span>ホームに戻る</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          blogPosts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article
                className={`notion-card hover-accent-bg group ${
                  index === 0 ? "md:flex md:gap-8" : ""
                }`}
              >
                <div
                  className={`${
                    index === 0 ? "md:w-1/3" : "w-full h-48 md:h-32"
                  } mb-4 md:mb-0`}
                >
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div
                  className={
                    index === 0
                      ? "md:w-2/3 md:flex md:flex-col md:justify-center"
                      : ""
                  }
                >
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <time>{post.date}</time>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <h2
                    className={`font-semibold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors ${
                      index === 0 ? "text-2xl" : "text-xl"
                    }`}
                  >
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center space-x-2 text-yellow-600 group-hover:text-yellow-700">
                    <span className="text-sm font-medium">記事を読む</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>

      {/* Pagination placeholder */}
      <div className="mt-12 flex justify-center">
        <div className="flex space-x-2">
          <button className="px-3 py-2 text-sm bg-yellow-500 text-black rounded-md">
            1
          </button>
          <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            2
          </button>
          <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            3
          </button>
        </div>
      </div>
    </div>
  );
}
