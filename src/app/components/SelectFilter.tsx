'use client';
import Select from "react-select";
import { SelectFilterProps } from "../types/filters";

export default function SelectFilter({
  label,
  options,
  value,
  onChange,
  hideLabel = false,
}: SelectFilterProps & { hideLabel?: boolean }) {
  return (
    <div className="w-full max-w-xs">
      {!hideLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Select
        options={options}
        value={value}
        onChange={onChange}
        isClearable
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? "#4f46e5" : "#d1d5db",
            boxShadow: state.isFocused ? "0 0 0 1px #4f46e5" : "none",
            "&:hover": {
              borderColor: "#4f46e5",
            },
            minHeight: "36px",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#eef2ff" : "white",
            color: state.isSelected ? "#4f46e5" : "#111827",
            fontWeight: state.isSelected ? "600" : "400",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#111827",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#6b7280",
          }),
        }}
      />
    </div>
  );
}
