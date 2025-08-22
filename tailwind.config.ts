import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // ألوان بنفسجية تتماشى مع الصورة المرفقة
        sage: {
          50: "#faf7ff",
          100: "#f3ecff",
          200: "#e9dcff",
          300: "#d6c1ff",
          400: "#bc97ff",
          500: "#a16dff",
          600: "#8b44ff",
          700: "#7c2dff",
          800: "#6b25d1",
          900: "#5a21a8",
          950: "#3b1374",
        },
        mint: {
          50: "#faf7ff",
          100: "#f3ecff",
          200: "#e9dcff",
          300: "#d6c1ff",
          400: "#bc97ff",
          500: "#a16dff",
          600: "#8b44ff",
          700: "#7c2dff",
          800: "#6b25d1",
          900: "#5a21a8",
          950: "#3b1374",
        },
        purple: {
          50: "#faf7ff",
          100: "#f3ecff",
          200: "#e9dcff",
          300: "#d6c1ff",
          400: "#bc97ff",
          500: "#a16dff",
          600: "#8b44ff",
          700: "#7c2dff",
          800: "#6b25d1",
          900: "#5a21a8",
          950: "#3b1374",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "scale-up-down": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s infinite linear",
        "spin-slow": "spin-slow 12s linear infinite",
        "bounce-gentle": "bounce-gentle 5s ease-in-out infinite",
        "pulse-gentle": "pulse-gentle 3s ease-in-out infinite",
        "scale-up-down": "scale-up-down 7s ease-in-out infinite",
      },
      fontFamily: {
        almarai: ["var(--font-almarai)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-dots": "radial-gradient(circle, currentColor 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
