import SectionHeading from "./SectionHeading.jsx";
import { processSteps } from "../data/landingContent.js";
import useFadeUp from "../hooks/useFadeUp.js";

const Process = () => {
  const fade = useFadeUp();

  return (
    <section id="process" className="py-14 md:py-20">
      <div ref={fade.ref} className={`mx-auto max-w-6xl px-6 ${fade.className}`}>
        <SectionHeading
          eyebrow="Quy trình"
          title="Rõ ràng từng bước."
          highlight="Bạn không bao giờ bị bỏ lại."
          description="Từ cuộc gọi đầu tiên đến khi hệ thống chạy — bạn luôn biết đang ở đâu và tiếp theo là gì."
        />

        <div className="relative mt-16">
          {/* Connection line */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-apple-gray-4 md:block" />

          <div className="grid gap-8 md:grid-cols-5">
            {processSteps.map((step, i) => (
              <div key={step.label} className="group relative text-center">
                {/* Step dot */}
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] transition-all duration-300 group-hover:shadow-[0_8px_25px_-8px_rgba(0,113,227,0.3)] group-hover:ring-apple-blue/30">
                  <span className="font-display text-lg font-semibold text-apple-gray-3 transition-colors duration-300 group-hover:text-apple-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-apple-gray-1">
                  {step.label}
                </h3>
                <p className="mt-1 text-xs text-apple-gray-3">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
