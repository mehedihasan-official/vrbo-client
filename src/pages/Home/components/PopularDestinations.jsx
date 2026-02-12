import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PopularDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample destinations - replace with your actual data
  const destinations = [
    {
      id: 1,
      name: "Logan",
      image: "https://images.trvl-media.com/place/8392/c5d09a27-bad5-47b3-a576-d978d338c3d4.jpg?impolicy=fcrop&w=469&h=201&p=1&q=medium",
      description: "Hocking Hills region",
    },
    {
      id: 2,
      name: "Geneva-on-the-Lake",
      image: "https://images.trvl-media.com/place/6058849/45e3d730-1574-4221-a359-cb14e360f3fd.jpg?impolicy=fcrop&w=469&h=201&p=1&q=medium",
      description: "Lake Erie destination",
    },
    {
      id: 3,
      name: "Rockbridge",
      image: "https://images.trvl-media.com/place/6296770/59fb5d73-891a-440d-940d-a4ba6f65e4f5.jpg?impolicy=fcrop&w=469&h=201&p=1&q=medium",
      description: "Nature preserve area",
    },
    {
      id: 4,
      name: "South Bloomingville",
      image: "https://images.trvl-media.com/place/183806/26daabff-4166-44bd-b9f8-cad90c07c4bf.jpg?impolicy=fcrop&w=469&h=201&p=1&q=medium",
      description: "Scenic hiking spots",
    },
    {
      id: 5,
      name: "Miami Beach",
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=500&q=80",
      description: "Beautiful beaches",
    },
    {
      id: 6,
      name: "Aspen",
      image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=500&q=80",
      description: "Mountain paradise",
    },
  ];

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  };

  const maxIndex = destinations.length - itemsPerView.desktop;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
          Popular destinations
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
            aria-label="Previous destinations"
          >
            <FaChevronLeft className="text-xl text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all ${
              currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
            aria-label="Next destinations"
          >
            <FaChevronRight className="text-xl text-gray-700" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-4"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop + 1)}%)`,
              }}
            >
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {destination.name}
                      </h3>
                      <p className="text-sm text-gray-600">{destination.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;