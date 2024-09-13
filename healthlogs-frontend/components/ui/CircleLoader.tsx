import React from "react";

interface CircleLoaderProps {
  size?: "small" | "medium" | "large";
  color?: string;
  thickness?: number;
}

export default function CircleLoader({
  size = "medium",
  color = "text-blue-500",
  thickness = 2,
}: CircleLoaderProps) {
  const sizeClasses = {
    small: "w-5 h-5",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-t-2 border-b-2 border-l-2 rounded-full animate-spin ${color}`}
        style={{ borderWidth: `${thickness}px` }}
      ></div>
    </div>
  );
}
