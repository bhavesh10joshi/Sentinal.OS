/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aegis Core Design System tokens
        "primary":                  "#0059b5",
        "primary-container":        "#0071e3",
        "on-primary":               "#ffffff",
        "on-primary-container":     "#fcfbff",
        "primary-fixed":            "#d7e2ff",
        "primary-fixed-dim":        "#abc7ff",
        "on-primary-fixed":         "#001b3f",
        "on-primary-fixed-variant": "#00458f",

        "secondary":                "#5f5e60",
        "secondary-container":      "#e2dfe1",
        "on-secondary":             "#ffffff",
        "on-secondary-container":   "#636264",
        "secondary-fixed":          "#e4e2e4",
        "secondary-fixed-dim":      "#c8c6c8",
        "on-secondary-fixed":       "#1b1b1d",
        "on-secondary-fixed-variant":"#474649",

        "tertiary":                 "#5a5b5d",
        "tertiary-container":       "#727476",
        "on-tertiary":              "#ffffff",
        "on-tertiary-container":    "#fbfbfd",
        "tertiary-fixed":           "#e2e2e4",
        "tertiary-fixed-dim":       "#c6c6c8",
        "on-tertiary-fixed":        "#1a1c1d",
        "on-tertiary-fixed-variant":"#454749",

        "surface":                  "#faf8fe",
        "surface-dim":              "#dad9df",
        "surface-bright":           "#faf8fe",
        "surface-container-lowest": "#ffffff",
        "surface-container-low":    "#f4f3f8",
        "surface-container":        "#eeedf3",
        "surface-container-high":   "#e9e7ed",
        "surface-container-highest":"#e3e2e7",
        "surface-tint":             "#005cbb",
        "surface-variant":          "#e3e2e7",

        "on-surface":               "#1a1b1f",
        "on-surface-variant":       "#414753",
        "on-background":            "#1a1b1f",
        "background":               "#faf8fe",

        "outline":                  "#717785",
        "outline-variant":          "#c1c6d6",

        "inverse-surface":          "#2f3034",
        "inverse-on-surface":       "#f1f0f5",
        "inverse-primary":          "#abc7ff",

        "error":                    "#ba1a1a",
        "error-container":          "#ffdad6",
        "on-error":                 "#ffffff",
        "on-error-container":       "#93000a",

        // Semantic extras
        "success":                  "#1a7f45",
        "success-container":        "#d4f5e0",
        "warning":                  "#9b6100",
        "warning-container":        "#ffe7b3",
      },
      fontFamily: {
        sans:     ["Inter", "sans-serif"],
        headline: ["Inter", "sans-serif"],
        display:  ["Inter", "sans-serif"],
        body:     ["Inter", "sans-serif"],
        label:    ["Inter", "sans-serif"],
        mono:     ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm:      "0.25rem",
        md:      "0.75rem",
        lg:      "1rem",
        xl:      "1.5rem",
        full:    "9999px",
      },
      backdropBlur: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
      },
      animation: {
        "pulse-ring":  "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "scan":        "scan 4s linear infinite",
        "blink":       "blink 1s step-end infinite",
        "float":       "float 6s ease-in-out infinite",
        "fade-in":     "fadeIn 0.5s ease forwards",
        "slide-right": "slideRight 0.4s ease forwards",
      },
      keyframes: {
        "pulse-ring": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":       { opacity: "0.5", transform: "scale(1.15)" },
        },
        scan: {
          "0%":   { top: "-10%" },
          "100%": { top: "110%" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":       { transform: "translateY(-8px)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
      },
      boxShadow: {
        glass:    "0 4px 30px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)",
        "glass-lg":"0 20px 40px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
        "glow-blue":"0 0 20px rgba(0,89,181,0.25)",
      },
    },
  },
  plugins: [],
}
