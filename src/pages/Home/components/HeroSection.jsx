import SearchBar from "../../../components/SearchBar/SearchBar";
import HeroSectionImage from "../../../assets/images/hero-section-image.png";

const HeroSection = () => {
  return (
    <div className="relative min-h-[200px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HeroSectionImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center">
        {/* Main Title */}
        <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold mb-8 md:mb-10 text-white drop-shadow-lg">
          Entire place, just for you
        </h1>

        {/* Search Bar */}
        <SearchBar />
      </div>
    </div>
  );
};

export default HeroSection;