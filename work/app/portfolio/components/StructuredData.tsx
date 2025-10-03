import Script from "next/script";

interface StructuredDataProps {
  type: "Person" | "WebSite" | "SoftwareApplication" | "BlogPosting";
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case "Person":
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "燃えドラ",
          description: "個人開発者",
          url: "https://moedora.dev",
          sameAs: ["https://x.com/app_saikou", "https://note.com/app_saikou"],
          ...data,
        };

      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "燃えドラ Portfolio",
          description: "個人開発者燃えドラのポートフォリオサイト",
          url: "https://moedora.dev",
          author: {
            "@type": "Person",
            name: "燃えドラ",
          },
          ...data,
        };

      case "SoftwareApplication":
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          applicationCategory: "ProductivityApplication",
          operatingSystem: "iOS, Android, Web",
          ...data,
        };

      case "BlogPosting":
        return {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          author: {
            "@type": "Person",
            name: "燃えドラ",
          },
          publisher: {
            "@type": "Organization",
            name: "燃えドラ",
            logo: {
              "@type": "ImageObject",
              url: "https://moedora.dev/logo.png",
            },
          },
          ...data,
        };

      default:
        return data;
    }
  };

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2),
      }}
    />
  );
}
