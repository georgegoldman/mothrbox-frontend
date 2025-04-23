// components/Sidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", icon: "fas fa-lock", href: "/dashboard" },
    { label: "Encrypt File", icon: "fas fa-lock", href: "/dashboard/encrypt" },
    { label: "Decrypt File", icon: "fas fa-lock-open", href: "/dashboard/decrypt" },
  ];

  const devItems = [
    { label: "API Key Management", icon: "fas fa-key", href: "/dashboard/api-key" },
    { label: "API Document", icon: "fas fa-file-alt", href: "#" },
    { label: "Encrypt", href: "/dashboard/encrypt-section" },
    { label: "Decrypt", href: "/dashboard/decrypt-section" },
    { label: "Authentication", href: "/dashboard/auth" },
    { label: "Errors", href: "/dashboard/errors" },
    { label: "Rate Limit", href: "/dashboard/rate-limit" },
    { label: "Logs & Usage", icon: "fas fa-clipboard", href: "/dashboard/logs" },
    { label: "Settings", icon: "fas fa-cog", href: "/dashboard/settings" },
  ];

  return (
    <div className="sidebar d-flex flex-column text-white p-3">
      <div className="section mb-4">
        <h6 className="text-light text-uppercase small">General</h6>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
          >
            {item.icon && <i className={`${item.icon} me-2`}></i>}
            {item.label}
          </Link>
        ))}
      </div>

      <div className="section">
        <h6 className="text-light text-uppercase small">Developer</h6>
        {devItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
          >
            {item.icon && <i className={`${item.icon} me-2`}></i>}
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
