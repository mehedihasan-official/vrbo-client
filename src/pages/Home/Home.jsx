import { FaCheck } from "react-icons/fa";
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
    <div className="container mx-auto ">
      {/* Title */}
      {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-gray-900">
        Search vacation rentals
      </h1> */}

      
        {/* Hero Section */}
        <HeroSection />
      

       {/* One Key Membership Banner */}
      <OneKeyBanner />

      {/* Popular Destinations Carousel */}
      <PopularDestinations />

      {/* Here Resort section */}
      <ResortSection />

       {/* Value Props Section */}
      <ValuePropsSection />

        {/* Early booking section */}
      <EarlyBooking />

      
      {/* One key card section */}
      <OneKeyCard />

       {/* Promotional Tiles */}
      <PromotionalTiles />

      {/* List Property */}
      <ListProperty />



    </div>
  );
};

export default Home;
