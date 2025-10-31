"use client";

import Image from "next/image";

const teamMembers = [
  {
    name: "Lynn Clarke",
    role: "Designer",
    img: "/teamandpartners/lynn.png",
  },
  {
    name: "Sam Simpson",
    role: "Designer",
    img: "/teamandpartners/sam.png",
  },
  {
    name: "Marley Mason",
    role: "Designer",
    img: "/teamandpartners/marley.png",
  },
  {
    name: "Maddox West",
    role: "Designer",
    img: "/teamandpartners/maddox.png",
  },
];

const partners = [
  { name: "Louis Vuitton", img: "/teamandpartners/lv.svg" },
  { name: "Chanel", img: "/teamandpartners/chanel.svg" },
  { name: "Lacoste", img: "/teamandpartners/lacoste.svg" },
  { name: "Gucci", img: "/teamandpartners/gucci.svg" },
];

export default function TeamAndPartners() {
  return (
    <section className="py-16 my-10">
      {/* Team Section */}
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-5xl font-bold mb-6">
          The Grumps Behind the Greatness
        </h2>
        <p className="text-lg text-gray-600 mb-15">
          Your Favorite Grumps, United
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4 relative">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="font-bold">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div className="max-w-6xl mx-auto text-center mt-40 px-4">
        <h2 className="text-5xl font-bold mb-6">
          We Don’t Partner With Just Anyone
        </h2>
        <p className="text-lg text-gray-600 mb-15">
          These folks earned their seat at the table.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 items-center justify-center gap-y-6 sm:gap-y-0">
          {partners.map((partner) => (
            <div key={partner.name} className="flex justify-center">
              <Image
                src={partner.img}
                alt={partner.name}
                width={120}
                height={50}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
