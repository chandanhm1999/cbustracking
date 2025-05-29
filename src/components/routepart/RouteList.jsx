import React from "react";
import { FaBusAlt, FaRoad } from "react-icons/fa";

const RouteList = ({ routes, onSelectRoute }) => {
  return (
    <div className="p-4 mt-20 bg-white rounded shadow-md h-full">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-700">
        <FaRoad /> All Bus Routes
      </h2>
      <ul className="space-y-3">
        {routes.map((route) => (
          <li
            key={route.route_gid}
            className="cursor-pointer bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 p-3 shadow-sm transition"
            onClick={() => onSelectRoute(route.route_gid)}
          >
            <div className="flex items-start gap-3">
              <FaBusAlt className="text-indigo-500 mt-1" />
              <div>
                <div className="font-semibold text-gray-800">
                  {route.route_long_name}
                </div>
                <div className="text-sm text-gray-600">
                  {route.route_desc || "No description available"}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteList;
