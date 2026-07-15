/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Class-based dark mode — toggled by adding 'dark' class to <html>
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Aegis Core Design System — Light mode tokens
        "primary":                  "var(--color-primary)",
        "primary-container":        "var(--color-primary-container)",
        "on-primary":               "var(--color-on-primary)",
        "on-primary-container":     "var(--color-on-primary-container)",
        "primary-fixed":            "var(--color-primary-fixed)",
        "primary-fixed-dim":        "var(--color-primary-fixed-dim)",
        "on-primary-fixed":         "var(--color-on-primary-fixed)",
        "on-primary-fixed-variant": "var(--color-on-primary-fixed-variant)",

        "secondary":                "var(--color-secondary)",
        "secondary-container":      "var(--color-secondary-container)",
        "on-secondary":             "var(--color-on-secondary)",
        "on-secondary-container":   "var(--color-on-secondary-container)",

        "tertiary":                 "var(--color-tertiary)",
        "tertiary-container":       "var(--color-tertiary-container)",
        "on-tertiary":              "var(--color-on-tertiary)",
        "on-tertiary-container":    "var(--color-on-tertiary-container)",

        "surface":                  "var(--color-surface)",
        "surface-dim":              "var(--color-surface-dim)",
        "surface-bright":           "var(--color-surface-bright)",
        "surface-container-lowest": "var(--color-surface-container-lowest)",
        "surface-container-low":    "var(--color-surface-container-low)",
        "surface-container":        "var(--color-surface-container)",
        "surface-container-high":   "var(--color-surface-container-high)",
        "surface-container-highest":"var(--color-surface-container-highest)",
        "surface-variant":          "var(--color-surface-variant)",
        "surface-tint":             "var(--color-surface-tint)",

        "on-surface":               "var(--color-on-surface)",
        "on-surface-variant":       "var(--color-on-surface-variant)",
        "on-background":            "var(--color-on-background)",
        "background":               "var(--color-background)",

        "outline":                  "var(--color-outline)",
        "outline-variant":          "var(--color-outline-variant)",

        "inverse-surface":          "var(--color-inverse-surface)",
        "inverse-on-surface":       "var(--color-inverse-on-surface)",
        "inverse-primary":          "var(--color-inverse-primary)",

        "error":                    "var(--color-error)",
        "error-container":          "var(--color-error-container)",
        "on-error":                 "var(--color-on-error)",
        "on-error-container":       "var(--color-on-error-container)",

        // Semantic extras
        "success":                  "var(--color-success)",
        "success-container":        "var(--color-success-container)",
        "warning":                  "var(--color-warning)",
        "warning-container":        "var(--color-warning-container)",
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
