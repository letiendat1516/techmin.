import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Process from "./components/Process.jsx";
import Benefits from "./components/Benefits.jsx";
import Testimonials from "./components/Testimonials.jsx";
import CTASection from "./components/CTASection.jsx";
import Footer from "./components/Footer.jsx";

const ZaloBubble = () => (
  <a
    href="https://zalo.me/0901234567"
    target="_blank"
    rel="noopener noreferrer"
    title="Chat Zalo với TechMin"
    className="group fixed bottom-6 right-6 z-50 flex items-center gap-2.5"
  >
    {/* Tooltip */}
    <span className="pointer-events-none invisible max-w-[140px] rounded-xl bg-gray-900/90 px-3 py-1.5 text-[11.5px] font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:opacity-100">
      Nhắn Zalo ngay
    </span>
    {/* Bubble */}
    <div
      className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,120,240,0.4)] transition-transform duration-200 group-hover:scale-110 overflow-hidden bg-white"
    >
      {/* Ping ring */}
      <span className="absolute inset-0 animate-ping rounded-full opacity-20" style={{ background: "#0068ff" }} />
      <img src="/zalo-logo.jpg" alt="Zalo" className="relative h-10 w-10 rounded-full object-cover" />
    </div>
  </a>
);

const App = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Benefits />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <ZaloBubble />
    </div>
  );
};

export default App;
