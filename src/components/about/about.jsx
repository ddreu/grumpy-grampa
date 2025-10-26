"use client";

export const AboutBanner = () => {
  return (
    <section className="relative mt-6 mb-8 max-w-7xl mx-auto bg-black text-white rounded-3xl flex flex-col items-center justify-center py-15 px-6 text-center">
      <div className="absolute inset-0 bg-[url('/lines.svg')] bg-cover bg-center opacity-20 pointer-events-none" />

      <div className="relative z-10 border border-neutral-200 rounded-full px-4 py-1 text-sm mb-10">
        About Us
      </div>

      <h2 className="relative z-10 text-3xl md:text-5xl font-extrabold mb-10">
        Grumpy by Nature. Legendary by Choice.
      </h2>

      <p className="relative z-10 text-sm md:text-base text-gray-300 mb-8">
        Turning old school grit into goods worth bragging about.
      </p>
    </section>
  );
};
