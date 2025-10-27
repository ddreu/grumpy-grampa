import Footer from "@/components/Footer/Footer";
import VerificationCard from "@/components/login-ui/VerificationCard";
import { Navbar } from "@/components/Navbar";

export default function Verification() {
  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar buttonLabel="Back to Home" buttonHref="/" />
        <VerificationCard />
      </main>
      <Footer />
    </div>
  );
}
