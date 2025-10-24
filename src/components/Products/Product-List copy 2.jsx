"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../lib/shopify";
import { ArrowDown, Star } from "lucide-react";
import CartIcon from "../icons/Cart";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Compare from "../icons/Compare";
import Heart from "../icons/Heart";

export function Product() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Products";
  const tabsParam = searchParams.get("tabs") || "";
  const tabs = tabsParam ? tabsParam.split(",") : [];

  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [activeCollection, setActiveCollection] = useState(tabs[0] || "");

  const query = searchParams.get("query")?.toLowerCase() || "";

  // const filteredProducts = products.filter((product) =>
  //   product.collections?.some(
  //     (collection) => collection.title === activeCollection
  //   )
  // );

  const filteredProducts = products.filter((product) => {
    const inCollection = activeCollection
      ? product.collections?.some(
          (collection) => collection.title === activeCollection
        )
      : true;

    const matchesQuery = query
      ? product.title.toLowerCase().includes(query) ||
        product.descriptionHtml?.toLowerCase().includes(query)
      : true;

    return inCollection && matchesQuery;
  });

  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 8);

  useEffect(() => {
    async function getProducts() {
      const items = await fetchProducts();
      setProducts(items);
    }
    getProducts();
  }, []);

  if (products.length === 0)
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Loading products...
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto mt-8 py-10">
      {/* Category Header */}
      <div className="mb-12">
        <h1 className="text-3xl mb-8 md:text-4xl font-bold text-neutral-900">
          {title}
        </h1>
        <div className="flex gap-3 mt-3">
          {tabs.map((collection) => (
            <button
              key={collection}
              onClick={() => setActiveCollection(collection)}
              className={`px-5 cursor-pointer py-2 rounded-full font-medium transition ${
                activeCollection === collection
                  ? "bg-black text-white"
                  : "border border-neutral-950 text-neutral-900 hover:bg-gray-300"
              }`}
            >
              {collection}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => {
            const variant = product.variants[0];
            const image = product.images[0]?.url;

            const currentPrice = parseFloat(variant?.price?.amount || 0);
            const compareAtPrice = parseFloat(
              variant?.compareAtPrice?.amount || 0
            );

            const discount =
              compareAtPrice > currentPrice
                ? Math.round(
                    ((compareAtPrice - currentPrice) / compareAtPrice) * 100
                  )
                : 0;

            return (
              <Link
                key={product.id}
                href={`/Product/${product.handle}`}
                className="group"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                  {/* Discount badge */}
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                      {discount}% OFF
                    </span>
                  )}

                  {/* Vertical hover buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                      <Compare size={20} strokeWidth={1} />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                      <Heart size={20} strokeWidth={1} />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    {image ? (
                      <img
                        src={image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="bg-gray-100 h-full w-full" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="flex items-center text-sm text-yellow-500 mb-1">
                      <Star size={14} fill="currentColor" />
                      <p className="ml-1 text-neutral-800">
                        5.0{" "}
                        <span className="text-gray-400 text-xs">
                          (260 Reviews)
                        </span>
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-neutral-950">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {product.title}
                        </h3>
                        <div>
                          <span className="text-[17px] font-bold text-neutral-900">
                            ${currentPrice.toFixed(2)}
                          </span>{" "}
                          {discount > 0 && (
                            <span className="text-[14px] text-gray-400 line-through">
                              ${compareAtPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        className="bg-black text-white rounded-full p-3 hover:bg-gray-800 transition self-center"
                        onClick={(e) => e.preventDefault()}
                      >
                        <CartIcon size={26} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            No products found in this collection.
          </div>
        )}
      </div>

      {products.length > 8 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-8 py-3 border border-neutral-950 text-neutral-950 rounded-full hover:bg-neutral-950 hover:text-white transition-colors duration-200 text-md cursor-pointer font-medium"
          >
            {showAll ? "Show Less" : "Show More"}
            <ArrowDown
              size={16}
              className={`transition-transform duration-300 ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
    </section>
  );
}
