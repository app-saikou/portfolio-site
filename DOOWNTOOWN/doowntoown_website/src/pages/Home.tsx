import React, { useEffect, useRef } from "react";
import {
  ArrowDownUp,
  ShoppingBag,
  AlertTriangle,
  Megaphone,
  Menu,
  X as MenuX,
  Volume2,
  VolumeX,
} from "lucide-react";
import BlogPreview from "../components/blog/BlogPreview";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 動画の初期設定
    video.muted = true; // 初期状態はミュート
    video.loop = true; // ループを確実に設定

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.error("Video playback error:", error);
      }
    };

    // 動画の読み込みが完了したら再生
    video.addEventListener("loadeddata", () => {
      console.log("Video loaded successfully");
      playVideo();
    });

    video.addEventListener("error", () => {
      console.error("Video loading error:", video.error);
    });

    // 動画が停止したら再生
    video.addEventListener("pause", () => {
      playVideo();
    });

    return () => {
      if (video) {
        video.pause();
        // イベントリスナーのクリーンアップ
        video.removeEventListener("loadeddata", playVideo);
        video.removeEventListener("pause", playVideo);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // videoPropsの設定を修正
  const videoProps = {
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    controls: false, // コントロールは非表示
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="max-w-[980px] mx-auto px-4">
          <div className="flex items-center justify-between h-12 md:h-14">
            <a
              href="/"
              className="font-teko text-2xl tracking-wider font-black"
            >
              DOOWN TOOWN
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#about"
                className="text-sm hover:text-yellow-400 transition-colors"
              >
                ABOUT
              </a>
              <a
                href="#story"
                className="text-sm hover:text-yellow-400 transition-colors"
              >
                STORY
              </a>
              <a
                href="#items"
                className="text-sm hover:text-yellow-400 transition-colors"
              >
                ITEMS
              </a>
              <a
                href="/blog"
                className="text-sm hover:text-yellow-400 transition-colors"
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
          <div className="md:hidden bg-black/95 backdrop-blur-md">
            <nav className="px-4 py-4 space-y-4">
              <a
                href="#about"
                className="block text-sm hover:text-yellow-400 transition-colors"
              >
                ABOUT
              </a>
              <a
                href="#story"
                className="block text-sm hover:text-yellow-400 transition-colors"
              >
                STORY
              </a>
              <a
                href="#items"
                className="block text-sm hover:text-yellow-400 transition-colors"
              >
                ITEMS
              </a>
              <a
                href="/blog"
                className="block text-sm hover:text-yellow-400 transition-colors"
              >
                BLOG
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 背景動画 */}
        <video
          ref={videoRef}
          {...videoProps}
          className="absolute top-0 left-0 w-full h-full object-cover"
          poster="/img/hero.jpg"
          webkit-playsinline="true"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          <img
            src="/img/hero.jpg"
            alt="Hero background"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </video>

        {/* オーバーレイ */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

        {/* 音声コントロール */}
        <button
          onClick={toggleMute}
          className="absolute top-24 right-4 z-20 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>

        {/* コンテンツ */}
        <div
          ref={titleRef}
          className="text-center z-10 px-4 backdrop-blur-sm bg-black/20 py-16 w-full"
        >
          <h1 className="font-teko text-7xl md:text-[120px] font-black mb-6 tracking-widest leading-none">
            DOOWN
            <br />
            TOOWN
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in font-medium tracking-wide">
            "逆さま"で"真っ直ぐ"な
            <br />
            世界へようこそ。
          </p>
          <div className="flex justify-center gap-4 animate-slide-up">
            <a
              href="https://suzuri.jp/DOOWN_TOOWN"
              target="_blank"
              className="inline-block bg-yellow-400 text-black px-12 py-4 text-xl font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              今すぐチェックする
            </a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-32 px-4 md:px-8 bg-white text-black">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-teko text-5xl md:text-7xl font-black mb-4">
              WHY DOOWN TOOWN?
            </h2>
            <p className="text-xl text-gray-600">
              限定コレクションで、
              <br />
              あなただけの特別な一着を。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <img
                src="/img/logo.jpg"
                alt="logo"
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-8 animate-on-scroll flex flex-col justify-center">
              <div className="space-y-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <h3 className="font-teko text-4xl font-black">
                  LIMITED EDITION
                  <br />- 10点限定！
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-center gap-3">
                    <Megaphone className="w-6 h-6" />
                    <span className="text-lg">SUZURI限定販売</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6" />
                    <span className="text-lg">
                      限定10点のみ！売り切れたら終わり。
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowDownUp className="w-6 h-6" />
                    <span className="text-lg">
                      ユニークなタイポグラフィデザイン
                    </span>
                  </li>
                </ul>
              </div>
              <a
                href="https://suzuri.jp/DOOWN_TOOWN"
                target="_blank"
                className="inline-block bg-black text-white px-8 py-4 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 text-lg text-center"
              >
                今すぐチェック！
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-32 px-4 md:px-8 bg-black text-white">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-teko text-5xl md:text-7xl font-black mb-4">
              STORY
            </h2>
            <p className="text-xl text-gray-400">
              逆さまの世界から生まれた
              <br />
              新しいファッションの物語
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-on-scroll order-2 md:order-1">
              <div className="space-y-6">
                <h3 className="font-teko text-4xl font-black text-yellow-400">
                  混沌から生まれる
                  <br />
                  創造性
                </h3>
                <p className="text-lg leading-relaxed text-gray-300">
                  「ここだけ」「今だけ」「10人だけ」 DOOWN
                  TOOWNは、すべてのアイテムが10点限定のポップ＆ストリートブランド。
                  買えるのは、たった10人だけ。 どこにでもあるブランドじゃない。
                  どこにも売ってないブランド。
                  持っているだけで、「それどこで買ったの？」と聞かれるようなアイテム。
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  それが、DOOWN TOOWN。
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="font-teko text-4xl font-black text-yellow-400">
                  なぜ、限定10点か？
                </h3>
                <p className="text-lg leading-relaxed text-gray-300">
                  "どこにでもあるブランド" はつまらない。
                  大量生産、いつでも買える、誰でも持っている。
                  でも、それじゃ面白くない。
                  "本当に特別なモノって、そんなにたくさんいらないんじゃない？"
                  そう思ったときに決めた。 "10点だけ作って、終わりにしよう"
                  って。
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  DOOWN TOOWNは、"今、この瞬間"にしかないブランド。
                  再販はしない。数も増やさない。
                  だからこそ、"欲しい"と思ったら迷わず手に入れてほしい。
                  これは、あなたのための "モノ" だから。
                </p>
              </div>
            </div>
            <div className="animate-on-scroll order-1 md:order-2">
              <img
                src="/img/design02.jpg"
                alt="Upside down city view"
                className="w-full aspect-[3/4] object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Items Section */}
      <section id="items" className="py-32 px-4 md:px-8 bg-zinc-900">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-teko text-5xl md:text-7xl mb-4 font-black">
              ITEMS
            </h2>
            <p className="text-xl text-gray-400">限定コレクションをチェック</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "スタンダードTシャツ",
                price: "¥3,883",
                image: "/img/t_shirt.png",
                url: "https://suzuri.jp/DOOWN_TOOWN/17299336/t-shirt/s/black",
              },
              {
                title: "ビッグシルエットパーカー",
                price: "¥6,578",
                image: "/img/parker.png",
                url: "https://suzuri.jp/DOOWN_TOOWN/17299336/big-hoodie/m/black",
              },
              {
                title: "アクリルキーホルダー",
                price: "¥1,329",
                image: "/img/acryl.png",
                url: "https://suzuri.jp/DOOWN_TOOWN/17299336/acrylic-keychain/50x50mm/clear",
              },
              {
                title: "サコッシュ",
                price: "¥2,618",
                image: "/img/bag.png",
                url: "https://suzuri.jp/DOOWN_TOOWN/17299336/sacoche/m/black",
              },
            ].map((item, index) => (
              <div key={index} className="group relative animate-on-scroll">
                <div className="aspect-square overflow-hidden rounded-2xl bg-zinc-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="font-teko text-2xl font-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-yellow-400 font-bold text-xl mb-4">
                    {item.price}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    className="inline-block w-full bg-white text-black py-3 font-bold rounded-full hover:bg-yellow-400 transition-colors text-lg"
                  >
                    今すぐチェックする
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <BlogPreview />

      {/* CTA Section */}
      <section id="cta" className="py-32 px-4 md:px-8 bg-yellow-400 text-black">
        <div className="max-w-[980px] mx-auto text-center">
          <h2 className="font-teko text-5xl md:text-7xl mb-6 font-black">
            GET IT NOW
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            限定10点のみ！
            <br />
            今を逃すと二度とチャンスはこない。
          </p>
          <a
            href="https://suzuri.jp/DOOWN_TOOWN"
            target="_blank"
            className="inline-block bg-black text-white px-12 py-4 text-xl font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            今すぐチェックする
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 py-16 px-4">
        <div className="max-w-[980px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <h3 className="font-teko text-4xl mb-4 font-black">
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
                    href="#about"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    ABOUT
                  </a>
                </li>
                <li>
                  <a
                    href="#story"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    STORY
                  </a>
                </li>
                <li>
                  <a
                    href="#items"
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
}

export default Home;
