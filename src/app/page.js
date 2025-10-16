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
import { User, Star, Gift, Home as HomeIcon, Box } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* <main className="p-8 bg-neutral-50"> */}
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <Hero />
        <ProductGrid
          title="Grumpy Grampa’s Treasure Trove"
          subtitle="Curiously cranky finds, handpicked with old-school charm."
          tabs={[
            { name: "Grandparents", icon: "User" },
            { name: "Theme", icon: "Star" },
            { name: "Accessories", icon: "Gift" },
            { name: "Home & Living", icon: "Home" },
            { name: "Featured", icon: "Box" },
          ]}
          showFilter={true}
          className="py-12"
          viewAllUrl="/Shop"
        />
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
