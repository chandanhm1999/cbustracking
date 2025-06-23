import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBusAlt } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";

// Custom bus icon
const busIcon = new L.DivIcon({
  html: renderToStaticMarkup(
    <FaBusAlt style={{ color: "#572649", fontSize: "1.8rem" }} />
  ),
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// ✅ Smooth animated marker
const SlidingMarker = ({ path }) => {
  const map = useMap();
  const markerRef = useRef(null);
  const animationRef = useRef(null);
  const [index, setIndex] = useState(0);

  const interpolate = (start, end, factor) => [
    start[0] + (end[0] - start[0]) * factor,
    start[1] + (end[1] - start[1]) * factor,
  ];

  useEffect(() => {
    if (!path.length) return;

    // Create the marker
    const marker = L.marker(path[0], { icon: busIcon }).addTo(map);
    markerRef.current = marker;

    let currentIndex = 0;
    let progress = 0;
    const duration = 20000; // milliseconds between points
    let lastTime = null;

    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;
      progress += delta;

      const factor = Math.min(progress / duration, 1);
      const current = path[currentIndex];
      const next = path[(currentIndex + 1) % path.length];
      const position = interpolate(current, next, factor);

      marker.setLatLng(position);

      if (factor < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        currentIndex = (currentIndex + 1) % path.length;
        setIndex(currentIndex);
        progress = 0;
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (marker) marker.remove();
    };
  }, [path, map]);

  return null; // No React Marker, we’re using Leaflet directly
};

const SrouteMap = ({ stops }) => {
  if (!stops.length)
    return <p className="mt-4 text-gray-600">No stops to display on map.</p>;

  const polylinePoints = stops.map((stop) => [stop.stop_lat, stop.stop_lon]);
  const center = polylinePoints[Math.floor(polylinePoints.length / 2)];

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full mt-8">
      {/* Stop List */}
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

      {/* Map Section */}
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

          {/* Stop Markers */}
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

          {/* ✅ Green Bus Path */}
          <Polyline positions={polylinePoints} color="green" />

          {/* ✅ Sliding Moving Bus */}
          <SlidingMarker path={polylinePoints} />
        </MapContainer>
      </div>
    </div>
  );
};

export default SrouteMap;
