import React from "react";
import { FaBusAlt, FaMapMarkerAlt } from "react-icons/fa";

const BusList = ({ buses, onSelectBus }) => {
  if (!buses.length)
    return <p className="text-gray-500 mt-4">No buses found for this route.</p>;

  return (
    <div className="p-4 bg-white rounded shadow-md h-full">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-700">
        <FaBusAlt /> Buses on this Route
      </h2>
      <ul className="space-y-3">
        {buses.map((bus) => (
          <li
            key={bus.bus_id}
            className="cursor-pointer flex items-start p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 shadow-sm"
            onClick={() => onSelectBus(bus.bus_id)}
          >
            <FaBusAlt className="text-green-600 mt-1" />
            <div className="ml-3">
              <div className="font-semibold text-gray-800">
                Bus ID: {bus.bus_id}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <FaMapMarkerAlt /> Stop: {bus.current_stop_gid}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusList;
