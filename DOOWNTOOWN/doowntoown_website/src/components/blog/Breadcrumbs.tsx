import React from "react";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav
      className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
      aria-label="パンくずリスト"
    >
      <a
        href="/"
        className="flex items-center gap-1 hover:text-black transition-colors"
        aria-label="ホーム"
      >
        <Home size={16} />
        <span className="hidden sm:inline">ホーム</span>
      </a>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={16} className="text-gray-400" />
          {item.href ? (
            <a href={item.href} className="hover:text-black transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-gray-900 font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
