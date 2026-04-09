import SectionHeading from "./SectionHeading.jsx";
import { benefits } from "../data/landingContent.js";
import useFadeUp from "../hooks/useFadeUp.js";

const benefitIcons = [
  /* Clock */
  <svg
    key="clock"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>,
  /* Shield */
  <svg
    key="shield"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
    />
  </svg>,
  /* Bolt */
  <svg
    key="bolt"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
    />
  </svg>,
];

const Benefits = () => {
  const fade = useFadeUp();

  return (
    <section id="benefits" className="bg-apple-gray-5/50 py-14 md:py-20">
      <div
        ref={fade.ref}
        className={`mx-auto max-w-6xl px-6 ${fade.className}`}
      >
        <SectionHeading
          eyebrow="Lợi ích"
          title="Hệ thống vận hành ổn định,"
          highlight="giúp bạn kiểm soát toàn bộ quy trình trên một nền tảng duy nhất."
          description="Tiết kiệm hàng giờ mỗi ngày, loại bỏ sai sót thủ công và kiểm soát toàn bộ nghiệp vụ ngay trên một màn hình."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {benefits.map((benefit, i) => (
            <article
              key={benefit.title}
              className="group rounded-2xl bg-white p-8 shadow-[0_2px_12px_0_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.14)] hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-apple-gray-5 text-apple-gray-2 transition-colors duration-300 group-hover:bg-apple-blue group-hover:text-white">
                {benefitIcons[i]}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-apple-gray-1">
                {benefit.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-apple-gray-2">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
