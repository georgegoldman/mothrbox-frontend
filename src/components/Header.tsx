'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LogIn, Menu, UserPlus } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/app/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/app/contexts/AuthContext';
import UserMenu from './UserMenu';
import Logo from './Logo';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHomePage = pathname === '/';

  const navItems = [
    { text: 'Events', href: '/events' },
    { text: 'Gallery', href: '/gallery' },
  ];

  return (
    <header
      className={cn(
        isScrolled || !isHomePage
          ? 'bg-background/80 backdrop-blur-md border-b py-4'
          : 'bg-transparent py-6'
      )}
    >
      <nav className="navbar bg-body-tertiary fixed-top">
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Logo />

        {isMobile ? (
          <div className="flex items-center gap-4">
            {/* <ThemeToggle /> */}
            {user ? <UserMenu /> : null}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-6 mt-12">
                  {user && navItems.map((item) => (
                    <a
                      key={item.text}
                      href={item.href}
                      className={cn(
                        'text-lg font-medium transition-colors',
                        pathname === item.href
                          ? 'text-foreground font-semibold'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.text}
                    </a>
                  ))}
                  {!user && (
                    <>
                      <Link
                        href="/sign-in"
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-8">
            {user && (
              <nav className="flex items-center gap-8">
                {navItems.map((item) => (
                  <a
                    key={item.text}
                    href={item.href}
                    className={cn(
                      'font-medium transition-colors hover:text-sui-blue',
                      pathname === item.href
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            )}
            <div className="flex items-center gap-4">
              {/* <ThemeToggle /> */}
              {user ? (
                <UserMenu />
              ) : (
                <>
                <ul className="nav justify-content-end">
                  <li className="nav-item">
                    <a className="nav-link text-black" aria-current="page" href="#">Active</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-black" href="#">Features</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-black" target='blank' href="https://github.com/georgegoldman/mothrbox">Doc</a>
                  </li>
                  <li className="nav-item ">
                    <a className="nav-link text-black">Dashboard</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-black" href="#">Pricing</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-black" href="#">Contact</a>
                  </li>
                  <li className="nav-item me-3">
                    <Link className="btn btn-outline-primary text-black" href="login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-outline-primary text-black" href="signup">Register</Link>
                  </li>
                </ul>
                </>
              )}
            </div>
          </div>
        )}
        
      </div>
      </nav>
    </header>
  );
};

export default Header;
