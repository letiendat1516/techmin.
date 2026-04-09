const ProductCard = ({ product, icon, delay = 0 }) => {
  return (
    <article
      className="group flex flex-col rounded-2xl bg-white p-8 shadow-[0_2px_8px_0_rgba(0,0,0,0.07)] ring-1 ring-black/[0.06] transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-1 animate-fade-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: "both" }}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-apple-gray-5 text-apple-gray-2 transition-colors duration-300 group-hover:bg-apple-blue group-hover:text-white">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-apple-gray-1">{product.name}</h3>
      {product.description && (
        <p className="mt-2 text-sm text-apple-gray-3">{product.description}</p>
      )}
      <ul className="mt-5 flex-1 space-y-3">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[15px] text-apple-gray-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-apple-blue">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-4 border-t border-apple-gray-4/40">
        <a href="#cta" className="inline-flex items-center gap-1 text-sm font-medium text-apple-blue transition-colors hover:text-apple-bluehover">
          Tìm hiểu thêm
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </a>
      </div>
    </article>
  );
};

export default ProductCard;
