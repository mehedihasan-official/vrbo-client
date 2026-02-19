import SearchBar from "../../components/SearchBar/SearchBar";
import ResortSection from "./components/ResortSection";
import OneKeyBanner from "./components/OneKeyBanner";
import PopularDestinations from "./components/PopularDestinations";
import ValuePropsSection from "./components/ValuePropsSection";
import PromotionalTiles from "./components/PromotionalTiles";
import HeroSection from "./components/HeroSection";
import EarlyBooking from "./components/EarlyBooking";
import OneKeyCard from "./components/OneKeyCard";
import ListProperty from "./components/ListProperty";

const Home = () => {
  return (
    // Root wrapper — switches background and text color for the whole page
    <div className="
      min-h-screen
      bg-white dark:bg-gray-950
      text-gray-900 dark:text-gray-100
      transition-colors duration-300
    ">
      <div className="container mx-auto">

        {/* Hero Section */}
        <HeroSection />

        {/* One Key Membership Banner */}
        <OneKeyBanner />

        {/* Popular Destinations Carousel */}
        <PopularDestinations />

        {/* Resort Section */}
        <ResortSection />

        {/* Value Props Section */}
        <ValuePropsSection />

        {/* Early Booking Section */}
        <EarlyBooking />

        {/* One Key Card Section */}
        <OneKeyCard />

        {/* Promotional Tiles */}
        <PromotionalTiles />

        {/* List Property */}
        <ListProperty />

      </div>
    </div>
  );
};

export default Home;