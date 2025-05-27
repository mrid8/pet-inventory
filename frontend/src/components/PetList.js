const PetList = ({ pets, view }) => {
  if (!pets.length)
    return (
      <p className="mt-6 text-center text-gray-500 italic">No pets found.</p>
    );

  if (view === "table") {
    return (
      <div className="overflow-x-auto mt-6 rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full table-auto text-sm text-gray-800">
          <thead className="bg-gray-100 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Color(s)</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Weight</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Date Sold</th>
              <th className="px-4 py-3">Toy?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pets.map((pet) => (
              <tr key={pet.id} className="hover:bg-gray-50 text-sm">
                <td className="px-4 py-2">{pet.id}</td>
                <td className="px-4 py-2 font-medium">{pet.name}</td>
                <td className="px-4 py-2">{pet.type_name}</td>
                <td className="px-4 py-2">
                  {pet.color_names
                    ? pet.color_names
                        .split(",")
                        .map((c) => c.trim())
                        .join(", ")
                    : "-"}
                </td>
                <td className="px-4 py-2 capitalize">{pet.size || "-"}</td>
                <td className="px-4 py-2">{pet.weight} lbs</td>
                <td className="px-4 py-2">
                  {pet.price ? `$${pet.price.toFixed(2)}` : "-"}
                </td>
                <td
                  className={`px-4 py-2 ${
                    !pet.date_sold || pet.date_sold === "null"
                      ? "font-medium text-green-600"
                      : ""
                  }`}
                >
                  {!pet.date_sold || pet.date_sold === "null"
                    ? "Available"
                    : pet.date_sold}
                </td>

                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      pet.is_toy
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {pet.is_toy ? "Toy" : "Real"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Card view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {pets.map((pet) => (
        <div
          key={pet.id}
          className="p-5 bg-white rounded-xl border hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">
              {pet.is_toy ? "🧸" : "🐾"} {pet.name}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                pet.is_toy
                  ? "bg-amber-100 text-amber-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {pet.is_toy ? "Toy" : "Real"}
            </span>
          </div>

          <p className="text-sm mb-1">
            <span className="font-medium text-gray-700">Type:</span>{" "}
            {pet.type_name}
          </p>

          <div className="text-sm mb-1">
            <span className="font-medium text-gray-700">Colors:</span>{" "}
            <span className="capitalize">
              {pet.color_names
                ? pet.color_names
                    .split(",")
                    .map((c) => c.trim())
                    .join(", ")
                : "-"}
            </span>
          </div>

          <p className="text-sm mb-1">
            <span className="font-medium text-gray-700">Size:</span>{" "}
            {pet.size || "-"}
          </p>
          <p className="text-sm mb-1">
            <span className="font-medium text-gray-700">Weight:</span>{" "}
            {pet.weight} lbs
          </p>
          <p className="text-sm mb-1">
            <span className="font-medium text-gray-700">Price:</span>{" "}
            {pet.price ? `$${pet.price.toFixed(2)}` : "-"}
          </p>
          <p className="text-sm">
            <span
              className={`${
                !pet.date_sold || pet.date_sold === "null"
                  ? "font-medium text-green-600"
                  : ""
              }`}
            >
              
              {!pet.date_sold || pet.date_sold === "null"
                ? "Available"
                : "Date Sold: " + pet.date_sold}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default PetList;
