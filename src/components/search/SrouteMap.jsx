import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBusAlt } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";

const busIcon = new L.DivIcon({
  html: renderToStaticMarkup(
    <FaBusAlt style={{ color: "#572649", fontSize: "1.5rem" }} />
  ),
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const SrouteMap = ({ stops }) => {
  if (!stops.length)
    return <p className="mt-4 text-gray-600">No stops to display on map.</p>;

  const polylinePoints = stops.map((stop) => [stop.stop_lat, stop.stop_lon]);
  const center = polylinePoints[0];

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded shadow h-[400px] overflow-y-auto">
        <h2 className="text-xl font-bold mb-3">Stop List</h2>
        <ul className="space-y-3">
          {stops.map((stop) => (
            <li
              key={stop.stop_gid}
              className="flex items-start space-x-2 bg-white p-2 rounded shadow-sm"
            >
              <FaBusAlt className="text-[#572649] mt-1" />
              <div>
                <div className="font-semibold">{stop.stop_name}</div>
                <div className="text-sm text-gray-600">
                  Arrival: {stop.arrival_time} <br />
                  Departure: {stop.departure_time}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full md:w-2/3">
        <MapContainer
          center={center}
          zoom={15}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {stops.map((stop) => (
            <Marker
              key={stop.stop_gid}
              position={[stop.stop_lat, stop.stop_lon]}
              icon={busIcon}
            >
              <Popup>
                <strong>{stop.stop_name}</strong>
                <br />
                Arrival: {stop.arrival_time}
                <br />
                Departure: {stop.departure_time}
              </Popup>
            </Marker>
          ))}
          <Polyline positions={polylinePoints} color="red" />
        </MapContainer>
      </div>
    </div>
  );
};

export default SrouteMap;
