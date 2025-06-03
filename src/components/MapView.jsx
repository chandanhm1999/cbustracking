import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBus } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import PopupCard from "./popup/PopupCard";

const MapView = () => {
  const [buses, setBuses] = useState([]);
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const busRes = await fetch(
          "https://busbackend-weld.vercel.app/data/buses.json"
        );
        if (!busRes.ok) throw new Error("Failed to fetch buses.json");
        const busData = await busRes.json();
        setBuses(busData);
      } catch (error) {
        console.error("Error fetching buses:", error.message);
      }

      try {
        const stopRes = await fetch(
          "https://busbackend-weld.vercel.app/data/stops.json"
        );
        if (!stopRes.ok) throw new Error("Failed to fetch stops.json");
        const stopData = await stopRes.json();
        setStops(stopData);
      } catch (error) {
        console.error("Error fetching stops:", error.message);
      }
    };

    fetchData();
  }, []);

  // Custom bus icon using react-icons
  // const busIcon = new L.DivIcon({
  //   html: ReactDOMServer.renderToString(
  //     <FaBus style={{ color: "#572649", fontSize: "24px" }} />
  //   ),
  //   className: "",
  //   iconSize: [24, 24],
  //   iconAnchor: [12, 12],
  // });

  const busIcon = new L.DivIcon({
    html: ReactDOMServer.renderToString(
      <div
        style={{
          background: "linear-gradient(135deg, #572649, #8b3a6f)", // Dark to lighter gradient
          borderRadius: "10%",
          padding: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "30px",
          height: "30px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // soft shadow
          border: "1px solid white", // neat border
        }}
      >
        <FaBus style={{ color: "white", fontSize: "20px" }} />
      </div>
    ),
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return (
    <MapContainer
      center={[13.3417, 77.101]}
      zoom={13}
      className="h-full w-full rounded shadow"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {buses.map(
        (bus) =>
          bus.lat !== undefined &&
          bus.lon !== undefined && (
            <Marker key={bus.id} position={[bus.lat, bus.lon]} icon={busIcon}>
              <Tooltip
                direction="top"
                offset={[0, -10]}
                opacity={1}
                permanent={false}
              >
                Route:{" "}
                <span className="font-semibold bg-pink-900 text-white p-1">
                  {bus.route_name || "N/A"}
                </span>
                <br />
                Current Stop: {bus.current_stop_gid || "N/A"}
              </Tooltip>
              <Popup>
                <PopupCard bus={bus} />
              </Popup>
            </Marker>
          )
      )}

      {stops.map(
        (stop) =>
          stop.lat !== undefined &&
          stop.lon !== undefined && (
            <Marker key={stop.id} position={[stop.lat, stop.lon]}>
              <Popup>Stop: {stop.name}</Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
};

export default MapView;
