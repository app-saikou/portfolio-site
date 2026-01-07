"use client";

export default function OmikujiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ヘッダーとフッターを非表示にする */}
      <style jsx global>{`
        header,
        footer {
          display: none !important;
        }
        main {
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>
      {children}
    </>
  );
}

