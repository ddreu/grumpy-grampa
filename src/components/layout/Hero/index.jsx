"use client";

import HeroImage from "./Hero-image";
import HeroSubtext from "./Hero-subtext";
import HeroText from "./Hero-text";
// import HeroImage from "./hero-image";
// import HeroFeatured from "./hero-featured";

export default function Hero() {
  return (
    <section className="w-full">
      {/* Section 1: Text Hero */}
      <HeroText />
      {/* Section 2: Image Hero (coming soon) */}
      <HeroImage />
      {/* Section 3: Featured Section (coming soon) */}
      <HeroSubtext />
    </section>
  );
}
