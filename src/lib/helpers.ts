export function getInitials(name: string): string {
  const words = name.trim().split(" ");
  const initials = words
    .map((word) => word[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
  return initials || "U";
}

export function getRandomBgColor(): string {
  const colors = [
    "#f87171",
    "#60a5fa",
    "#34d399",
    "#fcd34d",
    "#a78bfa",
    "#f472b6",
    "#6366f1",
    "#fb923c",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex]!;
}

export function getCookieValue(cookieName: string): string | null {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return value !== undefined ? decodeURIComponent(value) : null;
    }
  }
  return null;
}
