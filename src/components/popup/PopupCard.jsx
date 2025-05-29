import React, { useState } from "react";

const PopupCard = ({ bus }) => {
  const [stops, setStops] = useState([]);
  const [showStops, setShowStops] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchStops = async () => {
    if (showStops) {
      setShowStops(false);
      return;
    }

    if (stops.length > 0) {
      setShowStops(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://busbackend-weld.vercel.app/data/stops.json"
      );
      const data = await res.json();
      const tripStops = data.filter((stop) => stop.trip_id === bus.trip_id);
      setStops(tripStops);
      setShowStops(true);
    } catch (err) {
      console.error("Failed to fetch stop times", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white border border-gray-200 rounded-2xl shadow-lg p-4 text-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          {!showStops && (
            <>
              <div className="font-bold bg-green-700 text-white px-2 py-1 rounded mb-2 inline-block">
                Bus #{bus.route_name}
              </div>
              <div className="text-gray-800 mb-1">Route: {bus.route_gid}</div>
              <div className="text-gray-800 mb-1">
                Current Stop: {bus.current_stop_gid}
              </div>
              <div className="text-gray-800 mb-1">Heading: {bus.heading}°</div>
              <div className="text-gray-800 mb-1">
                Speed: {bus.speed ?? "N/A"} km/h
              </div>
              <div className="text-gray-800 mb-1">
                Vehicle: {bus.vehicle || "N/A"}
              </div>
              <div className="text-gray-800 mb-1">
                Trip: {bus.trip || "N/A"}
              </div>
              <div className="text-gray-800 mb-2">
                Occupancy: {bus.occupancy || "N/A"}
              </div>
              <div className="text-xs text-gray-500">
                Updated: {new Date(bus.last_updated).toLocaleString()}
              </div>
            </>
          )}
        </div>

        <div className="ml-2">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs shadow transition-all"
            onClick={fetchStops}
            disabled={loading}
          >
            {loading ? "Loading..." : showStops ? "Hide Stops" : "Show Stops"}
          </button>
        </div>
      </div>

      {showStops && (
        <div className="bg-gray-50 rounded-xl p-3 max-h-60 overflow-y-auto">
          <div className="font-semibold text-purple-700 mb-3 text-sm">
            Stops for {bus.route_name}
          </div>
          {stops.length === 0 ? (
            <div className="text-gray-500">No stop times available.</div>
          ) : (
            <ul className="space-y-3">
              {stops.map((stop, idx) => (
                <li
                  key={idx}
                  className="bg-white border rounded-lg p-2 shadow-sm"
                >
                  <div className="font-semibold">{stop.stop_name}</div>
                  <div className="text-xs text-gray-600">
                    Arrival: {stop.arrival_time || "N/A"}
                  </div>
                  <div className="text-xs text-gray-600">
                    Departure: {stop.departure_time || "N/A"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default PopupCard;
