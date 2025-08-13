"use client";

import Link from "next/link";
import React from "react";

const support = [
  {
    id: 1,
    title: `"How To" Guide And Docs`,
    description:
      "Read tutorials set up guides and everything you need to get started.",
    link: "https://docs.mothrbox.xyz/",
    linkText: "Browse Docs",
  },

  {
    id: 2,
    title: "Frequently Ask Questions",
    description:
      "Quick answers to common questions, about encryption, security and settings.",
    link: "/we-said-no",
    linkText: "View FAQs",
  },

  {
    id: 3,
    title: "API Help & Developers Tools",
    description:
      "Having issues with integration? Find answers and example requests.",
    link: "https://docs.mothrbox.xyz/",
    linkText: "See Dev Tools",
  },

  {
    id: 4,
    title: "Still Need Support?",
    description:
      "Reach out to our support team at support@mothrbox.xyz or open a ticket.",
    link: "mailto:mothrbox.gold@gmail.com",
    linkText: "Contact Us",
  },
];

// helper to detect if a link is external
function isExternalLink(url: string) {
  return /^https?:\/\//.test(url) || url.startsWith("mailto:");
}

export default function SupportPage() {
  return (
    <section className="mx-auto max-w-[1200px] space-y-5 px-5 md:space-y-20 md:py-20">
      <div className="mx-auto flex max-w-[1191px] flex-col items-center text-center">
        <h1 className="text-center text-3xl font-bold md:text-[85px]">
          Need Help? We’re Here.
        </h1>
        <p className="text-sm font-medium md:text-xl">
          Explore our knowledge base, or contact our support team.
        </p>
      </div>

      <div className="mx-auto max-w-[1000px] space-y-10">
        {support.map((itm) => {
          const external = isExternalLink(itm.link);

          return (
            <div
              key={itm.id}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-10 py-15 text-center shadow-lg backdrop-blur-sm"
            >
              <h2 className="mb-3 text-xl font-semibold text-white">
                {itm.title}
              </h2>
              <p className="mb-6 text-gray-300">{itm.description}</p>

              {external ? (
                <a
                  href={itm.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#9E5ED6] px-5 py-4 text-sm font-bold text-white shadow-[inset_0_12px_20px_rgba(255,255,255,0.5)] transition-all md:px-10"
                >
                  {itm.linkText}
                </a>
              ) : (
                <Link
                  href={itm.link}
                  className="rounded-full bg-[#9E5ED6] px-5 py-4 text-sm font-bold text-white shadow-[inset_0_12px_20px_rgba(255,255,255,0.5)] transition-all md:px-10"
                >
                  {itm.linkText}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="mx-auto max-w-[1100px]">
        <h3 className="text-center text-base font-bold md:text-lg">
          We typically respond within 24–48 hours. For urgent issues, include
          your account ID and a detailed description.
        </h3>
      </div>
    </section>
  );
}
