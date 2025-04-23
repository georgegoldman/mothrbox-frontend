// components/Sidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';


export default function Sidebar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);


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

  const handleLogout = () => {
    // Replace with actual logout logic
    alert("Logged out!");
    setShowLogoutModal(false);
  };

  return (
    <>
    <div className={`sidebar d-flex flex-column text-white p-3 ${showLogoutModal ? 'blurred' : ''}`}>

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

      <div className="section mb-4">
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

      {/* Logout Button at the bottom */}
      <div className="mt-5">
        <button
          className="sidebar-link text-start w-100 btn btn-link text-danger"
          onClick={() => setShowLogoutModal(true)}
        >
          <i className="fas fa-sign-out-alt me-2"></i> Logout
        </button>
      </div>
    </div>

    {/* Logout Confirmation Modal */}
    {showLogoutModal && (
      <div
        className="modal fade show d-block"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Logout</h5>
              <button type="button" className="btn-close" onClick={() => setShowLogoutModal(false)}></button>
            </div>
            <div className="modal-body">
              Are you sure you want to log out?
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Global Blur Style */}
    <style jsx global>{`
      .blurred {
        filter: blur(4px);
        pointer-events: none;
        user-select: none;
      }
    `}</style>
  </>

      

  );
}
