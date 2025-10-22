"use client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/home-layout/Faq";
import NewsletterSection from "@/components/home-layout/Newsletter";
import { Navbar } from "@/components/Navbar";
import ProductGrid from "@/components/Products/Product-Grid";
import SearchBar from "@/components/Search/SearchBar";
import { fetchCollectionsByGroup } from "@/lib/shopify";

export default function Shop() {
  const [groups, setGroups] = useState({}); // { groupName: [collections] }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGroups() {
      try {
        const data = await fetchCollectionsByGroup(); // fetches { groupName: [collections] }
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
        <SearchBar />

        {Object.entries(groups).map(([groupName, collections]) => (
          <ProductGrid
            key={groupName}
            title={groupName}
            tabs={collections.map((c) => c.title)} // collection titles as tabs
            showFilter={false}
            className="py-6"
            viewAllUrl={`/Shop/${encodeURIComponent(
              groupName
            )}?title=${encodeURIComponent(groupName)}`}
          />
        ))}

        <FAQ />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
