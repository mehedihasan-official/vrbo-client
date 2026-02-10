import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { MdMenu, MdClose } from "react-icons/md";
import { FaUserCircle, FaSignOutAlt, FaHome, FaBuilding, FaEnvelope } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import Swal from "sweetalert2";
import logo from "../../../src/assets/vrbo_logo.svg";
import ToggleMenu from "../../components/ToggleMenu/ToggleMenu";
import { AuthContext } from "../../providers/AuthProvider";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, usersData, loading, signOut, admin } = useContext(AuthContext);
  const location = useLocation();

  const isUserLoggedIn = !!user;

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleProfileMenu = () => setProfileMenuOpen((prev) => !prev);
  const closeProfileMenu = () => setProfileMenuOpen(false);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        closeMobileMenu();
      }
      if (isProfileMenuOpen && !event.target.closest('.profile-menu-container')) {
        closeProfileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, isProfileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = () => {
    Swal.fire({
      title: "Logged Out Successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      signOut();
      closeMobileMenu();
    });
  };

  // Check if link is active
  const isActiveLink = (path) => location.pathname === path;

  // Navigation items
  const navItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/resorts", label: "Resorts", icon: <FaBuilding /> },
    { 
      path: admin ? "/admin-panel/admin-overview" : "/hosting-dashboard/listings", 
      label: admin ? "Admin Panel" : "My Hosting",
      icon: admin ? <RiAdminFill /> : <FaBuilding />
    },
    { path: "/contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  return (
    <>
      {/* Backdrop Overlay */}
      {(isMobileMenuOpen || isProfileMenuOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => {
            closeMobileMenu();
            closeProfileMenu();
          }}
        />
      )}

      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105 duration-200">
              <img src={logo} className="w-20 sm:w-24 md:w-28 lg:w-32" alt="VRBO Logo" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-semibold text-base xl:text-lg transition-all duration-200 relative group ${
                    isActiveLink(item.path)
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                      isActiveLink(item.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              {/* Get the App Button */}
              <button className="hidden lg:flex items-center gap-2 rounded-full border-2 border-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white hover:border-gray-700 transition-all duration-200 group">
                <IoMdDownload className="text-blue-500 group-hover:text-white text-xl" />
                <span className="text-sm font-semibold whitespace-nowrap">Get the App</span>
              </button>

              {loading ? (
                <div className="flex items-center justify-center w-12 h-12">
                  <ImSpinner8 className="text-2xl animate-spin text-blue-600" />
                </div>
              ) : isUserLoggedIn ? (
                <div className="flex items-center gap-3 lg:gap-4">
                  {/* Sign Out Button */}
                  <button
                    onClick={handleSignOut}
                    className="p-2 rounded-full hover:bg-red-50 transition-all duration-200 group"
                    title="Sign Out"
                  >
                    <FaSignOutAlt className="text-xl lg:text-2xl text-gray-600 group-hover:text-red-600 transition-colors" />
                  </button>

                  {/* Profile Picture */}
                  <Link 
                    to="hosting-dashboard/profile"
                    className="relative group"
                  >
                    {usersData?.imageURL ? (
                      <img
                        src={usersData.imageURL}
                        alt="Profile"
                        className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-gray-300 group-hover:border-blue-500 transition-all duration-200"
                      />
                    ) : (
                      <FaUserCircle className="text-3xl lg:text-4xl text-gray-600 group-hover:text-blue-600 transition-colors" />
                    )}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2 sm:gap-3">
              {loading ? (
                <div className="flex items-center justify-center w-10 h-10">
                  <ImSpinner8 className="text-xl animate-spin text-blue-600" />
                </div>
              ) : isUserLoggedIn ? (
                <div className="flex items-center gap-2">
                  {/* Profile Picture - Mobile */}
                  <Link to="/profile" onClick={closeMobileMenu}>
                    {usersData?.imageURL ? (
                      <img
                        src={usersData.imageURL}
                        alt="Profile"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-gray-300"
                      />
                    ) : (
                      <FaUserCircle className="text-2xl sm:text-3xl text-gray-600" />
                    )}
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-600 text-white text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors mobile-menu-container"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <MdClose className="text-2xl sm:text-3xl text-gray-700" />
                ) : (
                  <MdMenu className="text-2xl sm:text-3xl text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`fixed top-[72px] sm:top-[76px] right-0 h-[calc(100vh-72px)] sm:h-[calc(100vh-76px)] w-full sm:w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out mobile-menu-container ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden overflow-y-auto`}
        >
          <div className="flex flex-col h-full">
            {/* User Info Section */}
            {isUserLoggedIn && (
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                <div className="flex items-center gap-4">
                  {usersData?.imageURL ? (
                    <img
                      src={usersData.imageURL}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover border-4 border-white/30"
                    />
                  ) : (
                    <FaUserCircle className="text-6xl text-white/90" />
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{usersData?.name || "User"}</h3>
                    <p className="text-sm text-white/80">{usersData?.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="flex-1 py-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-4 px-6 py-4 font-semibold transition-all duration-200 ${
                        isActiveLink(item.path)
                          ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-base">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="my-4 border-t border-gray-200" />

              {/* Additional Links */}
              <ul className="space-y-1">
                {isUserLoggedIn ? (
                  <>
                    <li>
                      <Link
                        to="/hosting-dashboard/add-property"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-4 px-6 py-4 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-xl">➕</span>
                        <span>Add Property</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-4 px-6 py-4 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                      >
                        <FaUserCircle className="text-xl" />
                        <span>My Profile</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-4 px-6 py-4 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-xl">🔐</span>
                        <span>Log In</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-4 px-6 py-4 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-xl">📝</span>
                        <span>Register</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-200 space-y-3">
              {/* Get the App Button */}
              <button className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-3 hover:bg-gray-700 hover:text-white hover:border-gray-700 transition-all duration-200 group">
                <IoMdDownload className="text-blue-500 group-hover:text-white text-xl" />
                <span className="font-semibold">Get the App</span>
              </button>

              {/* Sign Out Button */}
              {isUserLoggedIn && (
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-50 text-red-600 px-4 py-3 font-semibold hover:bg-red-600 hover:text-white transition-all duration-200"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;