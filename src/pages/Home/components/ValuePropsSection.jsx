import { FaShieldAlt, FaHeadset, FaHome } from "react-icons/fa";

const ValuePropsSection = () => {
  const valueProps = [
    {
      icon: <FaHome className="text-4xl md:text-5xl text-blue-600" />,
      title: "We know just the place",
      description: "Near the beach. By the slopes. Find stays for every occasion.",
    },
    {
      icon: <FaShieldAlt className="text-4xl md:text-5xl text-blue-600" />,
      title: "Our VrboCare™ guarantee",
      description: "If your stay goes sideways, we'll step in—we'll always aim to make it right.",
    },
    {
      icon: <FaHeadset className="text-4xl md:text-5xl text-blue-600" />,
      title: "On call day or night",
      description: "Real people. Real support. 24/7—before, during, or after your stay.",
    },
  ];

  return (
    <div className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center"
            >
              <div className="mb-4">{prop.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {prop.title}
              </h3>
              <p className="text-base md:text-lg text-gray-600 max-w-sm">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuePropsSection;