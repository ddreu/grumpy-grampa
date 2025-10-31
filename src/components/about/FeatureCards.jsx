// components/FeatureCards.jsx
import { Check, User, Cloud, Shirt, CloudRainWind } from "lucide-react"; // Using Lucide icons as example

const features = [
  {
    icon: <Check className="w-6 h-6" />,
    title: "100% Cotton",
    description: "Pure Comfort, Naturally Yours",
  },
  {
    icon: <User className="w-6 h-6" />,
    title: "Hand-Crafted Design",
    description: "Made With Skilled Hands",
  },
  {
    icon: <Shirt className="w-6 h-6" />,
    title: "Breathable Fabric",
    description: "Breathe Easy, Wear Comfort",
  },
  {
    icon: <CloudRainWind className="w-6 h-6" />,
    title: "Perfect For All Weather",
    description: "Comfort Every Season Brings",
  },
];

export default function FeatureCards() {
  return (
    <div className="bg-neutral-200 items-center mx-5 md:mx-auto rounded-4xl max-w-7xl p-6 flex flex-col sm:flex-row justify-between gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-8 flex-1"
        >
          <div className="bg-black text-white rounded-full p-3 mb-3">
            {feature.icon}
          </div>
          <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
          <p className="text-gray-500 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
