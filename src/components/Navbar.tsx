import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "shehar_ludhiana_user";
const REDIRECT_KEY = "shehar_ludhiana_redirect"; // saves intended destination before login

const navItems = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "Areas", path: "/areas" },
  { label: "Blogs", path: "/blogs" },
  { label: "Write Blog", path: "/write-blog" },
  { label: "Events", path: "/events" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ phone?: string; name?: string; loginMethod?: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read user from localStorage on mount + on every route change
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setCurrentUser(raw ? JSON.parse(raw) : null);
    } catch {
      setCurrentUser(null);
    }
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /**
   * "List Your Business Free" button click:
   *  - If logged in  → go directly to /list-your-business
   *  - If NOT logged in → save intended redirect to localStorage, then go to /login
   *    After login, LoginPage will read this redirect and send user to /list-your-business
   */
  const handleListBusiness = () => {
    if (currentUser) {
      navigate("/list-your-business");
    } else {
      localStorage.setItem(REDIRECT_KEY, "/list-your-business");
      navigate("/login");
    }
  };

  /**
   * "Login" button click (direct):
   *  - No saved redirect → after login, LoginPage sends user to /dashboard
   */
  const handleLoginClick = () => {
    // Clear any existing redirect so direct login goes to dashboard
    localStorage.removeItem(REDIRECT_KEY);
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REDIRECT_KEY);
    setCurrentUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  const displayName = currentUser?.name ?? (currentUser?.phone ? `+91 ${currentUser.phone}` : "User");

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary italic font-serif">
          Shehar Ludhiana
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* List Your Business Button */}
          <Button size="sm" onClick={handleListBusiness}>
            List Your Business Free
          </Button>

          {/* Logged in: User dropdown | Not logged in: Login button */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
              >
                <span className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </span>
                <span className="max-w-[80px] truncate">{currentUser.name ?? "User"}</span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-2.5 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-800 truncate">{displayName}</p>
                    <p className="text-xs text-gray-400 capitalize">{currentUser.loginMethod ?? "phone"} login</p>
                  </div>

                  <button
                    onClick={() => { navigate("/dashboard"); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                    Dashboard
                  </button>

                  <button
                    onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                    Profile
                  </button>

                  <div className="border-t border-gray-100 mt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;