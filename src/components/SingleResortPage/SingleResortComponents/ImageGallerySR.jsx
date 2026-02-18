const ImageGallery = ({ images }) => {
  const fallback =
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800";

  return (
    <div className="relative mb-6">
      <div className="grid grid-cols-2 gap-1 rounded-2xl overflow-hidden h-[460px]">
        {/* Main large image */}
        <div className="row-span-2">
          <img
            src={images[0] || fallback}
            alt="Main view"
            className="w-full h-full object-cover hover:brightness-95 transition"
            onError={(e) => (e.target.src = fallback)}
          />
        </div>

        {/* 4 grid sub-images — only show slots 1–3, fill 4th with overlay */}
        {[1, 2, 3].map((idx) => (
          <div key={idx} className="relative overflow-hidden">
            <img
              src={images[idx] || images[0] || fallback}
              alt={`View ${idx + 1}`}
              className="w-full h-full object-cover hover:brightness-95 transition"
              onError={(e) => (e.target.src = fallback)}
            />
          </div>
        ))}
      </div>

      {/* Show all photos button */}
      <button className="absolute bottom-4 right-4 bg-white border border-gray-800 rounded-lg px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-gray-50 shadow-sm transition">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
        Show all photos
      </button>
    </div>
  );
};

export default ImageGallery;