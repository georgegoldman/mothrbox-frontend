import Image from "next/image";
import Link from "next/link";
import React from "react";

const data = [
  {
    id: 1,
    title: "We Said No To Spying",
    subtitle:
      "We don’t believe that convenience justifies surveillance. We built Mothrbox for those who still believe some things are none of the internet’s business.",
    button: "Read Our Privacy Policy",
    file: "/docs/Mothrbox_privacy_document.pdf",
  },
  {
    id: 2,
    title: "We Said No To Centralized Control",
    subtitle:
      "If someone else holds your data, it isn’t yours. So we choose something harder: Encrypted, Decentralized, Controlled by You!",
    button: "Learn More",
    file: null,
    path: "/support",
  },
  {
    id: 3,
    title: "We Said No To Boundless AI.",
    subtitle:
      "We don’t turn your voice, your words and thoughts into fuel for something that might replace you. We use intelligence, but we don’t extract yours.",
    button: "Protect yourself in this AI age",
    file: "/docs/Mothrbox_Protect_yourself.pdf",
  },
];

export default function WeSaidNoPage() {
  return (
    <section className="space-y-5 px-5 md:space-y-20 md:py-20">
      {/* Top Section */}
      <div className="mx-auto flex max-w-[762px] flex-col items-center space-y-10 text-center">
        <Image
          src="/images/mtbox-logo.png"
          alt="logo"
          width={187}
          height={195}
          className="object-contain"
        />
        <h1 className="text-3xl font-bold md:text-[96px]">We said NO.</h1>
        <p className="text-xl font-medium md:text-3xl">
          At Mothrbox. We stand against Surveillance and erosion of privacy,
          Centralized control of peoples lives, and unchecked development of
          Artificial Intelligence.
        </p>
      </div>

      {/* Main Items */}
      <div className="mx-auto flex max-w-[1100px] flex-col items-center space-y-20">
        {data.map((i) => (
          <div key={i.id} className="mx-auto max-w-[1100px] space-y-10">
            <h3 className="text-center text-3xl font-bold md:text-[64px]">
              {i.title}
            </h3>

            <div className="mx-auto max-w-full space-y-10 rounded-xl bg-gradient-to-br from-[#9E5ED680] to-[#101010] p-10">
              <p className="mx-auto max-w-[855px] text-center font-bold md:text-[32px]">
                {i.subtitle}
              </p>

              {/* Conditional: if path exists, use Link; else use <a> */}
              {i.path ? (
                <Link
                  href={i.path}
                  className="flex items-center justify-center font-bold text-[#9E5ED6] md:text-[32px]"
                >
                  {i.button}
                </Link>
              ) : (
                <a
                  href={i.file ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={!!i.file}
                  className="flex items-center justify-center font-bold text-[#9E5ED6] md:text-[32px]"
                >
                  {i.button}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mx-auto flex max-w-[762px] flex-col items-center space-y-10 text-center">
        <Image
          src="/images/mtbox-logo.png"
          alt="logo"
          width={187}
          height={195}
          className="object-contain"
        />
        <h1 className="text-2xl font-bold md:text-[42px]">
          We said no, so you can say yes.
        </h1>
        <p className="font-medium md:text-3xl md:leading-[50px]">
          We are not just trying to change the world, we are trying to protect
          what’s left of it. Say yes to what is right, what is true and what is
          human. Get started with Safeguarding what matters.
        </p>

        <Link
          href="/dashboard/encrypt"
          className="rounded-full bg-[#9E5ED6] px-5 py-4 text-sm font-bold text-white shadow-[inset_0_12px_20px_rgba(255,255,255,0.5)] transition-all md:px-10"
        >
          Start Encryption
        </Link>
      </div>
    </section>
  );
}
