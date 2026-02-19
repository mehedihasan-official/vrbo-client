import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Cards from "../../components/Cards/Cards";

const Reservations = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const { hotelData = [], loading } = useContext(AuthContext);

  useEffect(() => {
    filterData("All");
  }, [hotelData]);

  const filterData = (filter) => {
    let result = [];

    if (filter === "All") {
      result = hotelData.filter((item) => item.category === "Farms");
    } else {
      result = hotelData.filter(
        (item) =>
          item.status &&
          item.status.toLowerCase() === filter.toLowerCase()
      );
    }

    setFilteredData(result);
    setSelectedFilter(filter);
  };

  const totalReturn = hotelData
    .filter(
      (item) => item.status && item.status.toLowerCase() === "complete"
    )
    .reduce((sum, item) => {
      return sum + Number(item.weekPrice || item.totalPrice || 0);
    }, 0);

  const renderFilteredData = () => {
    if (loading) {
      return (
        <div className="col-span-2 flex justify-center mt-10">
          <p>Loading...</p>
        </div>
      );
    }

    if (filteredData.length === 0) {
      if (selectedFilter === "Upcoming") {
        return (
          <div className="col-span-2 flex justify-center mt-10">
            <p className="text-lg font-semibold text-center">
              You have no upcoming reservations.
            </p>
          </div>
        );
      }
      return (
        <div className="col-span-2 flex justify-center mt-10">
          <p className="text-lg font-semibold text-center">
            No results found.
            <br />
            <span className="font-normal text-gray-600">
              Please try a different filter.
            </span>
          </p>
        </div>
      );
    }

    return filteredData.map((item, index) => (
      <div key={item._id || index} className="relative">

        {/* Status Badge */}
        {selectedFilter !== "All" && (
          <div
            className={`absolute top-3 left-3 z-10 text-xs font-semibold px-3 py-1 rounded-full shadow ${
              item.status?.toLowerCase() === "complete"
                ? "bg-green-100 text-green-700"
                : item.status?.toLowerCase() === "upcoming"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {item.status}
          </div>
        )}

        <Cards data={item} />

        {/* Price Footer */}
        {(item.status?.toLowerCase() === "complete" ||
          item.status?.toLowerCase() === "upcoming") &&
          selectedFilter !== "All" && (
            <div className="mt-1 px-2 text-sm text-gray-600 flex justify-between">
              <span>{item.nights ? `${item.nights} nights` : "1 week"}</span>
              <span className="font-semibold text-gray-800">
                Total: $
                {Number(item.weekPrice || item.totalPrice || 0).toLocaleString()}
              </span>
            </div>
          )}
      </div>
    ));
  };

  return (
    /* ✅ removed md:ml-10 (was pushing layout off-center)
       ✅ added overflow-x-hidden to prevent horizontal scroll
       ✅ added px-4 for consistent side padding on all screen sizes
       ✅ w-full ensures it never exceeds the viewport */
    <div className="w-full max-w-5xl mx-auto px-4 overflow-x-hidden flex flex-col items-center mt-5">
      <h2 className="text-xl md:text-3xl font-bold mb-4">Reservations</h2>

      {/* Overall Return Banner */}
      {selectedFilter === "Complete" && totalReturn > 0 && (
        <div className="w-full max-w-sm mb-6 py-3 bg-green-50 border border-green-200 rounded-xl text-center shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Overall Return (Completed)</p>
          <p className="text-2xl font-bold text-green-600">
            ${totalReturn.toLocaleString()}
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center justify-center gap-6 md:gap-10 mb-4 w-full">
        {["Upcoming", "Complete", "Canceled", "All"].map((filter) => (
          <button
            key={filter}
            className={`cursor-pointer text-sm md:text-base ${
              selectedFilter === filter ? "text-blue-500 font-bold" : ""
            }`}
            onClick={() => filterData(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full max-w-md border-t border-gray-300 mb-5" />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full justify-items-center">
        {renderFilteredData()}
      </div>
    </div>
  );
};

export default Reservations;