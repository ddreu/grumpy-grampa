import { Navbar } from "../components/layout/Navbar";
import { Product } from "../components/layout/Products/Product-List";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-8 bg-neutral-50">
        <Product />
      </main>
    </div>
  );
}
