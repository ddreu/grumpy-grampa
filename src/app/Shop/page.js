import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/home-layout/Faq";
import NewsletterSection from "@/components/home-layout/Newsletter";
import { Navbar } from "@/components/Navbar";
import { Product } from "@/components/Products/Product-List";
import SearchBar from "@/components/Search/SearchBar";

export default function Shop() {
  return (
    <div>
      {/* <main className="p-8 bg-neutral-50"> */}
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <SearchBar />
        <Product />
        <FAQ />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
