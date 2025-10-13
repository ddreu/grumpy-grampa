import Footer from "@/components/layout/Footer/Footer";
import { Navbar } from "../components/layout/Navbar";
import { Product } from "../components/layout/Products/Product-List";
import Hero from "@/components/layout/Hero";
import ProductGrid from "@/components/layout/Products/Product-Grid";

export default function Home() {
  return (
    <div>
      {/* <main className="p-8 bg-neutral-50"> */}
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <Hero />
        <ProductGrid />
        {/* <Product /> */}
      </main>
      <Footer />
    </div>
  );
}
