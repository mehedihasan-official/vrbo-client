import { useState } from "react";
import StarRating from "./StartRatingSR";

const BookingCard = ({ pricePerNight }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
      : 7;

  const subtotal = pricePerNight * nights;
  const cleaningFee = Math.round(pricePerNight * 0.25);
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + cleaningFee + serviceFee;

  return (
    <div className="border border-gray-200 rounded-2xl p-6 shadow-lg sticky top-5 bg-white">
      {/* Price */}
      <div className="mb-1">
        <span className="text-2xl font-extrabold text-gray-900">
          ${pricePerNight.toFixed(0)}
        </span>
        <span className="text-base font-normal text-gray-500"> / night</span>
      </div>

      <div className="mb-4">
        <StarRating rating={4.8} reviews={127} />
      </div>

      {/* Date Inputs */}
      <div className="grid grid-cols-2 border border-gray-300 rounded-xl overflow-hidden mb-3">
        <div className="p-3 border-r border-gray-300">
          <p className="text-xs font-extrabold uppercase tracking-wide text-gray-700 mb-1">
            Check-in
          </p>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full text-sm text-gray-800 outline-none bg-transparent cursor-pointer"
          />
        </div>
        <div className="p-3">
          <p className="text-xs font-extrabold uppercase tracking-wide text-gray-700 mb-1">
            Check-out
          </p>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full text-sm text-gray-800 outline-none bg-transparent cursor-pointer"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="border border-gray-300 rounded-xl p-3 mb-4">
        <p className="text-xs font-extrabold uppercase tracking-wide text-gray-700 mb-1">
          Guests
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-800">
            {guests} guest{guests > 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold text-gray-700 hover:bg-gray-100 transition"
            >
              −
            </button>
            <span className="font-bold text-gray-900 w-4 text-center">{guests}</span>
            <button
              onClick={() => setGuests(Math.min(12, guests + 1))}
              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold text-gray-700 hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Reserve Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base rounded-xl py-3.5 mb-2 transition">
        Reserve Now
      </button>
      <p className="text-xs text-gray-400 text-center mb-4">
        You won't be charged yet
      </p>

      {/* Price Breakdown */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-700">
          <span className="underline cursor-pointer">
            ${pricePerNight.toFixed(0)} × {nights} nights
          </span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span className="underline cursor-pointer">Cleaning fee</span>
          <span>${cleaningFee}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span className="underline cursor-pointer">Vrbo service fee</span>
          <span>${serviceFee}</span>
        </div>
        <hr className="border-gray-100 my-2" />
        <div className="flex justify-between text-sm font-extrabold text-gray-900">
          <span>Total (USD)</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>

      <hr className="border-gray-100 my-4" />

      {/* Contact Host */}
      <button className="w-full border border-blue-600 text-blue-600 font-bold text-sm rounded-xl py-3 hover:bg-blue-50 transition">
        Contact host
      </button>

      {/* VrboCare Badge */}
      <div className="mt-4 p-3 bg-sky-50 rounded-xl flex items-start gap-3">
        <span className="text-xl">🛡️</span>
        <div>
          <p className="text-sm font-bold text-sky-800">VrboCare™ included with every booking</p>
          <p className="text-xs text-sky-700 mt-0.5">
            Industry-leading protection for every trip you book through Vrbo.
          </p>
        </div>
      </div>

      {/* Report */}
      <div className="text-center mt-3">
        <button className="text-xs text-gray-400 underline hover:text-gray-600 transition">
          Report this listing
        </button>
      </div>
    </div>
  );
};

export default BookingCard;