/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  Twitter,
  Linkedin,
  Star,
  StarHalf,
} from "lucide-react";
import Navbar from "@/components/navbar";
import SectionHeader from "@/components/section-header";
import {
  AnimatedButton,
  FadeIn,
  ScaleOnHover,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/animation-component";
import { PageTransition } from "@/components/motion/page-transition";
import { BrandSlider } from "@/components/carousel";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Particles } from "@/components/particles";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden text-white">
      {/* 💬 Your actual content */}
      <section className="mx-auto mt-[200px] flex max-w-[1200px] flex-col items-center justify-center gap-y-15">
        <div className="space-y-10">
          <h1 className="text-center text-[64px] leading-[50px] font-semibold">
            Unbreakable encryption
          </h1>

          <p className="text-center text-[20px] leading-[24px]">
            With just a click, a code, concealed forever.
          </p>
        </div>

        <div className="space-x-8">
          <a
            href="https://docs.mothrbox.xyz/"
            target="_blank"
            referrerPolicy="no-referrer"
            className="rounded-full bg-[#9E5ED6] px-10 py-4 text-sm font-bold text-white shadow-[inset_0_12px_20px_rgba(255,255,255,0.5)] transition-all"
          >
            View Docs
          </a>

          <Link
            href="/dashboard/encrypt"
            className="shadow-inner-glow rounded-full border border-[#9E5ED6]/50 px-10 py-4 text-sm font-bold transition-all"
          >
            Start Encryption
          </Link>
        </div>
      </section>

      <section className="relative mx-auto mt-30 w-full">
        {/* Lamp Background */}
        <div className="relative mx-auto h-full w-full">
          <img
            src="/images/lamp-2.png"
            alt="lamp"
            className="h-full w-full object-cover"
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

      <section className="mx-auto my-10 max-w-[1250px]">
        <BrandSlider />
      </section>
    </div>
  );
}
