import SectionHeading from "./SectionHeading.jsx";
import ProductCard from "./ProductCard.jsx";
import { products } from "../data/landingContent.js";
import useFadeUp from "../hooks/useFadeUp.js";

const productIcons = [
  /* Heart / Spa */
  <svg key="spa" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>,
  /* Cube / Inventory */
  <svg key="box" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>,
  /* Globe / Digital */
  <svg key="globe" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>,
];

const Products = () => {
  const fade = useFadeUp();

  return (
    <section id="products" className="bg-apple-gray-5/50 py-14 md:py-20">
      <div ref={fade.ref} className={`mx-auto max-w-6xl px-6 ${fade.className}`}>
        <SectionHeading
          eyebrow="Sản phẩm"
          title="Từng ngành nghề,"
          highlight="một hệ thống riêng."
          description="Ba sản phẩm đã triển khai thực tế — và đều có thể tuỳ chỉnh sâu hơn theo đặc thù của bạn."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} icon={productIcons[i]} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;

