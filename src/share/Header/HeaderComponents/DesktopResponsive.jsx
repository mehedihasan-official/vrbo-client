import { IoMdDownload } from 'react-icons/io';
import { Link } from 'react-router';
import Loading from '../../../components/Loading';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const DesktopResponsive = ({

  navItems,
  isActiveLink,
  loading,
  isUserLoggedIn,
  usersData,
  handleSignOut,
}) => {
  return (
    <div className="hidden md:flex items-center gap-6">
      
      {/* Navigation */}
      <nav className="hidden lg:flex gap-8">
        {/* Open App Button */}
      <button className="hidden lg:flex items-center gap-2 border px-4 py-2 rounded-full text-blue-700 hover:bg-gray-800 hover:text-white transition">
        
        <span className="text-sm font-semibold ">Open app</span>
        <IoMdDownload />
      </button>

        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`font-semibold ${
              isActiveLink(item.path)
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      

      {loading ? (
        <Loading className="animate-spin text-xl text-blue-600" />
      ) : isUserLoggedIn ? (
        <Link className="flex items-center gap-4" to='/hosting-dashboard/listings'>
          <button onClick={handleSignOut}>
            <FaSignOutAlt className="text-xl text-gray-600 hover:text-red-600" />
          </button>
          {usersData?.imageURL ? (
            <img
              src={usersData.imageURL}
              className="w-10 h-10 rounded-full"
              alt="Profile"
            />
          ) : (
            <FaUserCircle className="text-3xl text-gray-600" />
          )}
        </Link>
      ) : (
        <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-full"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default DesktopResponsive