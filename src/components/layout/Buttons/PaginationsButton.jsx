// src/components/PaginationButtons.jsx
"use client";

export default function PaginationButtons({
  progress = 0,
  onPrevious,
  onNext,
}) {
  /**
   * progress: number between 0 and 100 representing progress
   */

  return (
    <div className="flex justify-center items-center gap-6 mt-10 w-full max-w-2xl mx-auto">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        className="px-6 py-2 border border-neutral-950 text-neutral-950 rounded-full font-medium hover:bg-neutral-100 transition"
      >
        Previous
      </button>

      {/* Progress Bar */}
      <div className="relative flex-1 h-2 bg-neutral-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-neutral-950 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="px-6 py-2 bg-neutral-950 text-neutral-50 rounded-full font-medium hover:bg-neutral-800 transition"
      >
        Next
      </button>
    </div>
  );
}
