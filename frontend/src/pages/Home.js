import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PetList from "../components/PetList";
import { LayoutGrid, Table } from "lucide-react";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const [isToy, setIsToy] = useState("");
  const [size, setSize] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [colors, setColors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState("card");
  

  const fetchColors = async () => {
    try {
      const res = await axios.get("http://localhost:4000/colors");
      setColors(res.data.map((c) => c.name));
    } catch (err) {
      console.log("Error fetching colors:", err);
    }
  };

  useEffect(() => {
    fetchTypes();
    fetchColors();
  }, []);

  const fetchTypes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/types");
      setTypes(res.data);
    } catch (err) {
      console.log("Error fetching types:", err);
    }
  };

  const fetchPets = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (type) params.append("type", type);
      if (isToy) params.append("is_toy", isToy);
      if (size) params.append("size", size);
      if (minWeight) params.append("min_weight", minWeight);
      if (maxWeight) params.append("max_weight", maxWeight);
      if (minPrice) params.append("min_price", minPrice);
      if (maxPrice) params.append("max_price", maxPrice);
      if (startDate) params.append("date_sold_start", startDate);
      if (endDate) params.append("date_sold_end", endDate);
      if (searchQuery) params.append("search", searchQuery);
      if (selectedColors.length > 0) {
        params.append("color", selectedColors.join(","));
      }

      const res = await axios.get(
        `http://localhost:4000/pets?${params.toString()}`
      );
      setPets(res.data);
    } catch (err) {
      console.log("Error fetching pets:", err);
    }
  }, [
    type,
    isToy,
    size,
    minWeight,
    maxWeight,
    minPrice,
    maxPrice,
    startDate,
    endDate,
    searchQuery,
    selectedColors,
  ]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const resetFilters = () => {
    setType("");
    setIsToy("");
    setSize("");
    setMinWeight("");
    setMaxWeight("");
    setMinPrice("");
    setMaxPrice("");
    setStartDate("");
    setEndDate("");
    setSelectedColors([]);
  };

  return (
    <div className="flex flex-col p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Search Input - left side */}
        <input
          type="text"
          placeholder="Search by name, type or color"
          className="w-full md:w-2/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchPets();
          }}
          aria-label="Search pets by name"
        />

        {/* View Mode Toggle - right side */}
        <div className="flex items-center gap-4">
          <span className="text-gray-700 text-sm font-medium">View:</span>
          <button
            onClick={() => setView("card")}
            className={`p-2 rounded-lg border ${
              view === "card"
                ? "bg-amber-100 border-amber-500 text-amber-800"
                : "border-gray-300"
            } hover:bg-amber-50 transition`}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded-lg border ${
              view === "table"
                ? "bg-amber-100 border-amber-500 text-amber-800"
                : "border-gray-300"
            } hover:bg-amber-50 transition`}
          >
            <Table size={20} />
          </button>
        </div>
      </div>
      <button
        className="mb-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className={`${showFilters ? "block" : "hidden"}`}>
        {/* Filters Section */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
          <h2 className="text-2xl font-medium text-gray-700 mb-6">Filters</h2>

          <div className="grid grid-cols-1 gap-4">
            {/* Type */}
            <div className="space-y-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-white shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    aria-label="Filter by Type"
                  >
                    <option value="">All Types</option>
                    {types.map((t, i) => (
                      <option key={i} value={t.type_name}>
                        {t.type_name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Toy Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-white shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onChange={(e) => setIsToy(e.target.value)}
                    value={isToy}
                    aria-label="Filter by Toy Status"
                  >
                    <option value="">All Status</option>
                    <option value="true">Toy</option>
                    <option value="false">Real</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-white shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onChange={(e) => setSize(e.target.value)}
                    value={size}
                    aria-label="Filter by Size"
                  >
                    <option value="">All Sizes</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Weight Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight Range (lbs)
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  min="0"
                  placeholder="Min"
                  className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={minWeight}
                  onChange={(e) => setMinWeight(e.target.value)}
                  aria-label="Minimum Weight"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Max"
                  className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={maxWeight}
                  onChange={(e) => setMaxWeight(e.target.value)}
                  aria-label="Maximum Weight"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range ($)
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Min"
                  className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  aria-label="Minimum Price"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Max"
                  className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  aria-label="Maximum Price"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Sold
              </label>
              <div className="flex gap-3">
                <input
                  type="date"
                  className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  aria-label="Start Date Sold"
                />
                <input
                  type="date"
                  className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  aria-label="End Date Sold"
                />
              </div>
            </div>

            {/* Color Filter */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setSelectedColors((prev) =>
                        prev.includes(color)
                          ? prev.filter((c) => c !== color)
                          : [...prev, color]
                      )
                    }
                    className={`px-3 py-1 rounded-full text-sm border transition duration-150 ${
                      selectedColors.includes(color)
                        ? "bg-amber-100 text-amber-800 border-amber-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-amber-500"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={resetFilters}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2 rounded-lg transition duration-200 shadow-md hover:shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        </section>
      </div>
      <section>
        <PetList pets={pets} view={view} />
      </section>
    </div>
  );
};

export default Home;
