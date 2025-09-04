import React from "react";
import { BlogCategory, BLOG_CATEGORIES } from "../../types/blog";
import {
  BookOpen,
  Shirt,
  AlertTriangle,
  Building2,
  Brain,
  Camera,
} from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: BlogCategory | "ALL";
  onCategoryChange: (category: BlogCategory | "ALL") => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
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

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      <button
        onClick={() => onCategoryChange("ALL")}
        className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
          selectedCategory === "ALL"
            ? "bg-yellow-400 text-black"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        すべて
      </button>

      {BLOG_CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${
            selectedCategory === category.id
              ? "bg-yellow-400 text-black"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {getCategoryIcon(category.lucideIcon)}
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
