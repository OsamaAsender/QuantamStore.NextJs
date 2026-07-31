// components/FilterSidebar.tsx
import React, { useState } from "react";

export default function FilterSidebar({ onFilterChange }) {
  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });
  const [priceRange, setPriceRange] = useState([0, 780]);

  const handleCheckbox = (type: "inStock" | "outOfStock") => {
    const updated = { inStock: false, outOfStock: false, [type]: true };
    setAvailability(updated);
    onFilterChange({ availability: updated, priceRange });
  };

  const handlePriceChange = (e, index) => {
    const updated = [...priceRange];
    updated[index] = parseInt(e.target.value);
    setPriceRange(updated);
    onFilterChange({ availability, priceRange: updated });
  };

  return (
    <aside className=" p-4 rounded border-r border-gray-200 w-64">
      <h2 className="text-lg font-bold mb-4">Filter</h2>

      {/* Availability */}
      <div className="mb-4">
        <h3 className="font-semibold text-sm mb-1">Availability</h3>
        <label className="block text-sm">
          <input
            type="checkbox"
            checked={availability.inStock}
            onChange={() => handleCheckbox("inStock")}
          />{" "}
          In stock
        </label>
        <label className="block text-sm">
          <input
            type="checkbox"
            checked={availability.outOfStock}
            onChange={() => handleCheckbox("outOfStock")}
          />{" "}
          Out of stock
        </label>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold text-sm mb-1">Price</h3>
        <p className="text-xs mb-2">The highest price is 780.000 JD</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="border rounded px-2 py-1 w-16"
          />
          <span>–</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="border rounded px-2 py-1 w-16"
          />
        </div>
      </div>
    </aside>
  );
}
