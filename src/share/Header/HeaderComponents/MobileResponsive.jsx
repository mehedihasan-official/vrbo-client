import { FaUserCircle, FaSignOutAlt, FaSun, FaMoon } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { MdClose, MdMenu } from "react-icons/md";
import { Link } from "react-router";
import Loading from "../../../components/Loading";
import { useTheme } from "../../../providers/ThemeProvider";

const MobileResponsive = ({
  navItems,
  isActiveLink,
  loading,
  isUserLoggedIn,
  usersData,
  handleSignOut,
  isMobileMenuOpen,
  setMobileMenuOpen,
}) => {
   const { isDark, toggleTheme } = useTheme();

// Reusable toggle button used in both desktop and mobile
  const ThemeToggleButton = () => (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="p-2 rounded-full transition-colors duration-200
        bg-gray-100 hover:bg-gray-200
        dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      {isDark
        ? <FaSun className="text-yellow-400 text-lg" />
        : <FaMoon className="text-gray-600 text-lg" />
      }
    </button>
  );



  
  return (
    <div className="flex md:hidden items-center gap-3">

      {/* Open App Button */}
      <button className="flex items-center gap-1 border px-3 py-1.5 rounded-full text-xs text-blue-600 font-semibold hover:bg-blue-50 transition">
        Open app
        <IoMdDownload />
      </button>

      {/* My Trips */}
      {/* <Link className="text-sm font-medium text-gray-700">
        My Trips
      </Link> */}

      {/* User Section */}
      {loading ? (
        <Loading className="animate-spin text-lg text-blue-600" />
      ) : isUserLoggedIn ? (
        <Link to="/hosting-dashboard/listings">
          {usersData?.imageURL ? (
            <img
              src={usersData.imageURL}
              className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition"
              alt="Profile"
            />
          ) : (
            <FaUserCircle className="text-3xl text-gray-600 hover:text-blue-600 transition" />
          )}
        </Link>
      ) : (
        <Link
          to="/login"
          className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-700 transition"
        >
          Sign In
        </Link>
      )}

      {/* Theme toggle — mobile (always visible) */}
            <ThemeToggleButton />

      {/* Menu Toggle */}
      <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? (
          <MdClose className="text-2xl" />
        ) : (
          <MdMenu className="text-2xl" />
        )}
      </button>

      {/* ================= SLIDE MENU ================= */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sliding Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setMobileMenuOpen(false)}>
              <MdClose className="text-2xl" />
            </button>
          </div>

          {/* User Info Section */}
          {isUserLoggedIn && (
            <div className="flex items-center gap-3 p-5 border-b">
              {usersData?.imageURL ? (
                <img
                  src={usersData.imageURL}
                  className="w-12 h-12 rounded-full object-cover"
                  alt="Profile"
                />
              ) : (
                <FaUserCircle className="text-4xl text-gray-500" />
              )}
              <div>
                <p className="font-semibold">
                  {usersData?.name || "Welcome Back"}
                </p>
                <Link
                  to="/hosting-dashboard/listings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-blue-600"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <ul className="p-5 space-y-5">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-medium transition ${
                    isActiveLink(item.path)
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom Section */}
          {isUserLoggedIn && (
            <div className="absolute bottom-0 left-0 w-full p-5 border-t bg-gray-50">
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg transition"
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileResponsive;
