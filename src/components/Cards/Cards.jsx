import { Link } from "react-router";
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaBed } from "react-icons/fa";
import { useState } from "react";

const Cards = ({ data = {} }) => {
  const [isLiked, setIsLiked] = useState(false);

  const {
    id,
    price,
    title,
    location,
    bed,
    weekPrice,
    totalPrice,
    nights,
    image,
    reviews_amount,
    bedrooms,
    bathrooms,
    sleeps,
    type,
  } = data || {};

  const rating = (Math.random() * 3 + 7).toFixed(1);

  if (!id) return null;

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // image can be an array or a plain string
  const displayImage = Array.isArray(image)
    ? image[0]
    : image || "https://via.placeholder.com/400x300";

  // Bed label — handle 'Studio', '1', '2', etc.
  const bedLabel =
    bed === "Studio"
      ? "Studio"
      : bed
      ? `${bed} Bedroom${parseInt(bed) > 1 ? "s" : ""}`
      : `${bedrooms || 1} Bedroom`;

  // Price display function:
  // - if weekPrice exists  → show total week price as main price
  // - if totalPrice+nights → show total for short stay (e.g. 3 nights)
  // - otherwise            → fall back to nightly price
  const renderPrice = () => {
    if (weekPrice) {
      return (
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            ${parseInt(weekPrice).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">per week</p>
        </div>
      );
    }

    if (totalPrice && nights) {
      return (
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            ${parseInt(totalPrice).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">{nights} nights total</p>
        </div>
      );
    }

    // Default — nightly price
    return (
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">
          {price || "$568"}
        </p>
        <p className="text-xs text-gray-500">avg per night</p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <Link to={`/singleResort/${id}`} className="block">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition hover:shadow-md">

          {/* Image Section */}
          <div className="relative">
            <img
              src={displayImage}
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
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              {type || "Resort"}
            </p>

            {/* Title */}
            <h2 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
              {title || "Unknown Property"}
            </h2>

            {/* Location */}
            {location && (
              <div className="flex items-start gap-1 text-sm text-gray-500">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-gray-400" />
                <span className="line-clamp-1">{location}</span>
              </div>
            )}

            {/* Property Details — sleeps, bed, bathrooms */}
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <FaBed className="text-gray-400" />
              <span>
                {sleeps || 4} Sleeps · {bedLabel} · {bathrooms || 1} Bath
              </span>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-end pt-2 border-t border-gray-100">

              {/* Rating + Reviews */}
              <div className="flex items-center gap-2">
                <div className="bg-green-600 text-white text-sm font-semibold px-2 py-0.5 rounded-md">
                  {rating}
                </div>
                <span className="text-sm text-gray-600">
                  {reviews_amount || 49} reviews
                </span>
              </div>

              {/* Price — controlled by renderPrice() */}
              {renderPrice()}

            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;