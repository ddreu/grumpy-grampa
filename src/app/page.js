import Footer from "@/components/layout/Footer/Footer";
import { Navbar } from "../components/layout/Navbar";
import { Product } from "../components/layout/Products/Product-List";
import Hero from "@/components/layout/Hero";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* <main className="p-8 bg-neutral-50"> */}
      <main className="pt-0 px-8 pb-8 bg-neutral-50">
        <Hero />
        <Product />
      </main>
      <Footer />
    </div>
  );
}
