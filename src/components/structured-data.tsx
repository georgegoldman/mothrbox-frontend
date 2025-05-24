export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Mothrbox",
    description:
      "Mothrbox is a secure, developer-friendly storage layer for Web3 and hybrid apps. It enables client-side encryption using ECC, fast API access, and seamless data storage—encrypted or plain",
    url: "https://www.mothrbox.xyz",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
