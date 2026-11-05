"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AccessibilityContext = createContext();

const FONT_SIZES = [
  8,  // A-----
  9,  // A----
  10, // A---
  12, // A--
  14, // A-
  16, // Default
  18, // A+
  20, // A++
  22, // A+++
  24, // A++++
  26, // A+++++
];

export const AccessibilityProvider = ({ children }) => {
  const [fontIndex, setFontIndex] = useState(1);

  useEffect(() => {
    const savedSize = localStorage.getItem("app-font-size");

    if (savedSize !== null) {
      const index = Number(savedSize);

      if (
        Number.isInteger(index) &&
        index >= 0 &&
        index < FONT_SIZES.length
      ) {
        setFontIndex(index);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--app-font-size",
      `${FONT_SIZES[fontIndex]}px`
    );

    localStorage.setItem("app-font-size", fontIndex);
  }, [fontIndex]);

  const increaseFont = () => {
    setFontIndex((prev) =>
      Math.min(prev + 1, FONT_SIZES.length - 1)
    );
  };

  const decreaseFont = () => {
    setFontIndex((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  const resetFont = () => {
    setFontIndex(5);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        increaseFont,
        decreaseFont,
        resetFont,
        fontIndex,
        canIncrease: fontIndex < FONT_SIZES.length - 1,
        canDecrease: fontIndex > 0,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () =>
  useContext(AccessibilityContext);