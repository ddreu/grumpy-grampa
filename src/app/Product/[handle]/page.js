// app/Product/[handle]/page.js
import FeatureCards from "@/components/about/FeatureCards";
import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/home-layout/Faq";
import NewsletterSection from "@/components/home-layout/Newsletter";
import { Navbar } from "@/components/Navbar";
import ProductView from "@/components/Products/Product-View";
import { fetchProduct } from "@/lib/shopify";

export default async function ProductPage({ params }) {
  const { handle } = params;

  const product = await fetchProduct(handle); // Fetch from Shopify API

  if (!product) {
    return (
      <div className="">
        <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
          <Navbar />
          <p className="text-2xl py-46 text-center font-semibold text-neutral-800">
            Product not found
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <ProductView product={product} />
        <FeatureCards />
        <FAQ />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
