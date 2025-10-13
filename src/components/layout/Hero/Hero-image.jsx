"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fetchProducts } from "@/lib/shopify";

import "swiper/css";
import "swiper/css/navigation";

export default function HeroImage() {
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      if (data && data.length > 0) setProducts(data.slice(0, 8));
    }
    loadProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">Loading products...</div>
    );
  }

  // handle looping offset properly
  const getOffset = (index, activeIndex, total) => {
    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  // arch transform logic with lifted 2nd and 4th
  const getTransform = (offset) => {
    const clamped = Math.max(-2, Math.min(2, offset)); // only first 2 per side tilt
    let rotate = 0;
    let translateY = Math.abs(clamped) * 40; // base downward movement
    let scale = clamped === 0 ? 1.05 : 1; // focus on center

    if (clamped < 0) rotate = clamped === -2 ? -11 : -5; // tilt left
    if (clamped > 0) rotate = clamped === 2 ? 11 : 5; // tilt right

    // lift 2nd and 4th slightly upward to form a smooth arch
    if (Math.abs(clamped) === 1) translateY -= 20;

    return `rotate(${rotate}deg) translateY(${translateY}px) scale(${scale})`;
  };

  return (
    <div className="bg-neutral-50 pt-10 px-0 pb-32 relative w-full overflow-visible">
      {/* Navigation buttons */}
      <div
        className="absolute left-44 top-1/2 z-10 -translate-y-1/2"
        style={{ transform: "rotate(-17deg)" }}
      >
        <button className="swiper-button-prev bg-black text-white border border-white rounded-full p-3 shadow-lg hover:scale-110 transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
      <div
        className="absolute right-44 top-1/2 z-10 -translate-y-1/2"
        style={{ transform: "rotate(17deg)" }}
      >
        <button className="swiper-button-next bg-black text-white border border-white rounded-full p-3 shadow-lg hover:scale-110 transition">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={8}
        slidesPerView={5}
        centeredSlides
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="hero-swiper"
      >
        {products.map((product, index) => {
          const image = product.images?.[0]?.url || "/placeholder.png";
          const price = product.variants?.[0]?.price?.amount;
          const currency = product.variants?.[0]?.price?.currencyCode;

          const offset = getOffset(index, activeIndex, products.length);
          const transform = getTransform(offset);
          const isActive = index === activeIndex;

          return (
            <SwiperSlide key={product.id}>
              <div
                className={`p-1 rounded-[5rem] transition-all duration-500 ${
                  isActive
                    ? "border-2 border-dashed border-neutral-950"
                    : "border-transparent"
                }`}
                style={{
                  transform,
                  transformOrigin: "center bottom",
                  transition: "transform 0.5s ease, border-color 0.3s ease",
                }}
              >
                <div className="relative group overflow-hidden bg-white shadow-sm hover:shadow-lg rounded-[5rem] transition-all duration-300">
                  <Image
                    src={image}
                    alt={product.title}
                    width={400}
                    height={500}
                    className="object-cover w-full h-[450px] rounded-[5rem]"
                  />

                  {/* Price Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition">
                    <div className="mb-6 text-center">
                      <p className="text-yellow-400 font-semibold">
                        {currency} {price}
                      </p>
                      <button className="bg-black text-white px-5 py-2 rounded-md mt-1 text-sm">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
