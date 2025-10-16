// src/components/ViewAllButton.jsx
"use client";

import { ArrowRight } from "lucide-react";

export default function ViewAllButton({ onClick, text = "View All" }) {
  return (
    <div className="mt-12">
      <button
        onClick={onClick}
        className="mx-auto flex items-center gap-2 border border-neutral-950 text-neutral-950 px-8 py-4 rounded-full text-sm font-medium hover:bg-neutral-950 hover:text-white transition"
      >
        {text} <ArrowRight size={20} />
      </button>
    </div>
  );
}
