"use client";
import { useRef, useState, useEffect } from "react";

export default function PaginationButtons({
  progress = 0,
  visibleRatio = 25,
  onPrevious,
  onNext,
  onDragChange,
}) {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localProgress, setLocalProgress] = useState(progress);

  // keep localProgress in sync when parent changes progress
  useEffect(() => {
    if (!isDragging) setLocalProgress(progress);
  }, [progress, isDragging]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updateProgress(e);
  };

  const handlePointerMove = (e) => {
    if (isDragging) updateProgress(e);
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (onDragChange) onDragChange(localProgress);
    }
  };

  const updateProgress = (e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let percent = x / rect.width;
    percent = Math.min(Math.max(percent, 0), 1); // clamp 0 → 1
    setLocalProgress(percent * 100);
  };

  const displayedProgress = isDragging ? localProgress : progress;

  return (
    <div
      className="flex justify-center items-center gap-6 mt-10 w-full max-w-2xl mx-auto select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        className="px-6 py-2 cursor-pointer text-neutral-950 rounded-full font-medium bg-neutral-200 hover:bg-neutral-300 transition"
      >
        Previous
      </button>

      {/* Progress Track */}
      <div
        ref={trackRef}
        className="relative flex-1 h-2 bg-neutral-300 rounded-full overflow-hidden cursor-pointer"
        onPointerDown={handlePointerDown}
      >
        {/* Moving Indicator */}
        <div
          className="absolute top-0 h-full bg-neutral-950 rounded-full transition-all duration-150"
          style={{
            width: `${visibleRatio}%`,
            left: `calc(${displayedProgress}% * (100 - ${visibleRatio}) / 100)`,
          }}
        ></div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="px-6 py-2 cursor-pointer bg-neutral-950 text-neutral-50 rounded-full font-medium hover:bg-neutral-800 transition"
      >
        Next
      </button>
    </div>
  );
}
