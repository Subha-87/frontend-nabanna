"use client";

import { useAccessibility } from "@/context/AccessibilityContext";

export default function AccessibilityToolbar() {
  const {
    increaseFont,
    decreaseFont,
    resetFont,
    canIncrease,
    canDecrease,
  } = useAccessibility();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-white">
        Text Size:
      </span>

      <button
        onClick={decreaseFont}
        disabled={!canDecrease}
        aria-label="Decrease font size"
        className="border rounded px-3 py-1 font-bold text-amber-300
        hover:bg-gray-100 disabled:opacity-40"
      >
        A−
      </button>

      <button
        onClick={resetFont}
        aria-label="Reset font size"
        className="border rounded px-3 py-1 font-bold text-amber-300
        hover:bg-gray-100"
      >
        A
      </button>

      <button
        onClick={increaseFont}
        disabled={!canIncrease}
        aria-label="Increase font size"
        className="border rounded px-3 py-1 font-bold text-amber-300
        hover:bg-gray-100 disabled:opacity-40"
      >
        A+
      </button>
    </div>
  );
}