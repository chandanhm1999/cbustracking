import React, { useState, useEffect } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import SrouteMap from "./SrouteMap";

const SearchPart = () => {
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);
  const [fromStop, setFromStop] = useState(null);
  const [toStop, setToStop] = useState(null);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://busbackend-weld.vercel.app/data/buses.json").then((res) =>
        res.json()
      ),
      fetch("https://busbackend-weld.vercel.app/data/stops.json").then((res) =>
        res.json()
      ),
    ])
      .then(([routesData, stopsData]) => {
        setRoutes(routesData);
        setStops(stopsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  const stopOptions = stops.map((stop) => ({
    value: stop.stop_gid,
    label: stop.stop_name,
  }));

  const getToStopOptions = () => {
    if (!fromStop) return stopOptions;
    const matchingStops = new Set();

    routes.forEach((route) => {
      const routeStops = stops
        .filter((stop) => stop.trip_id === route.trip_id)
        .sort((a, b) => a.stop_sequence - b.stop_sequence);

      const fromIndex = routeStops.findIndex(
        (stop) => stop.stop_gid === fromStop.value
      );
      if (fromIndex !== -1) {
        routeStops.slice(fromIndex + 1).forEach((stop) => {
          matchingStops.add(
            JSON.stringify({ value: stop.stop_gid, label: stop.stop_name })
          );
        });
      }
    });

    return Array.from(matchingStops)
      .map((s) => JSON.parse(s))
      .slice(0, 5);
  };

  const handleSearch = () => {
    if (!fromStop || !toStop) {
      setFilteredRoutes([]);
      return;
    }

    const results = routes.filter((route) => {
      const routeStops = stops
        .filter((stop) => stop.trip_id === route.trip_id)
        .sort((a, b) => a.stop_sequence - b.stop_sequence);

      const fromIndex = routeStops.findIndex(
        (stop) => stop.stop_gid === fromStop.value
      );
      const toIndex = routeStops.findIndex(
        (stop) => stop.stop_gid === toStop.value
      );

      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });

    setFilteredRoutes(results);
    setSelectedStops([]); // Clear previous map
  };

  const handleRouteClick = (route) => {
    const routeStops = stops
      .filter((stop) => stop.trip_id === route.trip_id)
      .sort((a, b) => a.stop_sequence - b.stop_sequence);

    const fromIndex = routeStops.findIndex(
      (stop) => stop.stop_gid === fromStop.value
    );
    const toIndex = routeStops.findIndex(
      (stop) => stop.stop_gid === toStop.value
    );

    if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
      const slicedStops = routeStops.slice(fromIndex, toIndex + 1);
      setSelectedStops(slicedStops);
    } else {
      setSelectedStops([]);
    }
  };

  if (loading) return <div className="p-4">Loading data...</div>;

  return (
    <div className="container mx-auto p-6 mt-16 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Search Bus Routes</h1>

      <div className="flex gap-4 mb-6 flex-col sm:flex-row">
        <Select
          className="flex-1"
          options={stopOptions}
          placeholder="Select From Stop"
          value={fromStop}
          onChange={(val) => {
            setFromStop(val);
            setToStop(null);
            setFilteredRoutes([]);
            setSelectedStops([]);
          }}
          isClearable
        />
        <Select
          className="flex-1"
          options={getToStopOptions()}
          placeholder="Select To Stop"
          value={toStop}
          onChange={(val) => {
            setToStop(val);
            setFilteredRoutes([]);
            setSelectedStops([]);
          }}
          isClearable
        />
        <button
          className="bg-[#572649] text-white px-4 py-2 rounded hover:bg-[#210d1b]"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <ul className="space-y-4">
        {filteredRoutes.map((route) => (
          <li
            key={route.route_gid}
            className="p-4 border rounded-lg shadow hover:shadow-md cursor-pointer transition-all duration-300 bg-white"
            onClick={() => handleRouteClick(route)}
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {route.route_long_name}
            </h2>
            <p className="text-gray-600">
              {route.route_name || "No description available"}
            </p>
            <motion.div
              className="inline-block mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow cursor-pointer"
              animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              🚏 Click to view stops
            </motion.div>
          </li>
        ))}
      </ul>

      {selectedStops.length > 0 && <SrouteMap stops={selectedStops} />}
    </div>
  );
};

export default SearchPart;
