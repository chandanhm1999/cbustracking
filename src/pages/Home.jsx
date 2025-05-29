import React from "react";
import MapView from "../components/MapView";
import Nav from "../components/navbar/Nav";

const Home = () => {
  return (
    <>
      <Nav />
      <div style={{ height: "calc(100vh - 60px)", marginTop: "65px" }}>
        <MapView
          center={[13.3417, 77.101]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          {/* your markers */}
        </MapView>
      </div>
    </>
  );
};

export default Home;
