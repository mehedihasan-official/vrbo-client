import { FaShieldAlt, FaHeadset, FaHome } from "react-icons/fa";

const ValuePropsSection = () => {
  const valueProps = [
    {
      icon: <FaHome className="text-3xl md:text-4xl text-[#191e3b]" />,
      title: "We know just the place",
      description: "Near the beach. By the slopes. Find stays for every occasion.",
    },
    {
      icon: <FaShieldAlt className="text-3xl md:text-4xl text-[#191e3b]" />,
      title: "Our VrboCare™ guarantee",
      description: "If your stay goes sideways, we'll step in—we'll always aim to make it right.",
    },
    {
      icon: <FaHeadset className="text-3xl md:text-4xl text-[#191e3b]" />,
      title: "On call day or night",
      description: "Real people. Real support. 24/7—before, during, or after your stay.",
    },
  ];

  return (
    <div className="py-12 m-8 md:py-16 rounded-2xl  bg-[#ebf5ff]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="text-start flex gap-5 md:gap-2 items-center md:items-start"
            >
              <div className="mb-4 p-3 rounded-full bg-[#c8dff9] ">{prop.icon}</div>
             <div>
               <h3 className="text-xl md:text-xl font-semibold text-[#191e3b] ">
                {prop.title}
              </h3>
              <p className="text-base md:text-base font-semibold text-gray-600 max-w-sm">
                {prop.description}
              </p>
             </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuePropsSection;