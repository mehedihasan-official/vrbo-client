import { Link } from "react-router";
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaTag } from "react-icons/fa";

<<<<<<< HEAD
const InfoCard = ({ 
  data, 
  showLocation = true, 
  showDate = true, 
  showPrice = true,
  showCategory = false 
}) => {
  const { id, price, date, location, image, title, description, category } = data;
=======
const InfoCard = ({ data, showLocation = true, showDate = true, showPrice = true, isCached }) => {
  const { id, price, date, location, image, title, description, category, beds, nights } = data;

  const truncateDescription = (text, maxWords = 100) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  // Extract numeric value from price string (e.g., "$1200/night" -> 1200)
  const getNumericPrice = (priceStr) => {
    if (!priceStr) return 0;
    const numericValue = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue) || 0;
  };

  const pricePerNight = getNumericPrice(price);
  const pricePerWeek = pricePerNight * (nights || 7); // Default to 7 nights if not specified
>>>>>>> e9baa1dc303eb0b2bbb621064445220f5624ab9e

  // Truncate description to specified number of lines
  const truncateText = (text, lines = 3) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= 30) return text;
    return words.slice(0, 30).join(' ') + '...';
  };

  return (
<<<<<<< HEAD
    <div className="w-full max-w-md mx-auto lg:max-w-lg">
      <Link to={`/resort/${id}`} className="block group">
        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:-translate-y-1">
          
          {/* Image Section */}
          <div className="relative overflow-hidden">
            <img 
              src={image || "https://via.placeholder.com/500x300"} 
              alt={title || `Property ${id}`} 
              className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Category Badge */}
            {showCategory && category && (
              <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-1.5">
                <FaTag className="text-xs" />
                {category}
              </div>
            )}

            {/* Price Badge */}
            {showPrice && price && (
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">${price}</span>
                  <span className="text-xs text-gray-600">/night</span>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
            
            {/* Title */}
            {title && (
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                {title}
              </h3>
            )}

            {/* Description */}
            {description && (
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
                {description}
              </p>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-2">
              {/* Location */}
              {showLocation && location && (
                <div className="flex items-start gap-2 text-gray-700">
                  <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0 text-sm" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Location</p>
                    <p className="text-sm sm:text-base font-semibold line-clamp-1">{location}</p>
                  </div>
                </div>
              )}

              {/* Date */}
              {showDate && date && (
                <div className="flex items-start gap-2 text-gray-700">
                  <FaCalendarAlt className="text-green-500 mt-1 flex-shrink-0 text-sm" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Available</p>
                    <p className="text-sm sm:text-base font-semibold">{date}</p>
                  </div>
                </div>
              )}
            </div>

            {/* View Details Button - Shows on Hover */}
            <div className="pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all">
                View Full Details →
              </div>
            </div>
=======
    <div className="w-[360px] space-y-10 md:w-[500px] lg:w-[500px] p-4 md:gap-5">
      <Link to={`/single-resort/${id}`}>
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <img
            src={Array.isArray(image) ? image[0] : image}
            alt={`Image for ${title || id}`}
            className="mt-2 w-[350px] h-[200px] md:w-[450px] md:h-[300px] lg:w-[450px] lg:h-[300px] xl:w-[450px] xl:h-[300px] rounded-md object-cover"
          />

          <h2 className="mt-2 text-lg font-semibold text-gray-800">{title}</h2>

          <p className={`mt-2 text-base font-semibold text-gray-600 ${!showLocation && 'hidden'}`}>
            Location: {location}
          </p>

          {/* Show beds and nights for special resorts (IDs 3 and 8) */}
          <div className="text-sm">
          {(!isCached && (id === 3 || id === 8)) && (
            <div className="mt-2 space-y-1">
              <p className="text-gray-600">Beds: {beds || 2}</p>
              <p className="text-gray-600">Stays: {nights || 7} nights</p>
            </div>
          )}
          

          {/* Price display */}
          {showPrice && (
            <div className="mt-2 space-y-1">
              <p className="text-gray-600">
                Price: <span className="text-gray-700 font-semibold">${pricePerNight.toFixed(2)}/night</span>
              </p>
              <p className="text-gray-600">
                Weekly Total: <span className="text-gray-700 font-semibold">${pricePerWeek.toFixed(2)}</span>
              </p>
            </div>
          )}

</div>

          
          <div className="text-sm mt-2 space-y-1">
          {description && <p className="mt-2 text-gray-600">{truncateDescription(description)}</p>}
          {category && <p className="mt-2 text-gray-500 italic">{category}</p>}
>>>>>>> e9baa1dc303eb0b2bbb621064445220f5624ab9e
          </div>
        </div>
      </Link>
    </div>
  );
};

export default InfoCard;