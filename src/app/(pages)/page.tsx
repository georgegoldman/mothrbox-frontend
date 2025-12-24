/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandSlider } from "@/components/carousel";
import { PricingSection } from "@/components/pricing-section";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Particles } from "@/components/particles";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* 💬 Your actual content */}
      <section className="mx-auto flex max-w-[1200px] flex-col items-center justify-center md:mt-20">
        <div className="space-y-3 md:space-y-10">
          <h1 className="text-center text-[24px] leading-[50px] font-semibold lg:text-[64px]">
            Unbreakable encryption
          </h1>

          <p className="text-center text-xs leading-[24px] md:text-[20px]">
            With just a click, a code, concealed forever.
          </p>
        </div>

        <div className="mt-10 space-x-3 md:space-x-8">
          <a
            href="https://docs.mothrbox.xyz/"
            target="_blank"
            referrerPolicy="no-referrer"
            className="rounded-full bg-[#9E5ED6] px-5 py-4 text-sm font-bold text-white shadow-[inset_0_12px_20px_rgba(255,255,255,0.5)] transition-all md:px-10"
          >
            View Docs
          </a>

          <Link
            href="/dashboard/encrypt"
            className="shadow-inner-glow rounded-full border border-[#9E5ED6]/50 px-5 py-4 text-sm font-bold transition-all md:px-10"
          >
            Start Encryption
          </Link>
        </div>
      </section>

      <section className="relative mx-auto mt-10 w-full lg:mt-30">
        {/* Lamp Background */}
        <div className="relative mx-auto h-full w-full">
          <img
            src="/images/lamp-2.png"
            alt="lamp"
            className="h-[500px] object-cover md:h-full md:w-full"
          />

          {/* Constrained Particle Container */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <Particles />
          </div>
        </div>

        {/* Centered Black Box */}
        <Image
          src="/images/black-box.png"
          alt="black-box"
          width={650}
          height={650}
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        />
      </section>

      <section className="relative z-10 mx-auto my-20 max-w-[1250px] bg-black">
        <PricingSection />
      </section>

      <section className="mx-auto my-10 max-w-[1250px]">
        <BrandSlider />
      </section>
    </div>
  );
}
