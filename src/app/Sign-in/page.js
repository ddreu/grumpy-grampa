import Footer from "@/components/Footer/Footer";
import LoginCard from "@/components/login-ui/LoginCard";
import { Navbar } from "@/components/Navbar";

export default function SignIn() {
  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar buttonLabel="Back to Home" buttonHref="/" />
        <LoginCard />
      </main>
      <Footer />
    </div>
  );
}
