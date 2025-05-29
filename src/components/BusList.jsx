import React, { useEffect, useState } from "react";

const BusList = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetch("https://busbackend-weld.vercel.app/data/buses.json")
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.error("Failed to fetch buses:", err));
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-2">Live Buses</h2>
      <ul className="space-y-2">
        {buses.map((bus) => (
          <li key={bus.id} className="p-2 border rounded hover:bg-gray-50">
            <strong>Route:</strong> {bus.route_gid} | <strong>ID:</strong>{" "}
            {bus.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusList;
