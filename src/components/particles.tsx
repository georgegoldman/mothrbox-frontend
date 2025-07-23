export function Particles() {
  const dots = Array.from({ length: 100 });

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {dots.map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = Math.random() * 2 + 1; // 1px - 3px
        const delay = Math.random() * 5;

        return (
          <div
            key={i}
            className="animate-twinkle absolute rounded-full bg-white opacity-60"
            style={{
              top: `${top}vh`,
              left: `${left}vw`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
