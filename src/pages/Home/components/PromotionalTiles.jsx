const PromotionalTiles = () => {
  const tiles = [
    {
      id: 1,
      title: "The mountains are calling",
      description: "From weekly rates and last-minute steals—find the best value for your ski season stay.",
      image: "https://a.travel-assets.com/travel-assets-manager/fb190dff-3b43-4eb5-a1a8-7e06410762ca/VRBO-TILE-SKI.jpg?impolicy=fcrop&w=400&h=400&q=high&p=1",
      buttonText: "Book now",
      link: "/travel/ski",
    },
    {
      id: 2,
      title: "Top properties for spring",
      description: "Will it be pool fun, lazy beach days, waterfront chill, or countryside adventure?",
      image: "https://a.travel-assets.com/travel-assets-manager/04-12-25/800x800_Img1V2.jpg?impolicy=fcrop&w=400&h=400&q=high&p=1",
      buttonText: "See homes",
      link: "/travel/spring",
    },
    {
      id: 3,
      title: "Stay together, cheer together",
      description: "Explore top vacation rentals in North America's soccer capitals",
      image: "https://forever.travel-assets.com/flex/flexmanager/mediaasset/1391393-0_2-Stadium.jpg?impolicy=fcrop&w=400&h=400&q=high&p=1",
      buttonText: "Book now",
      link: "/travel/soccer",
    },
  ];

  return (
    <div className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
            >
              <div className="relative overflow-hidden h-64 md:h-80">
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {tile.title}
                </h3>
                <p className="text-base text-gray-600 mb-4">
                  {tile.description}
                </p>
                <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  {tile.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionalTiles;