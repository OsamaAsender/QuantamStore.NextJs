"use client";

import React from "react";

type Step = "Cart" | "Details" | "Payment" | "Confirmation";

interface BreadcrumbProps {
  current: Step;
}

const steps: Step[] = ["Cart", "Details", "Payment", "Confirmation"];

export default function Breadcrumb({ current }: BreadcrumbProps) {
  return (
    <div className="flex justify-around mx-auto max-w-lg items-center mb-10 font-mono text-sm text-gray-600">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <span
            className={
              step === current
                ? "font-bold bg-indigo-600 text-white py-1 px-2 rounded"
                : "text-gray-400"
            }
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <span className="text-gray-400">→</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
