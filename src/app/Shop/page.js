import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/home-layout/Faq";
import NewsletterSection from "@/components/home-layout/Newsletter";
import { Navbar } from "@/components/Navbar";
import ProductGrid from "@/components/Products/Product-Grid";
import SearchBar from "@/components/Search/SearchBar";

export default function Shop() {
  const categories = [
    {
      title: "Grandparents",
      tabs: ["Grampa", "Gramma"],
    },
    {
      title: "Theme",
      tabs: ["Typography", "Graphical", "Minimalistic"],
    },
    {
      title: "Accessories",
      tabs: ["Socks", "Hats", "Bags"],
    },
    {
      title: "Home & Living",
      tabs: ["Mugs", "Postcards", "Journals"],
    },
    {
      title: "Featured",
      tabs: ["New Arrivals", "Best Sellers", "Sales"],
    },
  ];

  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <SearchBar />
        {categories.map((cat) => (
          <ProductGrid
            key={cat.title}
            title={cat.title}
            tabs={cat.tabs}
            showFilter={false}
            className="py-6"
            viewAllUrl={`/Shop/${encodeURIComponent(
              cat.title
            )}?title=${encodeURIComponent(cat.title)}&tabs=${encodeURIComponent(
              cat.tabs.join(",")
            )}`}
          />
        ))}
        <FAQ />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
