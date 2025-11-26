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
          name: "Moedora",
          description: "個人開発者",
          url: "https://app-saikou.netlify.app",
          sameAs: ["https://x.com/app_saikou", "https://note.com/app_saikou"],
          ...data,
        };

      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Moedora Portfolio",
          description: "個人開発者Moedoraのポートフォリオサイト",
          url: "https://app-saikou.netlify.app",
          author: {
            "@type": "Person",
            name: "Moedora",
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
            name: "Moedora",
          },
          publisher: {
            "@type": "Organization",
            name: "Moedora",
            logo: {
              "@type": "ImageObject",
              url: "https://app-saikou.netlify.app/logo.png",
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
