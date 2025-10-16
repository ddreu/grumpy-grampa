"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { fetchProducts } from "@/lib/shopify";

import "swiper/css";
import "swiper/css/navigation";

export default function HeroImage() {
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Refs for manual navigation
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  const getOffset = (index, activeIndex, total) => {
    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  const getTransform = (offset) => {
    const clamped = Math.max(-2, Math.min(2, offset));
    let rotate = 0;
    let translateY = Math.abs(clamped) * 40;

    if (clamped < 0) rotate = clamped === -2 ? -11 : -5;
    if (clamped > 0) rotate = clamped === 2 ? 11 : 5;

    if (Math.abs(clamped) === 1) translateY -= 25;
    if (clamped === -2 || clamped === 2) translateY -= 15;

    return `rotate(${rotate}deg) translateY(${translateY}px)`;
  };

  return (
    <div className="bg-neutral-50 pt-10 px-0 pb-32 relative w-full overflow-visible">
      {/* ✅ Custom buttons without Swiper classes */}
      <div
        className="absolute left-60 top-1/2 z-10 -translate-y-1/2"
        style={{ transform: "rotate(-17deg)" }}
      >
        <button
          ref={prevRef}
          className="bg-black text-white border-2 border-white rounded-full p-4 shadow-lg hover:scale-110 transition flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ArrowLeft size={35} strokeWidth={2} />
        </button>
      </div>

      <div
        className="absolute right-60 top-1/2 z-10 -translate-y-1/2"
        style={{ transform: "rotate(17deg)" }}
      >
        <button
          ref={nextRef}
          className="bg-black text-white border-2 border-white rounded-full p-4 shadow-lg hover:scale-110 transition flex items-center justify-center"
          aria-label="Next slide"
        >
          <ArrowRight size={35} strokeWidth={2} />
        </button>
      </div>

      {/* ✅ Swiper with manual nav refs */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
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
                className={`p-1 rounded-[6.5rem] transition-all duration-500 ${
                  isActive
                    ? "border-3 border-dashed border-neutral-950"
                    : "border-transparent"
                }`}
                style={{
                  transform,
                  transformOrigin: "center bottom",
                  transition: "transform 0.5s ease, border-color 0.3s ease",
                }}
              >
                <div className="relative group overflow-hidden bg-white shadow-sm hover:shadow-lg rounded-[6rem] transition-all duration-300">
                  <Image
                    src={image}
                    alt={product.title}
                    width={400}
                    height={500}
                    className="object-cover w-full h-[450px] rounded-[5rem]"
                  />

                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-end transition ${
                      isActive
                        ? "opacity-100"
                        : "bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`mb-3 w-68 text-center bg-[#0A0A0A]/50 ${
                        isActive ? "block" : "hidden group-hover:block"
                      } rounded-t-[4rem] rounded-b-[11rem] pt-4 pb-7 transition-all duration-300`}
                      style={{ backdropFilter: "blur(1.5px)" }}
                    >
                      <p className="text-yellow-400 mt-2 font-thin text-lg">
                        {currency} {price}
                      </p>
                      <button className="text-white px-6 rounded-md mt-2 font-semibold tracking-wide text-xl">
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
