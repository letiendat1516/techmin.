import useFadeUp from "../hooks/useFadeUp.js";

const TESTIMONIALS = [
  {
    avatar: "https://i.pravatar.cc/80?img=32",
    name: "Nguyễn Minh Tuấn",
    role: "Chủ chuỗi Spa Beauty House",
    industry: "Spa & Làm đẹp",
    stars: 5,
    quote:
      "Trước đây mình quản lý lịch hẹn bằng sổ tay, mỗi tháng mất 2–3 ngày đối soát công nợ. Sau khi có hệ thống riêng của TechMin, mọi thứ rõ ràng chỉ trong vài cú nhấp. Khách hàng cũng cảm nhận được sự chuyên nghiệp hơn hẳn.",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=25",
    name: "Trần Thị Bích Ngọc",
    role: "Đại lý vật tư xây dựng Ngọc Phát",
    industry: "Phân phối & Kho",
    stars: 5,
    quote:
      "Mình cần theo dõi công nợ hàng chục đại lý cùng lúc và quản lý kho vật liệu — không có phần mềm chung nào làm tốt cả hai. TechMin xây đúng thứ mình cần, bàn giao chỉ trong 3 tuần.",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=11",
    name: "Lê Hoàng Khải",
    role: "Chủ shop tài khoản số TKNum",
    industry: "Thương mại số",
    stars: 5,
    quote:
      "Hệ thống tự giao file sau thanh toán, theo dõi hạn sử dụng từng tài khoản, cảnh báo sắp hết hạn — đúng những thứ shop tài khoản cần mà không phần mềm có sẵn nào làm được. Team hỗ trợ rất nhiệt tình.",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=52",
    name: "Phạm Văn Đức",
    role: "Nhà thầu Đức Phát Construction",
    industry: "Xây dựng",
    stars: 5,
    quote:
      "Báo giá công trình, theo dõi tiến độ, quản lý vật tư thi công — giờ làm hết trên điện thoại. So với Excel trước đây, tiết kiệm cả tiếng mỗi ngày và không còn nhầm số nữa.",
  },
];

const PROOF_AVATARS = [32, 25, 11, 52, 47];

const Stars = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f59e0b" className="h-3.5 w-3.5">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
      </svg>
    ))}
  </div>
);

const QuoteIcon = () => (
  <svg className="h-8 w-8 opacity-10" fill="#0071e3" viewBox="0 0 32 32">
    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
  </svg>
);

const Testimonials = () => {
  const fade = useFadeUp();

  return (
    <section className="bg-[#f5f5f7] py-20 md:py-28">
      <div ref={fade.ref} className={`mx-auto max-w-6xl px-6 ${fade.className}`}>

        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: "#0071e3" }}>
            Khách hàng thực tế
          </p>

          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: "#1d1d1f",
            }}
          >
            Hơn 40 doanh nghiệp
            <br />
            <span style={{
              background: "linear-gradient(to right, #0071e3, #5856d6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              đã tin. Và hài lòng.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed" style={{ color: "#6e6e73" }}>
            Từ spa, kho hàng, shop số đến nhà thầu xây dựng —
            mỗi hệ thống được xây riêng, không có bản nào giống bản nào.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ border: "1px solid rgba(210,210,215,0.4)" }}
            >
              {/* Top row: stars + tag */}
              <div className="flex items-center justify-between">
                <Stars count={t.stars} />
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-semibold"
                  style={{ backgroundColor: "rgba(0,113,227,0.08)", color: "#0071e3" }}
                >
                  {t.industry}
                </span>
              </div>

              {/* Quote */}
              <div className="relative flex-1">
                <QuoteIcon />
                <p className="mt-1 text-[13.5px] leading-relaxed text-[#6e6e73] italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Avatar + name */}
              <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: "rgba(210,210,215,0.4)" }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                  style={{ boxShadow: "0 0 0 2px rgba(210,210,215,0.5)" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback avatar */}
                <div
                  className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: "#0071e3" }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1d1d1f]">{t.name}</p>
                  <p className="text-[11.5px] text-[#86868b]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom social proof strip */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <div className="flex -space-x-2">
            {PROOF_AVATARS.map((id) => (
              <img
                key={id}
                src={`https://i.pravatar.cc/40?img=${id}`}
                alt="khách hàng"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
                style={{ boxShadow: "0 0 0 2px #ffffff" }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f59e0b" className="h-4 w-4">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-[#6e6e73]">
              <strong className="text-[#1d1d1f]">4.9 / 5</strong>
              {" "}· 40+ khách hàng hài lòng
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

