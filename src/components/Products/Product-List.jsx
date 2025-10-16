"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../lib/shopify";

export function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const items = await fetchProducts();
      setProducts(items);
    }
    getProducts();
  }, []);

  if (products.length === 0) return <p>Loading products...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => {
        const variant = product.variants[0];

        return (
          <div key={product.id} className="border p-4 rounded shadow">
            {product.images.length > 0 && (
              <div className="mb-4 flex gap-2 overflow-x-auto">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.altText || product.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
            )}

            <h2 className="text-xl text-gray-700 font-bold mb-2">
              {product.title}
            </h2>

            {variant && variant.price && (
              <p className="text-gray-700 mb-2">
                Price: {variant.price.amount} {variant.price.currencyCode}
              </p>
            )}

            <p className="text-gray-500 mb-2">Handle: {product.handle}</p>

            <a
              href={`/products/${product.handle}`}
              className="text-blue-500 hover:underline"
            >
              View Product
            </a>
          </div>
        );
      })}
    </div>
  );
}
