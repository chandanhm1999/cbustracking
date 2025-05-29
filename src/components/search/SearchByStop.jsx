// components/search/SearchByStop.jsx

import React, { useEffect, useState } from "react";

const SearchByStop = () => {
  const [buses, setBuses] = useState([]);
  const [stops, setStops] = useState([]);
  const [stopName, setStopName] = useState("");
  const [matchedBuses, setMatchedBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  // Load buses and stops from JSON endpoints
  useEffect(() => {
    const loadData = async () => {
      try {
        const [busRes, stopRes] = await Promise.all([
          fetch("https://busbackend-weld.vercel.app/data/buses.json").then(
            (res) => res.json()
          ),
          fetch("https://busbackend-weld.vercel.app/data/stops.json").then(
            (res) => res.json()
          ),
        ]);
        setBuses(busRes);
        setStops(stopRes);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Autocomplete suggestion logic
  const handleInputChange = (e) => {
    const input = e.target.value;
    setStopName(input);

    if (input.length < 2) {
      setSuggestions([]);
      return;
    }

    const matches = stops.filter((stop) =>
      stop.stop_name.toLowerCase().includes(input.toLowerCase())
    );

    setSuggestions(matches.slice(0, 5)); // limit to 5 suggestions
  };

  // Triggered when suggestion clicked
  const handleSuggestionClick = (name) => {
    setStopName(name);
    setSuggestions([]);
    handleSearch(name);
  };

  // Search buses for selected stop name
  const handleSearch = (customName) => {
    const keyword = (customName || stopName).trim().toLowerCase();

    if (!keyword || keyword.length < 2) {
      setMatchedBuses([]);
      return;
    }

    const matchedStops = stops.filter((stop) =>
      stop.stop_name.toLowerCase().includes(keyword)
    );

    const matchedStopGIDs = matchedStops.map((stop) => stop.stop_gid);

    const filtered = buses.filter((bus) =>
      matchedStopGIDs.includes(bus.current_stop_gid)
    );

    setMatchedBuses(filtered);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Search Buses by Stop
      </h1>

      <div className="relative mb-6">
        <input
          type="text"
          value={stopName}
          onChange={handleInputChange}
          placeholder="Enter stop name"
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
            {suggestions.map((stop) => (
              <li
                key={stop.stop_gid}
                onClick={() => handleSuggestionClick(stop.stop_name)}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                {stop.stop_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => handleSearch()}
        className="w-full px-5 py-3 bg-[#572649] text-white rounded-lg hover:bg-[#1f0d1a] transition mb-6"
      >
        Search
      </button>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : matchedBuses.length > 0 ? (
        <ul className="space-y-4">
          {matchedBuses.map((bus) => {
            const stop = stops.find((s) => s.stop_gid === bus.current_stop_gid);
            return (
              <li
                key={bus.bus_id}
                className="p-4 border rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {bus.route_name}
                </h3>
                <p className="text-sm text-gray-600">Bus ID: {bus.bus_id}</p>
                <p className="text-sm text-gray-600">
                  Current Stop: {stop?.stop_name || "Unknown"} (
                  {bus.current_stop_gid})
                </p>
                <p className="text-sm text-gray-500">
                  Last Updated:{" "}
                  {new Date(bus.last_updated).toLocaleTimeString()}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        stopName && (
          <p className="text-center text-gray-500">
            No buses currently at this stop.
          </p>
        )
      )}
    </div>
  );
};

export default SearchByStop;
