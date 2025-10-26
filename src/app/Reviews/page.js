import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/home-layout/Faq";
import NewsletterSection from "@/components/home-layout/Newsletter";
import { Navbar } from "@/components/Navbar";
import ReviewsGrid from "@/components/reviews/ReviewsGrid";

export default function ReviewsPage() {
  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <ReviewsGrid />
        <FAQ />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
