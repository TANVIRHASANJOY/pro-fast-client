import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Component to zoom to selected branch and open popup
const BranchZoom = ({ selectedBranch }) => {
  const map = useMap();

  React.useEffect(() => {
    if (selectedBranch) {
      const { latitude, longitude } = selectedBranch;
      map.setView([latitude, longitude], 10); // zoom to branch
    }
  }, [selectedBranch, map]);

  return null;
};

const Coverage = () => {
  const [branches, setBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBranch, setFilteredBranch] = useState(null);
  const [highlightArea, setHighlightArea] = useState(""); // specific area typed

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => setBranches(data))
      .catch((err) => console.error("Error loading branches:", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.toLowerCase().trim();

    const found = branches.find((branch) => {
      const district = branch.district.toLowerCase();
      const city = branch.city.toLowerCase();
      const areas = branch.covered_area.map((a) => a.toLowerCase());

      // Check district, city, or any area
      if (district.includes(term) || city.includes(term)) {
        setHighlightArea(""); // no specific area
        return true;
      }
      const matchedArea = areas.find((a) => a.includes(term));
      if (matchedArea) {
        setHighlightArea(matchedArea); // highlight the matched area
        return true;
      }
      return false;
    });

    if (found) {
      setFilteredBranch(found);
    } else {
      alert("No matching district, city, or area found!");
    }
  };

  const bangladeshBounds = [
    [20.5, 88.0],
    [26.6, 92.7],
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by district, city, or area"
          className="px-4 py-2 border rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      <p className="text-center text-gray-600 mb-4">
        We deliver almost all over Bangladesh
      </p>

      <div style={{ width: "100%", height: "700px" }}>
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
          maxBounds={bangladeshBounds}
          maxBoundsViscosity={1.0}
          minZoom={6}
          maxZoom={12}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {branches.map((branch, idx) => (
            <Marker key={idx} position={[branch.latitude, branch.longitude]}>
              <Popup>
                <strong>{branch.district}</strong>
                <br />
                Region: {branch.region}
                <br />
                City: {branch.city}
                <br />
                Covered Areas:{" "}
                {branch.covered_area.map((area, i) => (
                  <span
                    key={i}
                    style={{
                      fontWeight:
                        highlightArea.toLowerCase() === area.toLowerCase()
                          ? "bold"
                          : "normal",
                      color:
                        highlightArea.toLowerCase() === area.toLowerCase()
                          ? "red"
                          : "black",
                    }}
                  >
                    {area}
                    {i < branch.covered_area.length - 1 ? ", " : ""}
                  </span>
                ))}
              </Popup>
            </Marker>
          ))}

          {filteredBranch && <BranchZoom selectedBranch={filteredBranch} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;