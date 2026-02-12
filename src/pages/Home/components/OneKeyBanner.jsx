import { FaStar } from "react-icons/fa";

const OneKeyBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500 text-2xl md:text-3xl" />
            <span className="text-xl md:text-2xl font-bold text-gray-900">One Key</span>
          </div>
          <div className="flex-1">
            <p className="text-base md:text-lg text-gray-700">
              <span className="font-semibold">Members always get our best prices when signed in</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Sign in
            </button>
            <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneKeyBanner;