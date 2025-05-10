import React, { useEffect } from "react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface CarouselProps {
  trustedDevs: {
    id: number;
    image: StaticImageData;
  }[];
}

export default function Carousel({ trustedDevs }: CarouselProps) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 4 },
    breakpoints: {
      "(max-width: 640px)": {
        slides: { perView: 2 },
      },
      "(min-width: 641px) and (max-width: 1024px)": {
        slides: { perView: 3 },
      },
      "(min-width: 1025px) and (max-width: 1280px)": {
        slides: { perView: 4 },
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 700);

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="overflow-none">
      <div className="keen-slider" ref={sliderRef}>
        {trustedDevs.map((dev) => (
          <div
            key={dev.id}
            className="keen-slider__slide flex h-[100px] w-[120px] flex-none items-center justify-center"
          >
            <Image
              src={dev.image}
              alt={`Trusted Dev ${dev.id}`}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
