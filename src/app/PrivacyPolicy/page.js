import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar";

import PrivacyPolicy from "@/components/PrivacyPolicy";

export default function PrivacyPolicyPage() {
  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <PrivacyPolicy />
      </main>
      <Footer />
    </div>
  );
}
