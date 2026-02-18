import { Link } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const Cards = ({ data = {} }) => {
  const [isLiked, setIsLiked] = useState(false);

  const {
    id,
    price,
    title,
    location,
    image,
    reviews_amount,
    bedrooms,
    bathrooms,
    sleeps,
    type,
  } = data || {};

  const rating = (Math.random() * 3 + 7).toFixed(1);

  if (!id) {
    return null;
  }

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <Link to={`/singleResort/${id}`} className="block">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition hover:shadow-md">

          {/* Image Section */}
          <div className="relative">
            <img
              src={image || "https://via.placeholder.com/400x300"}
              alt={title}
              className="w-full h-56 object-cover"
            />

            {/* Heart Button */}
            <button
              onClick={handleLike}
              className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md"
            >
              {isLiked ? (
                <FaHeart className="text-red-500 text-lg" />
              ) : (
                <FaRegHeart className="text-gray-600 text-lg" />
              )}
            </button>
          </div>

          {/* Content Section */}
          <div className="p-4 space-y-2">

            {/* Property Type */}
            <p className="text-sm text-gray-600">
              {type || "Apartment"}
            </p>

            {/* Location */}
            <h2 className="text-lg font-semibold text-gray-900">
              {location || "Unknown location"}
            </h2>

            {/* Property Details */}
            <p className="text-sm text-gray-600">
              {sleeps || 4} Sleeps · {bedrooms || 1} bedroom ·{" "}
              {bathrooms || 1} bathroom
            </p>

            {/* Bottom Section */}
            <div className="flex justify-between items-end pt-2">

              {/* Rating + Reviews */}
              <div className="flex items-center gap-2">
                <div className="bg-green-600 text-white text-sm font-semibold px-2 py-0.5 rounded-md">
                  {rating}
                </div>
                <span className="text-sm text-gray-700">
                  {reviews_amount || 49} reviews
                </span>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  ${price || 568}
                </p>
                <p className="text-xs text-gray-600">
                  avg per night
                </p>
              </div>

            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
