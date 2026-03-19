import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationContainer from "./NotificationContainer";
import { NotificationContext } from "../../contexts/NotificationContext";
import { AuthContext } from "../../contexts/AuthContext";

export default function AppShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { notifications, removeNotification } = useContext(NotificationContext);
  const { isLoggedIn, logout } = useContext(AuthContext);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // Base navigation items (always visible)
  const baseNavItems = [
    { label: "Home", to: "/" },
    { label: "Browse Plants", to: "/plants" },
    { label: "Learning", to: "/learning" },
    { label: "3D Models", to: "/three-d-models" },
  ];

  // Conditional navigation items (only for logged-in users)
  const protectedNavItems = isLoggedIn
    ? [
        { label: "My Garden", to: "/my-garden" },
        { label: "Profile", to: "/profile" },
      ]
    : [];

  // Combine nav items
  const navItems = [...baseNavItems, ...protectedNavItems];

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(circle_at_top,_rgba(113,171,88,0.16),_transparent_50%)]" />
      <header className="sticky top-0 z-40 border-b border-white/40 bg-[#f6f3eb]/90 backdrop-blur-xl">
        <div className="section-shell flex items-center justify-between py-4">
          <Link className="flex items-center gap-3" to="/">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-card">
              <img alt="Virtual Herbal Garden logo" className="h-9 w-9 object-contain" src="/images/logo.png" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-forest-900">Virtual Herbal Garden</p>
              <p className="text-xs uppercase tracking-[0.3em] text-forest-500">Medicinal Plant Hub</p>
            </div>
          </Link>
          <button
            aria-label="Toggle navigation"
            className="rounded-full border border-forest-200 px-4 py-2 text-sm font-medium text-forest-800 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
          >
            Menu
          </button>
          <nav className="hidden items-center gap-3 lg:flex">
            {navItems.map((item) => (
              <Link
                className="rounded-full px-4 py-2 text-sm font-medium text-forest-700 transition hover:bg-white hover:text-forest-900"
                key={item.label}
                to={item.to}
              >
                {item.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200"
              >
                Logout
              </button>
            ) : (
              <Link
                className="rounded-full bg-forest-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-forest-700"
                to="/login"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
        {mobileOpen ? (
          <div className="section-shell flex flex-col gap-2 pb-4 lg:hidden">
            {navItems.map((item) => (
              <Link
                className="rounded-2xl bg-white/80 px-4 py-3 text-sm font-medium text-forest-800 shadow-card"
                key={item.label}
                to={item.to}
              >
                {item.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="rounded-2xl bg-red-100 px-4 py-3 text-sm font-medium text-red-700 shadow-card hover:bg-red-200 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                className="rounded-2xl bg-forest-600 px-4 py-3 text-sm font-medium text-white shadow-card hover:bg-forest-700 transition"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        ) : null}
      </header>

      <main>{children}</main>

      <NotificationContainer notifications={notifications} onRemove={removeNotification} />

      <footer className="border-t border-forest-100 bg-white/70 py-10">
        <div className="section-shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl font-semibold text-forest-900">Virtual Herbal Garden</p>
            <p className="mt-2 max-w-xl text-sm text-forest-600">
              Your complete guide to medicinal plants, integrated garden tools, and interactive wellness learning.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-forest-700">
            <Link className="hover:text-forest-900" to="/">
              Home
            </Link>
            <Link className="hover:text-forest-900" to="/plants">
              Browse Plants
            </Link>
            <Link className="hover:text-forest-900" to="/learning">
              Learning
            </Link>
            <Link className="hover:text-forest-900" to="/three-d-models">
              3D Models
            </Link>
            {isLoggedIn && (
              <>
                <Link className="hover:text-forest-900" to="/my-garden">
                  My Garden
                </Link>
                <Link className="hover:text-forest-900" to="/profile">
                  Profile
                </Link>
              </>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hover:text-red-600 transition font-medium"
              >
                Logout
              </button>
            ) : (
              <Link className="hover:text-forest-900 font-medium" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
