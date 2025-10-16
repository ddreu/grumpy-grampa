import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/home-layout/Faq";
import NewsletterSection from "@/components/home-layout/Newsletter";
import CustomerReviews from "@/components/home-layout/Reviews/CustomerReviews";
import { Navbar } from "@/components/Navbar";

import SearchBar from "@/components/Search/SearchBar";

export default function AboutUs() {
  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <SearchBar />
        <CustomerReviews />
        <FAQ />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
