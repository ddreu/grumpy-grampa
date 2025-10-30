"use client";

import { Truck, CreditCard, Headphones, Gift } from "lucide-react";

export default function HeroSubtext() {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-neutral-950" />,
      title: "Fast Shipping",
      desc: "Free Shipping Worldwide",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-neutral-950" />,
      title: "Secured Payment",
      desc: "Safe & Secured Payments",
    },
    {
      icon: <Headphones className="w-8 h-8 text-neutral-950" />,
      title: "24/7 Support",
      desc: "Support Around The Clock",
    },
    {
      icon: <Gift className="w-8 h-8 text-neutral-950" />,
      title: "Perfect Gifts",
      desc: "Free Gift Cards & Vouchers",
    },
  ];

  return (
    <section className="bg-black text-white py-8 rounded-4xl max-w-7xl sm:max-w-2xl md:max-w-7xl lg:max-w-8xl mx-auto my-12 px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-1 text-center">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center space-y-3"
          >
            <div className="bg-neutral-50 p-4 rounded-full">{item.icon}</div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
