import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const BangladeshMap = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => setBranches(data))
      .catch((err) => console.error("Error loading branch data:", err));
  }, []);

  // Bangladesh approximate bounding box
  const bangladeshBounds = [
    [20.5, 88.0], // Southwest corner [lat, lng]
    [26.6, 92.7], // Northeast corner [lat, lng]
  ];

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <MapContainer
        center={[23.685, 90.3563]} // center of Bangladesh
        zoom={7}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
        maxBounds={bangladeshBounds}       // Restrict map bounds
        maxBoundsViscosity={1.0}          // prevent dragging outside
        minZoom={6}                        // optional: min zoom
        maxZoom={12}                       // optional: max zoom
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {branches.map((branch, idx) => (
          <Marker key={idx} position={[branch.latitude, branch.longitude]}>
            <Popup>
              <div>
                <strong>{branch.district}</strong>
                <br />
                Region: {branch.region}
                <br />
                City: {branch.city}
                <br />
                Covered Areas: {branch.covered_area.join(", ")}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;