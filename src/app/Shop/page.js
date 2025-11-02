"use client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/home-layout/Faq";
import NewsletterSection from "@/components/home-layout/Newsletter";
import { Navbar } from "@/components/Navbar";
import SearchBar from "@/components/Search/SearchBar";
import { fetchCollectionsByGroup } from "@/lib/shopify";
import { Product } from "@/components/Products/Product-List";
import ProductGrid from "@/components/Products/Product-Grid";

export default function Shop() {
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(""); // local search query
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function loadGroups() {
      try {
        const data = await fetchCollectionsByGroup();
        setGroups(data);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGroups();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 text-center">
        <p>Loading Shop...</p>
      </div>
    );
  }

  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />

        {/* Pass down search state */}
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onFiltersApply={setFilters}
        />

        {/* Swap between ProductGrid and Product */}
        {query.trim() || Object.keys(filters).length > 0 ? (
          <Product query={query} filters={filters} />
        ) : (
          Object.entries(groups).map(([groupName, collections]) => (
            <ProductGrid
              key={groupName}
              title={groupName}
              tabs={collections.map((c) => c.title)}
              showFilter={false}
              className="py-6"
              viewAllUrl={`/Shop/${encodeURIComponent(
                groupName
              )}?title=${encodeURIComponent(groupName)}`}
            />
          ))
        )}

        <FAQ />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
