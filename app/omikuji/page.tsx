"use client";

export default function Omikuji() {
  return (
    <div className="fixed inset-0 w-full h-full" style={{ margin: 0, padding: 0 }}>
      <iframe
        src="/omikuji/index.html"
        className="w-full h-full border-0"
        title="おみくじ"
        style={{ 
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
          margin: 0,
          padding: 0
        }}
      />
    </div>
  );
}

