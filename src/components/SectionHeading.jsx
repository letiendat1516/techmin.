const SectionHeading = ({ eyebrow, title, highlight, description }) => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-apple-blue">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-section text-apple-gray-1">
        {title}
        {highlight && (
          <>
            {" "}
            <span style={{
              background: "linear-gradient(to right, #0071e3, #5856d6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {highlight}
            </span>
          </>
        )}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-apple-gray-2">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
