import React, { useState } from "react";
import { Menu, X as MenuX } from "lucide-react";

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[980px] mx-auto px-4">
          <div className="flex items-center justify-between h-12 md:h-14">
            <a
              href="/"
              className="font-teko text-2xl tracking-wider font-black text-black"
            >
              DOOWN TOOWN
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="/#about"
                className="text-sm hover:text-yellow-400 transition-colors text-black"
              >
                ABOUT
              </a>
              <a
                href="/#story"
                className="text-sm hover:text-yellow-400 transition-colors text-black"
              >
                STORY
              </a>
              <a
                href="/#items"
                className="text-sm hover:text-yellow-400 transition-colors text-black"
              >
                ITEMS
              </a>
              <a
                href="/blog"
                className="text-sm text-yellow-400 font-bold transition-colors"
              >
                BLOG
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <MenuX size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200">
            <nav className="px-4 py-4 space-y-4">
              <a
                href="/#about"
                className="block text-sm hover:text-yellow-400 transition-colors text-black"
              >
                ABOUT
              </a>
              <a
                href="/#story"
                className="block text-sm hover:text-yellow-400 transition-colors text-black"
              >
                STORY
              </a>
              <a
                href="/#items"
                className="block text-sm hover:text-yellow-400 transition-colors text-black"
              >
                ITEMS
              </a>
              <a
                href="/blog"
                className="block text-sm text-yellow-400 font-bold transition-colors"
              >
                BLOG
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-14">{children}</main>

      {/* Footer */}
      <footer className="bg-zinc-900 py-16 px-4">
        <div className="max-w-[980px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <h3 className="font-teko text-4xl mb-4 font-black text-white">
                DOOWN TOOWN
              </h3>
              <p className="text-zinc-400 max-w-xl">
                "逆さま" で "真っ直ぐ" な世界へようこそ。
                <br />
                限定10点、売り切れたら終了。
              </p>
            </div>
            <div>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a
                    href="/#about"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    ABOUT
                  </a>
                </li>
                <li>
                  <a
                    href="/#story"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    STORY
                  </a>
                </li>
                <li>
                  <a
                    href="/#items"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    ITEMS
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    BLOG
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-zinc-800 text-center text-zinc-500">
            <p>&copy; 2025 DOOWN TOOWN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogLayout;
