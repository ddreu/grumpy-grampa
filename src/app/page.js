import Footer from "@/components/Footer/Footer";
import { Navbar } from "../components/Navbar";
import { Product } from "../components/Products/Product-List";
import Hero from "@/components/home-layout/Hero";
import ProductGrid from "@/components/Products/Product-Grid";
import AboutSection from "@/components/home-layout/About/AboutSection";
import NewsletterSection from "@/components/home-layout/Newsletter";
import FAQ from "@/components/home-layout/Faq";
import BlogSection from "@/components/home-layout/BlogSection";
import CustomerReviews from "@/components/home-layout/Reviews/CustomerReviews";

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
