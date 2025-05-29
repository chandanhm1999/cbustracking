import React, { useEffect, useState } from "react";
import RouteList from "./RouteList";
import BusList from "./BusList";
import RouteMap from "./RouteMap";

const MainPage = () => {
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [stops, setStops] = useState([]);

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);

  // Fetch routes once
  useEffect(() => {
    fetch("https://busbackend-weld.vercel.app/data/routes.json")
      .then((res) => res.json())
      .then(setRoutes)
      .catch((err) => console.error(err));
  }, []);

  // Fetch buses when route changes
  useEffect(() => {
    if (!selectedRoute) return;

    fetch(`https://busbackend-weld.vercel.app/data/buses.json`) // Replace with actual endpoint with route filter if available
      .then((res) => res.json())
      .then((allBuses) => {
        const filtered = allBuses.filter(
          (bus) => bus.route_gid === selectedRoute
        );
        setBuses(filtered);
        setStops([]); // clear stops when route changes
        setSelectedBus(null);
      })
      .catch(console.error);
  }, [selectedRoute]);

  // Fetch stops when bus changes
  useEffect(() => {
    if (!selectedBus) return;

    // Replace with your stops API for the bus/trip
    fetch(`https://busbackend-weld.vercel.app/data/stops.json`) // Example URL
      .then((res) => res.json())
      .then((allStops) => {
        // Filter stops by trip_id matching selected bus
        const bus = buses.find((b) => b.bus_id === selectedBus);
        if (!bus) return;

        const filteredStops = allStops.filter(
          (stop) => stop.trip_id === bus.trip_id
        );
        setStops(filteredStops);
      })
      .catch(console.error);
  }, [selectedBus, buses]);

  return (
    <div className="container mx-auto p-4 mt-30px">
      <RouteList routes={routes} onSelectRoute={setSelectedRoute} />

      {selectedRoute && <BusList buses={buses} onSelectBus={setSelectedBus} />}

      {selectedBus && <RouteMap stops={stops} />}
    </div>
  );
};

export default MainPage;
