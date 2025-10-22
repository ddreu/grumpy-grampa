"use client";
import { useState } from "react";
import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/home-layout/Faq";
import NewsletterSection from "@/components/home-layout/Newsletter";
import { Navbar } from "@/components/Navbar";
import { Product } from "@/components/Products/Product-List";
import SearchBar from "@/components/Search/SearchBar";

export default function Categories() {
  const [query, setQuery] = useState(""); // local state

  return (
    <div>
      <main className="pt-0 pb-8 bg-neutral-50 overflow-hidden">
        <Navbar />
        <SearchBar query={query} onQueryChange={setQuery} />
        <Product query={query} />
        <FAQ />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
