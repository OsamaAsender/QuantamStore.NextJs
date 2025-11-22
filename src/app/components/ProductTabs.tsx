"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["Description", "Specifications", "Reviews"];

export default function ProductTabs({
  description,
  specifications,
  reviews,
}: {
  description: string;
  specifications: {
    brand: string;
    model: string;
    type: string;
    frequencyResponse: string;
    connectivity: string;
    batteryLife: string;
    microphone: string;
    compatibility: string;
    origin: string;
  };
  reviews: { name: string; text: string; role: string }[];
}) {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="mt-10  p-6 rounded ">
      {/* Tab Headers */}
      <div className="flex space-x-4  mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t transition duration-200 ${
              activeTab === tab
                ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "Description" && (
            <div>
              <h2 className="text-lg font-bold mb-2 text-indigo-700">Description</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {description || "No description available."}
              </p>
            </div>
          )}

          {activeTab === "Specifications" && (
            <div>
              <h2 className="text-lg font-bold mb-2 text-indigo-700">Specifications</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><span className="font-medium">Brand:</span> {specifications.brand}</li>
                <li><span className="font-medium">Model:</span> {specifications.model}</li>
                <li><span className="font-medium">Type:</span> {specifications.type}</li>
                <li><span className="font-medium">Frequency Response:</span> {specifications.frequencyResponse}</li>
                <li><span className="font-medium">Connectivity:</span> {specifications.connectivity}</li>
                <li><span className="font-medium">Battery Life:</span> {specifications.batteryLife}</li>
                <li><span className="font-medium">Microphone:</span> {specifications.microphone}</li>
                <li><span className="font-medium">Compatibility:</span> {specifications.compatibility}</li>
                <li><span className="font-medium">Made in:</span> {specifications.origin}</li>
              </ul>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div>
              <h2 className="text-lg font-bold mb-2 text-indigo-700">Customer Reviews</h2>
              <div className="space-y-6">
                {reviews.map((review, idx) => (
                  <div key={idx} className="border-l-4 border-indigo-600 pl-4">
                    <p className="text-sm text-gray-700 italic">“{review.text}”</p>
                    <p className="mt-2 text-xs text-gray-500">— {review.name}, {review.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
