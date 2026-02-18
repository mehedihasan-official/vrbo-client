import React, { useState } from "react";

const CreateNewList = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    country: "",
    pricePerNight: "",
    discount: "",
    maxGuests: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    amenities: [],
    images: [],
    checkIn: "",
    checkOut: "",
    isFeatured: false,
  });

  const amenitiesList = [
    "WiFi",
    "Swimming Pool",
    "Air Conditioning",
    "Free Parking",
    "Restaurant",
    "Gym",
    "Spa",
    "Beach Access",
    "Pet Friendly",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "isFeatured") {
      setFormData({ ...formData, isFeatured: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAmenityChange = (amenity) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((item) => item !== amenity),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity],
      });
    }
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // 🔥 Connect API here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Create New Resort Listing
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="title"
                placeholder="Resort Name"
                value={formData.title}
                onChange={handleChange}
                className="input-style"
                required
              />

              <input
                type="text"
                name="location"
                placeholder="City / Area"
                value={formData.location}
                onChange={handleChange}
                className="input-style"
                required
              />

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="input-style"
                required
              />

              <input
                type="number"
                name="pricePerNight"
                placeholder="Price per Night ($)"
                value={formData.pricePerNight}
                onChange={handleChange}
                className="input-style"
                required
              />

              <input
                type="number"
                name="discount"
                placeholder="Discount (%)"
                value={formData.discount}
                onChange={handleChange}
                className="input-style"
              />
            </div>
          </div>

          {/* Property Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <input
                type="number"
                name="maxGuests"
                placeholder="Max Guests"
                value={formData.maxGuests}
                onChange={handleChange}
                className="input-style"
                required
              />

              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="input-style"
              />

              <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="input-style"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <textarea
              name="description"
              rows="5"
              placeholder="Write detailed description about the resort..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-blue-50"
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="input-style"
              />
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="input-style"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            <span className="font-medium">Mark as Featured Resort</span>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
            >
              Publish Resort
            </button>
          </div>

        </form>
      </div>

      {/* Tailwind reusable input class */}
      <style>
        {`
          .input-style {
            width: 100%;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            padding: 0.75rem;
            outline: none;
          }
          .input-style:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
          }
        `}
      </style>
    </div>
  );
};

export default CreateNewList;
