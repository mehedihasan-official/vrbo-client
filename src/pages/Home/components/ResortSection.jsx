import { useContext, useEffect, useState } from "react";
import { FaTree, FaUmbrellaBeach, FaWarehouse } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";
import { MdHouseboat } from "react-icons/md";
import Cards from "../../../components/Cards/Cards";
import Loading from "../../../components/Loading";
import { AuthContext } from "../../../providers/AuthProvider";

const ResortSection = () => {
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
    ? hotelData
        .filter(
          (item) =>
            selectedCategory === "All" || item.category === selectedCategory,
        )
        .filter(
          (item) =>
            (item.name &&
              item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.location &&
              item.location.toLowerCase().includes(searchTerm.toLowerCase())),
        )
    : [];

  // Apply pagination
  const filteredData = filteredDataWithoutPagination.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(
    filteredDataWithoutPagination.length / itemsPerPage,
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
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
                <span className="text-lg md:text-xl">
                  {categoryIcons[category]}
                </span>
                <span className="text-sm md:text-base font-medium">
                  {category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm md:text-base text-gray-600">
          Showing {filteredData.length} of{" "}
          {filteredDataWithoutPagination.length} properties
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
                  page === "..."
                    ? "cursor-default text-gray-400"
                    : page === currentPage
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400"
                }`}
                onClick={() => page !== "..." && handlePageChange(page)}
                disabled={page === "..."}
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
    </div>
  );
};

export default ResortSection;
