import React from "react";
import toast from "react-hot-toast";

interface SoftDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>; // <-- now async
  entityName?: string;
  displayName?: string; // <-- new: "John Doe"
}

export default function SoftDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  entityName = "item",
  displayName = "",
}: SoftDeleteModalProps) {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    await onConfirm(); // wait for server
    toast.success(`${displayName} deleted successfully.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center z-50 fade-in">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{displayName}</span>? This action is
          reversible.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}