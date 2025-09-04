import React from "react";
import { BlogPost as BlogPostType, BLOG_CATEGORIES } from "../../types/blog";
import {
  Calendar,
  Clock,
  ArrowRight,
  Star,
  BookOpen,
  Shirt,
  AlertTriangle,
  Building2,
  Brain,
  Camera,
} from "lucide-react";

interface BlogCardProps {
  post: BlogPostType;
  isFeatured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, isFeatured = false }) => {
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

  if (isFeatured) {
    return (
      <div className="group relative overflow-hidden rounded-2xl bg-black text-white">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold text-yellow-400 flex items-center gap-1">
              {categoryInfo && getCategoryIcon(categoryInfo.lucideIcon)}
              {categoryInfo?.name}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Clock size={14} />
              {post.readTime}分
            </span>
          </div>

          <h3 className="font-teko text-3xl md:text-4xl font-black mb-3 leading-tight">
            {post.title}
          </h3>

          <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(post.publishedAt)}
            </span>

            <a
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold hover:bg-white transition-colors"
            >
              読む
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-sm font-bold ${categoryInfo?.color} flex items-center gap-1`}
          >
            {categoryInfo && getCategoryIcon(categoryInfo.lucideIcon)}
            {categoryInfo?.name}
          </span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-400 flex items-center gap-1">
            <Clock size={14} />
            {post.readTime}分
          </span>
        </div>

        <h3 className="font-teko text-xl font-black mb-3 text-black leading-tight">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(post.publishedAt)}
          </span>

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
  );
};

export default BlogCard;
