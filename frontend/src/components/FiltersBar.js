import { LayoutGrid, Table } from 'lucide-react';

const COLORS = ['black', 'white', 'brown', 'gray', 'orange', 'golden'];
const TYPES = ['real', 'toy'];

function FiltersBar({
  type, setType,
  selectedColors, setSelectedColors,
  minWeight, setMinWeight,
  maxWeight, setMaxWeight,
  viewMode, setViewMode,
  priceRange, setPriceRange,
  dateSold, setDateSold,
}) {
  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-5 mb-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      {/* Left: Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col">
          <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Color</label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className={`px-3 py-1 border rounded-lg text-sm capitalize transition ${
                  selectedColors.includes(color)
                    ? 'border-indigo-500 bg-indigo-100 text-indigo-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="minWeight" className="text-sm font-medium text-gray-700 mb-1">Min Weight</label>
          <input
            type="number"
            id="minWeight"
            value={minWeight}
            onChange={(e) => setMinWeight(e.target.value)}
            placeholder="e.g. 5"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="maxWeight" className="text-sm font-medium text-gray-700 mb-1">Max Weight</label>
          <input
            type="number"
            id="maxWeight"
            value={maxWeight}
            onChange={(e) => setMaxWeight(e.target.value)}
            placeholder="e.g. 50"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="priceRange" className="text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <input
            type="text"
            id="priceRange"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            placeholder="e.g. 10-50"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dateSold" className="text-sm font-medium text-gray-700 mb-1">Date Sold</label>
          <input
            type="date"
            id="dateSold"
            value={dateSold}
            onChange={(e) => setDateSold(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Right: View Mode Toggle */}
      <div className="flex items-center gap-3">
        <span className="text-gray-700 text-sm font-medium">View:</span>
        <button
          onClick={() => setViewMode('card')}
          className={`p-2 rounded-lg border ${
            viewMode === 'card' ? 'bg-indigo-100 border-indigo-500 text-indigo-600' : 'border-gray-300'
          } hover:bg-indigo-50 transition`}
        >
          <LayoutGrid size={20} />
        </button>
        <button
          onClick={() => setViewMode('table')}
          className={`p-2 rounded-lg border ${
            viewMode === 'table' ? 'bg-indigo-100 border-indigo-500 text-indigo-600' : 'border-gray-300'
          } hover:bg-indigo-50 transition`}
        >
          <Table size={20} />
        </button>
      </div>
    </div>
  );
}

export default FiltersBar;
