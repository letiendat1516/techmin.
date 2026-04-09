import SectionHeading from "./SectionHeading.jsx";
import { services } from "../data/landingContent.js";
import useFadeUp from "../hooks/useFadeUp.js";

const serviceIcons = [
  /* Code bracket */
  <svg
    key="code"
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
      d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
    />
  </svg>,
  /* Chart bars */
  <svg
    key="chart"
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
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    />
  </svg>,
  /* Puzzle */
  <svg
    key="puzzle"
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
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>,
];

const Services = () => {
  const fade = useFadeUp();

  return (
    <section id="services" className="py-14 md:py-20">
      <div
        ref={fade.ref}
        className={`mx-auto max-w-6xl px-6 ${fade.className}`}
      >
        <SectionHeading
          eyebrow="Dịch vụ"
          title="Không phải thuê từng tháng."
          highlight="Mua 1 lần dùng mãi mãi."
          description="Mỗi hệ thống được xây từ đầu, đúng theo quy trình thực tế của bạn — không ép khuôn, không tính năng thừa."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {services.map((service, i) => (
            <article
              key={service.title}
              className="group rounded-2xl bg-white p-8 shadow-[0_2px_8px_0_rgba(0,0,0,0.07)] ring-1 ring-black/[0.06] transition-shadow duration-300 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-apple-gray-5 text-apple-gray-2 transition-colors duration-300 group-hover:bg-apple-blue group-hover:text-white">
                {serviceIcons[i]}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-apple-gray-1">
                {service.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-apple-gray-2">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

