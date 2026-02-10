import { Link } from "react-router";
import { FaStar, FaMapMarkerAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const Cards = ({ data = {} }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  // Ensure safe destructuring with additional resort fields
  const { id, price, title, date, location, image, reviews_amount } = data || {};

  // Generate random rating between 7 and 10 (with one decimal place)
  const rating = (Math.random() * 3 + 7).toFixed(1);
  
  // Determine comment based on rating
  let comment;
  if (rating < 8) {
    comment = "Good";
  } else if (rating < 9) {
    comment = "Excellent";
  } else {
    comment = "Wonderful";
  }

  // Handle missing data
  if (!id) {
    return (
      <div className="w-full max-w-sm mx-auto p-6 text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
        <div className="text-gray-400 text-5xl mb-3">🏠</div>
        <p className="text-gray-500 font-medium">Resort details not available</p>
      </div>
    );
  }

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    console.log(isLiked ? "Unliked resort:" : "Liked resort:", id);
  };

  return (
    <div className="w-full max-w-sm mx-auto group">
      <Link to={`/resort/${id}`} className="block">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:-translate-y-1">
          {/* Resort Image with Overlay */}
          <div className="relative overflow-hidden">
            {/* Image */}
            <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-200">
              <img
                src={image || "https://via.placeholder.com/400x300"}
                alt={title || "Resort"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Like Button */}
            <button
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2.5 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg z-10"
              onClick={handleLike}
            >
              {isLiked ? (
                <FaHeart className="text-red-500 text-lg animate-pulse" />
              ) : (
                <FaRegHeart className="text-gray-600 text-lg hover:text-red-500 transition-colors" />
              )}
            </button>

            {/* Rating Badge */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md flex items-center gap-1.5">
              <FaStar className="text-yellow-500 text-sm" />
              <span className="font-bold text-gray-800 text-sm">{rating}</span>
            </div>

            {/* Price Tag */}
            {price && (
              <div className="absolute bottom-3 right-3 bg-blue-600 text-white rounded-lg px-3 py-1.5 shadow-lg">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold">${price}</span>
                  <span className="text-xs opacity-90">/night</span>
                </div>
              </div>
            )}
          </div>

          {/* Resort Details */}
          <div className="p-4 sm:p-5 space-y-3">
            {/* Resort Title */}
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
              {title || "Luxury Resort"}
            </h2>

            {/* Location */}
            <div className="flex items-start gap-2 text-gray-600">
              <FaMapMarkerAlt className="mt-1 text-gray-500 flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium line-clamp-1">
                {location || "Unknown Location"}
              </span>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 rounded-lg px-2.5 py-1">
                <FaStar className="text-yellow-500 text-sm" />
                <span className="font-bold text-gray-800 text-sm">{rating}</span>
              </div>
              <span className="text-sm font-semibold text-gray-700">{comment}</span>
              {reviews_amount && (
                <span className="text-xs text-gray-500">
                  ({reviews_amount.toLocaleString()})
                </span>
              )}
            </div>

            {/* View Details Button - Visible on Hover */}
            <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all">
                View Details →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;