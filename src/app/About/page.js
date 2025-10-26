import { AboutBanner } from "@/components/about/about";
import FeatureCards from "@/components/about/FeatureCards";
import TeamAndPartners from "@/components/about/TeamAndPartners";
import Footer from "@/components/Footer/Footer";
import AboutSection from "@/components/home-layout/About/AboutSection";
import FAQ from "@/components/home-layout/Faq";
import NewsletterSection from "@/components/home-layout/Newsletter";
import CustomerReviews from "@/components/home-layout/Reviews/CustomerReviews";
import { Navbar } from "@/components/Navbar";

export default function AboutUs() {
  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <AboutBanner />
        <AboutSection showTitle={false} />
        <FeatureCards />
        <TeamAndPartners />
        <CustomerReviews />
        <FAQ />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
