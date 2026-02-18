import { useState } from "react";

const AmenityItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 py-2">
    <span className="text-xl w-6 text-center">{icon}</span>
    <span className="text-sm text-gray-700">{label}</span>
  </div>
);

const ALL_AMENITIES = [
  { icon: "🏊", label: "Pool" },
  { icon: "🌊", label: "Beachfront" },
  { icon: "🐾", label: "Pet friendly" },
  { icon: "🅿️", label: "Free parking" },
  { icon: "📶", label: "WiFi included" },
  { icon: "❄️", label: "Air conditioning" },
  { icon: "🍳", label: "Full kitchen" },
  { icon: "🧺", label: "Washer & dryer" },
  { icon: "🔥", label: "BBQ grill" },
  { icon: "🏖️", label: "Beach access" },
  { icon: "📺", label: "Smart TV" },
  { icon: "🚿", label: "Hot tub" },
];

const HIGHLIGHTS = [
  { icon: "🌊", title: "Beachfront location", desc: "Direct Gulf access with stunning water views from every room" },
  { icon: "🐾", title: "Pet friendly", desc: "Bring your furry companions — pets welcome with deposit" },
  { icon: "🏊", title: "Private pool access", desc: "Heated community pool just steps from the unit" },
  { icon: "🅿️", title: "Free parking included", desc: "Covered parking spot included in your stay" },
];

const HOUSE_RULES = [
  { icon: "⏰", label: "Check-in: After 4:00 PM" },
  { icon: "⏰", label: "Check-out: Before 10:00 AM" },
  { icon: "👶", label: "Children allowed" },
  { icon: "🎉", label: "No events or large groups" },
  { icon: "🐾", label: "Pets allowed (with fee)" },
  { icon: "🚭", label: "No smoking" },
];

const RATING_CATEGORIES = [
  { cat: "Cleanliness", val: 9.8 },
  { cat: "Communication", val: 9.6 },
  { cat: "Check-in", val: 9.7 },
  { cat: "Accuracy", val: 9.5 },
  { cat: "Location", val: 9.9 },
  { cat: "Value", val: 9.4 },
];

const REVIEWS = [
  {
    name: "Sarah M.",
    date: "Dec 2024",
    text: "Absolutely stunning views! The unit was spotless and exactly as described. The beach access was perfect and we loved having our dog with us.",
    rating: "10/10",
  },
  {
    name: "James R.",
    date: "Nov 2024",
    text: "We had a great time! The apartment was clean, well-stocked and the location is unbeatable. Would definitely return next year.",
    rating: "9/10",
  },
];

const PropertyDetails = ({ resort, guests }) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const visibleAmenities = showAllAmenities ? ALL_AMENITIES : ALL_AMENITIES.slice(0, 6);

  return (
    <div>
      {/* Highlights */}
      <div className="bg-blue-50 rounded-xl p-5 mb-6">
        <h3 className="text-base font-extrabold text-gray-900 mb-3">Highlights</h3>
        {HIGHLIGHTS.map((h, i) => (
          <div key={i} className="flex items-start gap-4 py-3 border-b border-blue-100 last:border-0">
            <span className="text-2xl">{h.icon}</span>
            <div>
              <p className="font-bold text-sm text-gray-900">{h.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Room quick stats */}
      <div className="flex flex-wrap gap-5 mb-5">
        {[
          { icon: "👥", val: `${guests} guests` },
          { icon: "🛏️", val: "2 bedrooms" },
          { icon: "🛁", val: "2 bathrooms" },
          { icon: "📐", val: "950 sq ft" },
        ].map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
            <span>{d.icon}</span>
            <span>{d.val}</span>
          </div>
        ))}
      </div>

      <hr className="border-gray-100 my-6" />

      {/* About */}
      <h2 className="text-xl font-extrabold text-gray-900 mb-3">About this property</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        {resort.description ||
          "Welcome to Gulf Side 402 — a stunning beachfront condo with breathtaking Gulf views from every window. This fully renovated unit offers the perfect blend of coastal comfort and modern luxury. Wake up to the sound of waves and fall asleep to stunning sunsets over the Gulf of Mexico."}
      </p>
      <p className="text-sm text-gray-600 leading-relaxed">
        The open-concept living area flows seamlessly to a spacious balcony with panoramic water views. The fully equipped kitchen features stainless steel appliances. Pet-friendly and stocked with beach gear for your convenience.
      </p>

      <hr className="border-gray-100 my-6" />

      {/* Amenities */}
      <h2 className="text-xl font-extrabold text-gray-900 mb-2">Amenities</h2>
      <div className="grid grid-cols-2 gap-x-8">
        {visibleAmenities.map((a, i) => (
          <AmenityItem key={i} icon={a.icon} label={a.label} />
        ))}
      </div>
      <button
        onClick={() => setShowAllAmenities(!showAllAmenities)}
        className="mt-4 border border-gray-800 rounded-lg px-5 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-50 transition"
      >
        {showAllAmenities ? "Show less" : `Show all ${ALL_AMENITIES.length} amenities`}
      </button>

      <hr className="border-gray-100 my-6" />

      {/* Spaces */}
      <h2 className="text-xl font-extrabold text-gray-900 mb-3">Spaces</h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: "🚗", label: "Garage" },
          { icon: "🌿", label: "Patio / balcony" },
          { icon: "🏋️", label: "Gym access" },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
            <span className="text-lg">{s.icon}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <hr className="border-gray-100 my-6" />

      {/* Host */}
      <h2 className="text-xl font-extrabold text-gray-900 mb-3">About the host</h2>
      <div className="flex items-center gap-5 border border-gray-200 rounded-2xl p-5">
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-extrabold shrink-0">
          T
        </div>
        <div className="flex-1">
          <p className="font-extrabold text-base text-gray-900 mb-2">Hosted by Tyanita</p>
          <div className="flex gap-6 mb-3">
            {[
              { val: "4.8/10", label: "Overall rating" },
              { val: "10/10", label: "Communication" },
              { val: "7%", label: "Response rate" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-extrabold text-base text-gray-900">{s.val}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="border border-gray-800 rounded-lg px-4 py-1.5 text-sm font-bold hover:bg-gray-50 transition">
              Send message
            </button>
            <button className="border border-gray-800 rounded-lg px-4 py-1.5 text-sm font-bold hover:bg-gray-50 transition">
              View profile
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-100 my-6" />

      {/* House Rules */}
      <h2 className="text-xl font-extrabold text-gray-900 mb-3">House Rules</h2>
      <div className="grid grid-cols-2 gap-x-8">
        {HOUSE_RULES.map((r, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-gray-700 py-2 border-b border-gray-50">
            <span>{r.icon}</span>
            <span>{r.label}</span>
          </div>
        ))}
      </div>

      <hr className="border-gray-100 my-6" />

      {/* Reviews */}
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Reviews</h2>
      <div className="flex items-start gap-8 mb-6">
        <div className="text-center shrink-0">
          <p className="text-5xl font-black text-gray-900 leading-none">9.4</p>
          <p className="text-xs text-gray-500 mt-1">out of 10</p>
          <p className="text-sm font-bold text-gray-700 mt-0.5">Exceptional</p>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-3">
          {RATING_CATEGORIES.map(({ cat, val }) => (
            <div key={cat}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">{cat}</span>
                <span className="font-bold text-gray-900">{val}</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 rounded-full"
                  style={{ width: `${val * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {REVIEWS.map((r, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-sm text-gray-900">{r.name}</p>
                <p className="text-xs text-gray-400">{r.date}</p>
              </div>
              <span className="font-extrabold text-sm text-blue-600">{r.rating}</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetails;