import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar";
import RefundPolicy from "@/components/RefundPolicy";

export default function RefundPolicyPage() {
  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <RefundPolicy />
      </main>
      <Footer />
    </div>
  );
}
