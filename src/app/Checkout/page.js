import CartPage from "@/components/Cart/Cart";
import CheckoutPage from "@/components/Checkout/Checkout";
import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/home-layout/Faq";
import NewsletterSection from "@/components/home-layout/Newsletter";
import { Navbar } from "@/components/Navbar";

export default function AboutUs() {
  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <CheckoutPage />
        <FAQ />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
