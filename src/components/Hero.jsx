import useFadeUp from "../hooks/useFadeUp.js";
import useCountUp from "../hooks/useCountUp.js";
import AppMockup from "./AppMockup.jsx";

const TICKER_ITEMS = [
  "Sinh viên", "Freelancer", "Đại lý nhỏ", "Tiệm spa", "Kho hàng",
  "Shop online", "Startup", "Tiệm nail", "Cửa hàng vật tư", "Shop tài khoản",
  "Doanh nghiệp SME", "Cửa hàng số", "Đại lý phân phối", "Tiệm tạp hoá"
];

// Màu cho từng pill trong ticker
const PILL_STYLES = [
  { background: "#eff6ff", color: "#1d4ed8", dot: "#3b82f6" },
  { background: "#f0fdf4", color: "#15803d", dot: "#22c55e" },
  { background: "#fdf4ff", color: "#9333ea", dot: "#a855f7" },
  { background: "#fff7ed", color: "#c2410c", dot: "#f97316" },
  { background: "#fdf2f8", color: "#be185d", dot: "#ec4899" },
  { background: "#f0f9ff", color: "#0369a1", dot: "#0ea5e9" },
  { background: "#fefce8", color: "#a16207", dot: "#eab308" },
];

const stats = [
  { value: 40, suffix: "+", label: "Dự án đã triển khai" },
  { value: 98, suffix: "%", label: "Khách hàng hài lòng" },
  { value: 24, suffix: "/7", label: "Hỗ trợ kỹ thuật" },
];

const FEATURE_CHIPS = [
  { label: "Tuỳ chỉnh 100%", icon: "✦" },
  { label: "Báo giá rõ ràng", icon: "✦" },
  { label: "Giá minh bạch", icon: "✦" },
  { label: "Triển khai nhanh chóng", icon: "✦" },
  { label: "Bảo trì 12 tháng", icon: "✦" },
];

const HIGHLIGHTS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    title: "Tuỳ chỉnh không giới hạn",
    sub: "Xây từ số 0 theo đúng quy trình của bạn — không ép vào khuôn mẫu sẵn có.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    title: "Giá minh bạch từ đầu",
    sub: "Báo giá rõ ràng ngay từ đầu, hạn chế tối đa chi phí phát sinh.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    title: "Triển khai phát triển nhanh chóng",
    sub: "Quy trình triển khai rõ từng bước, có timeline cụ thể, bàn giao đúng hạn.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "Bảo hành 12 tháng đầu miễn phí",
    sub: "Hỗ trợ kỹ thuật 24/7, vá lỗi miễn phí. Đồng hành dài lâu, không bỏ rơi sau bàn giao.",
  },
];

const StatItem = ({ stat }) => {
  const { ref, count } = useCountUp(stat.value);
  return (
    <div ref={ref}>
      <p className="font-display text-3xl font-semibold tracking-tight text-apple-gray-1 md:text-4xl">
        {count}{stat.suffix}
      </p>
      <p className="mt-1 text-sm text-apple-gray-3">{stat.label}</p>
    </div>
  );
};

const Hero = () => {
  const fade = useFadeUp();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Ticker keyframe — inline để đảm bảo luôn chạy */}
      <style>{`
        @keyframes ticker-loop {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-apple-gray-5 to-white" />
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-apple-blue/5 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-10 -z-10 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl" />

      <div ref={fade.ref} className={`mx-auto max-w-4xl px-6 text-center ${fade.className}`}>

        {/* ── Eyebrow nổi bật ── */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <p
            className="font-display font-black uppercase"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              padding: "0.1em 0",
              background: "linear-gradient(135deg, #0071e3 0%, #5856d6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Từ cá nhân đến doanh nghiệp — giải pháp phù hợp cho mọi giai đoạn phát triển
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: "#86868b" }}>
            Made in Vietnam · Thi công theo yêu cầu · Hỗ trợ tận tâm
          </p>
        </div>

        {/* ── Headline ── */}
        <h1 className="font-display text-hero text-apple-gray-1">
          Không có bản nào{" "}
          <br className="hidden sm:block" />
          <span style={{
            background: "linear-gradient(to right, #0071e3, #a855f7, #5856d6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            giống bản của bạn.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-subtitle text-apple-gray-2">
          Phần mềm có sẵn thường khó đáp ứng đúng quy trình vận hành thực tế.{" "}
          <strong className="font-semibold text-apple-gray-1">TechMin xây dựng hệ thống riêng cho từng doanh nghiệp</strong>,
          tối ưu theo nhu cầu sử dụng, báo giá minh bạch và hỗ trợ dài hạn.
        </p>

        {/* ── Feature chips — căn giữa nội dung ── */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          {FEATURE_CHIPS.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex min-w-[7rem] items-center justify-center gap-2 rounded-full px-5 py-2 text-[12.5px] font-semibold transition-shadow hover:shadow-md"
              style={{
                border: "1.5px solid rgba(0,113,227,0.22)",
                background: "linear-gradient(135deg, rgba(0,113,227,0.05), rgba(88,86,214,0.05))",
                color: "#0071e3",
                boxShadow: "0 1px 4px rgba(0,113,227,0.08)",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#0071e3" className="h-3.5 w-3.5 flex-shrink-0">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
              </svg>
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Ticker marquee — pill màu sắc loop ── */}
      <div
        className="relative mt-12 select-none overflow-hidden"
        style={{ borderTop: "1px solid rgba(210,210,215,0.5)", borderBottom: "1px solid rgba(210,210,215,0.5)", padding: "12px 0" }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            alignItems: "center",
            animation: "ticker-loop 32s linear infinite",
          }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => {
            const s = PILL_STYLES[i % PILL_STYLES.length];
            return (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  margin: "0 5px",
                  padding: "5px 14px",
                  borderRadius: "999px",
                  fontSize: "12.5px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  background: s.background,
                  color: s.color,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                {item}
              </span>
            );
          })}
        </div>
        {/* Gradient edges */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 80, background: "linear-gradient(to right, white, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 80, background: "linear-gradient(to left, white, transparent)", pointerEvents: "none" }} />
      </div>

      {/* Swipe hint */}
      <div className="mx-auto mt-12 flex flex-col items-center gap-2 px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-apple-gray-3">
          Vuốt màn hình khoá bên dưới để trải nghiệm sự khác biệt nghiệp vụ giữa các ngành nghề
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 animate-bounce text-apple-gray-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Interactive app mockup */}
      <div className="mx-auto mt-4 max-w-5xl px-6 md:mt-6 animate-float-slow">
        <AppMockup />
      </div>

      {/* Trust numbers with count-up */}
      <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8 px-6 text-center">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Feature highlights grid — Apple iPad style */}
      <div className="mx-auto mt-16 max-w-5xl px-6">
        <p className="mb-8 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-apple-gray-3">
          Tại sao chọn TechMin
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.title}
              className="group rounded-2xl border border-apple-gray-4/40 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-apple-blue/20"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-apple-blue/8 text-apple-blue transition-colors group-hover:bg-apple-blue group-hover:text-white">
                {h.icon}
              </div>
              <p className="text-sm font-semibold leading-tight text-apple-gray-1">{h.title}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-apple-gray-3">{h.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social proof + CTA strip */}
      <div className="mx-auto mt-14 max-w-2xl px-6 text-center">
        {/* Overlapping avatars */}
        <div className="mb-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <div className="flex -space-x-2.5">
            {[32, 25, 11, 52, 47].map((id) => (
              <img
                key={id}
                src={`https://i.pravatar.cc/40?img=${id}`}
                alt="khách hàng"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
                style={{ boxShadow: "0 0 0 2.5px #ffffff" }}
              />
            ))}
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: "#0071e3", boxShadow: "0 0 0 2.5px #ffffff" }}
            >
              40+
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f59e0b" className="h-3.5 w-3.5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-[#6e6e73]">
              <strong className="text-[#1d1d1f]">4.9/5</strong> · 40+ doanh nghiệp tin dùng
            </span>
          </div>
        </div>
        <p className="text-sm text-[#6e6e73]">
          Đã có hơn{" "}
          <strong className="font-semibold text-[#1d1d1f]">40 doanh nghiệp</strong>{" "}
          tin dùng —{" "}
          <a href="#cta" className="font-semibold underline-offset-2 hover:underline" style={{ color: "#0071e3" }}>
            tư vấn miễn phí ngay hôm nay.
          </a>
        </p>
      </div>
    </section>
  );
};

export default Hero;
