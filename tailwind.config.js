/* eslint-disable no-dupe-keys */
// const disabledCss = {
//   "code::before": false,
//   "code::after": false,
//   pre: false,
//   code: false,
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        // Modal
        overlayShow: {
          from: {opacity: "0"},
          to: {opacity: "1"},
        },
        overlayHide: {
          from: {opacity: "1"},
          to: {opacity: "0"},
        },
        contentShow: {
          from: {opacity: "0", transform: "translate(-50%, -50%) scale(0.95)"},
          to: {opacity: "1", transform: "translate(-50%, -50%) scale(1)"},
        },
        contentHide: {
          from: {opacity: "1", transform: "translate(-50%, -50%) scale(1)"},
          to: {opacity: "0", transform: "translate(-50%, -50%) scale(0.95)"},
        },
        // Dropdown menu
        "scale-in": {
          "0%": {opacity: 0, transform: "scale(0)"},
          "100%": {opacity: 1, transform: "scale(1)"},
        },
        "slide-down": {
          "0%": {opacity: 0, transform: "translateY(-10px)"},
          "100%": {opacity: 1, transform: "translateY(0)"},
        },
        "slide-up": {
          "0%": {opacity: 0, transform: "translateY(10px)"},
          "100%": {opacity: 1, transform: "translateY(0)"},
        },
        // Tooltip
        "slide-up-fade": {
          "0%": {opacity: 0, transform: "translateY(2px)"},
          "100%": {opacity: 1, transform: "translateY(0)"},
        },
        "slide-right-fade": {
          "0%": {opacity: 0, transform: "translateX(-2px)"},
          "100%": {opacity: 1, transform: "translateX(0)"},
        },
        "slide-down-fade": {
          "0%": {opacity: 0, transform: "translateY(-2px)"},
          "100%": {opacity: 1, transform: "translateY(0)"},
        },
        "slide-left-fade": {
          "0%": {opacity: 0, transform: "translateX(2px)"},
          "100%": {opacity: 1, transform: "translateX(0)"},
        },
      },
      animation: {
        // Dropdown menu
        "scale-in": "scale-in 0.2s ease-in-out",
        "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-right-fade": "slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-left-fade": "slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        // Modal
        overlayShow: "overlayShow 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayHide: "overlayHide 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentHide: "contentHide 200ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-radix")],
};
