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

  return (
    <div className="bg-neutral-50 py-12 relative w-full">
      {/* Navigation buttons */}
      <div className="absolute left-30 top-1/2 z-10 -translate-y-1/2">
        <button className="swiper-button-prev bg-black text-white border-1 border-white rounded-full p-3 shadow-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="absolute right-30 top-1/2 z-10 -translate-y-1/2">
        <button className="swiper-button-next bg-black text-white border-1 border-white rounded-full p-3 shadow-lg">
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
        spaceBetween={20}
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

          const isActive = index === activeIndex;

          return (
            <SwiperSlide key={product.id}>
              {/* Outer wrapper for border and spacing */}
              <div
                className={`p-1 rounded-[5rem] transition-all duration-300 ${
                  isActive
                    ? "border-2 border-dashed border-neutral-950"
                    : "border-transparent"
                }`}
              >
                {/* Inner container for image and overlay */}
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
