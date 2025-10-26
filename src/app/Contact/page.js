import ContactForm from "@/components/contact/contact";
import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/home-layout/Faq";
import NewsletterSection from "@/components/home-layout/Newsletter";
import { Navbar } from "@/components/Navbar";

export default function ContactUs() {
  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <ContactForm />
        <FAQ />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
