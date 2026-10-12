"use client";

import { CircularProgress } from "@mui/material";

const Loading = ({
  message = "Loading meeting records...",
}) => {
  return (
    <div className="flex min-h-[250px] w-full items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-blue-100 bg-white px-10 py-8 shadow-lg shadow-blue-100/50">
        {/* Animated spinner */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-40" />

          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
            <CircularProgress
              size={38}
              thickness={4}
              sx={{ color: "#1565c0" }}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-base font-bold tracking-wide text-gray-800">
            Please Wait
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {message}
          </p>
        </div>

        {/* Animated progress indicator */}
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-blue-100">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-600 to-sky-400" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;