import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Bash,
  Docker,
  Figma,
  Git,
  GitHub,
  OpenAI,
  VisualStudioCode,
} from "./svgs/companies";

export const companies = [
  { id: "figma", name: "Figma", logo: Figma },
  { id: "vscode", name: "VS Code", logo: VisualStudioCode },
  { id: "bash", name: "Terminal", logo: Bash },
  { id: "docker", name: "Docker", logo: Docker },
  { id: "openai", name: "OpenAI", logo: OpenAI },
  { id: "git", name: "Git", logo: Git },
  { id: "github", name: "GitHub", logo: GitHub },
];

export function BrandSlider() {
  const settings = {
    infinite: true,
    speed: 4000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <Slider {...settings} className="w-full">
      {companies.map(({ id, name, logo: Logo }) => (
        <div key={id} className="flex items-center justify-center px-4 py-2">
          <div className="flex items-center gap-2">
            <Logo
              className="h-8 w-auto opacity-80 grayscale transition-all duration-300 hover:opacity-100"
              aria-label={name}
            />
            <p className="text-sm font-semibold text-white">{name}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
}
