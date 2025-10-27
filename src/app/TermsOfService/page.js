import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar";
import TermsOfService from "@/components/TermsOfService";

export default function TermsOfServicePage() {
  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <TermsOfService />
      </main>
      <Footer />
    </div>
  );
}
