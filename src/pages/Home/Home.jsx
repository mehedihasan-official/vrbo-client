import { FaCheck, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import image1 from "../../assets/images/Home-page_standard.avif";
import image2 from "../../assets/images/Home-page_standard.webp";

const Home = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-gray-900">
        Search vacation rentals
      </h1>

      {/* Search Bar */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl max-w-6xl mx-auto mb-6 md:mb-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 md:gap-4">
          {/* Location Input */}
          <div className="flex items-center w-full lg:w-auto lg:flex-1 border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
            <FaMapMarkerAlt className="text-gray-500 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Going to"
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

      {/* Membership Info */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center text-gray-700 px-2 md:px-4 max-w-6xl mx-auto text-sm md:text-base lg:text-lg">
        <FaCheck className="text-2xl md:text-3xl text-green-600 flex-shrink-0 mt-1 sm:mt-0" />
        <p className="leading-relaxed">
          As a <span className="font-semibold text-blue-600">One Key</span> member, you can save 10% or more on over 100,000 hotels worldwide.
        </p>
      </div>

      {/* First Card Section */}
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Card */}
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
        {/* Card */}
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