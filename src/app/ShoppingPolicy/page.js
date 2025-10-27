import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar";
import ShoppingPolicy from "@/components/ShoppingPolicy";

export default function ShoppingPolicyPage() {
  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <ShoppingPolicy />
      </main>
      <Footer />
    </div>
  );
}
