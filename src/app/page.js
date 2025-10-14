import Footer from "@/components/layout/Footer/Footer";
import { Navbar } from "../components/layout/Navbar";
import { Product } from "../components/layout/Products/Product-List";
import Hero from "@/components/layout/Hero";
import ProductGrid from "@/components/layout/Products/Product-Grid";
import AboutSection from "@/components/layout/About/AboutSection";
import NewsletterSection from "@/components/layout/Newsletter";
import FAQ from "@/components/layout/Faq";
import BlogSection from "@/components/layout/BlogSection";
import CustomerReviews from "@/components/layout/Reviews/CustomerReviews";

export default function Home() {
  return (
    <div>
      {/* <main className="p-8 bg-neutral-50"> */}
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <Hero />
        <ProductGrid />
        <AboutSection />
        <CustomerReviews />
        <BlogSection />
        <FAQ />
        <NewsletterSection />
        {/* <Product /> */}
      </main>
      <Footer />
    </div>
  );
}
