import { FaCheck, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import image1 from "../../assets/images/Home-page_standard.avif";
import image2 from "../../assets/images/Home-page_standard.webp";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaTree, FaUmbrellaBeach, FaWarehouse } from "react-icons/fa";
import { MdHouseboat } from "react-icons/md";
import { GiIsland } from "react-icons/gi";
import Loading from './../../components/Loading';
import Cards from "../../components/Cards/Cards";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 3; // Changed from 9 to 3

  const { hotelData } = useContext(AuthContext);

  useEffect(() => {
    if (hotelData && hotelData.length > 0) {
      setLoading(false);
    }
  }, [hotelData]);

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const selectedCategories = [
    "All",
    "Tropical",
    "Beach",
    "Tiny homes",
    "Farms",
    "Islands",
  ];

  const categoryIcons = {
    All: "🏠",
    Tropical: <FaTree />,
    Beach: <FaUmbrellaBeach />,
    "Tiny homes": <MdHouseboat />,
    Farms: <FaWarehouse />,
    Islands: <GiIsland />,
  };

  // Filter data based on category and search term
  const filteredDataWithoutPagination = hotelData
    ? hotelData.filter(
        (item) =>
          selectedCategory === "All" || item.category === selectedCategory
      ).filter(
        (item) =>
          (item.name &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.location &&
            item.location.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  // Apply pagination
  const filteredData = filteredDataWithoutPagination.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredDataWithoutPagination.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      {/* Title */}
      {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-gray-900">
        Search vacation rentals
      </h1> */}

      {/* Search Bar */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl max-w-6xl mx-auto mb-6 md:mb-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 md:gap-4">
          {/* Location Input */}
          <div className="flex items-center w-full lg:w-auto lg:flex-1 border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
            <FaMapMarkerAlt className="text-gray-500 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Going to"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none text-sm md:text-base"
            />
          </div>

          {/* Check-in & Check-out Inputs */}
          <div className="flex w-full lg:w-auto lg:flex-1 gap-2 md:gap-3">
            <div className="flex items-center flex-1 border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
              <MdDateRange className="text-gray-500 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Check-in"
                className="w-full bg-transparent outline-none text-sm md:text-base"
              />
            </div>
            <div className="flex items-center flex-1 border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
              <MdDateRange className="text-gray-500 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Check-out"
                className="w-full bg-transparent outline-none text-sm md:text-base"
              />
            </div>
          </div>

          {/* Guests Input */}
          <div className="flex items-center w-full lg:w-auto lg:flex-1 border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
            <FaUser className="text-gray-500 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Guests - 2 travelers, 1 room"
              className="w-full bg-transparent outline-none text-sm md:text-base"
            />
          </div>

          {/* Search Button */}
          <button className="w-full lg:w-auto bg-[#1668e3] text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-600 active:bg-blue-700 transition-all shadow-md hover:shadow-lg whitespace-nowrap">
            Search
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col justify-center items-center mb-8 md:mb-10">
        <div className="w-full overflow-x-auto pb-2">
          <div className="flex justify-start md:justify-center gap-2 md:gap-3 min-w-max md:min-w-0 px-2">
            {selectedCategories.map((category, index) => (
              <button
                key={index}
                className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white border-blue-500 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <span className="text-lg md:text-xl">{categoryIcons[category]}</span>
                <span className="text-sm md:text-base font-medium">{category}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Results count */}
        <div className="mt-4 text-sm md:text-base text-gray-600">
          Showing {filteredData.length} of {filteredDataWithoutPagination.length} properties
        </div>
      </div>

      {/* Cards Section */}
      {filteredData.length > 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-10">
          {filteredData.map((item, index) => (
            <Cards key={index} data={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 md:py-16">
          <div className="text-gray-400 text-6xl md:text-7xl mb-4">🏠</div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
            No properties found
          </h3>
          <p className="text-gray-500 text-sm md:text-base">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}

      {/* Pagination Section */}
      {filteredData.length > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-8 md:my-12">
          {/* Previous Button */}
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1 md:gap-2">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={`min-w-[40px] h-10 rounded-lg font-medium transition-all ${
                  page === '...'
                    ? "cursor-default text-gray-400"
                    : page === currentPage
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400"
                }`}
                onClick={() => page !== '...' && handlePageChange(page)}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}

      {/* Membership Info */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center text-gray-700 px-2 md:px-4 max-w-6xl mx-auto text-sm md:text-base lg:text-lg my-8 md:my-12">
        <FaCheck className="text-2xl md:text-3xl text-green-600 flex-shrink-0 mt-1 sm:mt-0" />
        <p className="leading-relaxed">
          As a <span className="font-semibold text-blue-600">One Key</span> member, you can save 10% or more on over 100,000 hotels worldwide.
        </p>
      </div>

      {/* First Card Section */}
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 md:col-span-2 lg:col-span-3 max-w-md md:max-w-none mx-auto md:mx-0">
          <img 
            src={image1} 
            alt="Destination" 
            className="w-full h-48 sm:h-56 md:h-64 object-cover" 
          />
          <div className="p-4 md:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
              Feel right at home as you explore the world
            </h3>
            <div className="text-gray-600 space-y-3 md:space-y-4 text-sm md:text-base">
              <div>
                <p className="font-semibold text-gray-800">The perfect vacation rental awaits</p>
                <p className="mt-1">
                  Beachfront villas, city apartments or mountain cabins — whatever, wherever your heart desires.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">More value for your money</p>
                <p className="mt-1">
                  Rent an entire home for half the price of a hotel. Then add the savings of not always eating out at restaurants.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Amenities, amenities, amenities</p>
                <p className="mt-1">
                  Kick back and relax. Everything you need is at your fingertips — the comforts of spacious living, privacy and fully-stocked kitchens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Card Section */}
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 md:col-span-2 lg:col-span-3 max-w-md md:max-w-none mx-auto md:mx-0">
          <img 
            src={image2} 
            alt="Destination" 
            className="w-full h-48 sm:h-56 md:h-64 object-cover" 
          />
          <div className="p-4 md:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
              Enjoy the comforts of home when you travel for work
            </h3>
            <div className="text-gray-600 space-y-3 md:space-y-4 text-sm md:text-base">
              <div>
                <p className="font-semibold text-gray-800">Convenience</p>
                <p className="mt-1">
                  Choose from rentals in all the best parts of town — near the office or your favorite park and a morning run.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Amenities</p>
                <p className="mt-1">
                  Wi-Fi and work spaces make it business as usual, yet comfortable and relaxed in your own place.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Value</p>
                <p className="mt-1">
                  Stretch your travel dollar with lower nightly rates and home-cooked meals just the way you like them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;