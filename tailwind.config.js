/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: [
          "SF Pro Display", "Inter", "system-ui", "-apple-system",
          "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"
        ],
        body: [
          "SF Pro Text", "Inter", "system-ui", "-apple-system",
          "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"
        ]
      },
      fontSize: {
        hero: ["clamp(2.75rem, 5vw, 4.5rem)", { lineHeight: "1.08", letterSpacing: "-0.035em", fontWeight: "600" }],
        section: ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "600" }],
        subtitle: ["clamp(1.125rem, 2vw, 1.375rem)", { lineHeight: "1.5", fontWeight: "400" }],
      },
      colors: {
        apple: {
          blue: "#0071e3",
          bluehover: "#0077ed",
          gray: {
            1: "#1d1d1f",
            2: "#6e6e73",
            3: "#86868b",
            4: "#d2d2d7",
            5: "#f5f5f7",
            6: "#fbfbfd",
          }
        }
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slide-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" }
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1deg)" }
        },
        "app-open": {
          "0%":   { opacity: "0", transform: "scale(0.2)"  },
          "60%":  { opacity: "1", transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1.0)"  }
        },
        "app-close": {
          "0%":   { opacity: "1", transform: "scale(1.0)"  },
          "25%":  { opacity: "0.7", transform: "scale(1.04)" },
          "100%": { opacity: "0", transform: "scale(0.2)"  }
        },
        "icon-launch": {
          "0%":   { transform: "scale(1) translateY(0)" },
          "30%":  { transform: "scale(1.4) translateY(-6px)" },
          "55%":  { transform: "scale(1.15) translateY(-3px)" },
          "75%":  { transform: "scale(1.25) translateY(-4px)" },
          "100%": { transform: "scale(1) translateY(0)" }
        },
        "form-slide": {
          "0%":   { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "icon-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "35%":      { transform: "translateY(-14px)" },
          "65%":      { transform: "translateY(-6px)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-up": "slide-in-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee 28s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "app-open":    "app-open  0.25s ease-out forwards",
        "app-close":   "app-close 0.2s  ease-in  forwards",
        "form-slide":  "form-slide 0.22s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "icon-bounce": "icon-bounce 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
        "icon-launch": "icon-launch 0.32s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards"
      }
    }
  },
  plugins: []
};
