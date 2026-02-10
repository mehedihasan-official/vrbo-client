
import { FaHome, FaArrowLeft, FaSearch } from "react-icons/fa";
import { BiSad } from "react-icons/bi";
import { Link, useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center space-y-8">
          
          {/* 404 Illustration */}
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-[120px] sm:text-[150px] md:text-[200px] lg:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-none select-none">
              404
            </h1>
            
            {/* Sad Face Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <BiSad className="text-6xl sm:text-7xl md:text-8xl text-gray-300 animate-bounce" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 -mt-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              Oops! Page Not Found
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              The page you're looking for seems to have gone on vacation. 
              Don't worry, even our best properties get lost sometimes! 🏖️
            </p>
          </div>

          {/* Animated Decorative Elements */}
          <div className="flex justify-center gap-4 py-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
            
            {/* Go Back Button */}
            <button
              onClick={handleGoBack}
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-base sm:text-lg">Go Back</span>
            </button>

            {/* Home Button */}
            <Link
              to="/"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
            >
              <FaHome className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="text-base sm:text-lg">Back to Home</span>
            </Link>
          </div>

          {/* Search Suggestion */}
          <div className="pt-8">
            <p className="text-sm sm:text-base text-gray-500 mb-4">
              Or try searching for something:
            </p>
            <Link
              to="/resorts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 group"
            >
              <FaSearch className="text-gray-500 group-hover:text-blue-600 transition-colors" />
              <span className="font-medium">Browse All Resorts</span>
            </Link>
          </div>

          {/* Popular Links */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Popular Pages:</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                to="/resorts"
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                Resorts
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
              >
                Contact Us
              </Link>
              <Link
                to="/hosting-dashboard/listings"
                className="px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors text-sm font-medium"
              >
                My Hosting
              </Link>
            </div>
          </div>

          {/* Fun Footer Message */}
          <div className="pt-8">
            <p className="text-xs sm:text-sm text-gray-400 italic">
              "Not all who wander are lost... but this page definitely is." 🧭
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;