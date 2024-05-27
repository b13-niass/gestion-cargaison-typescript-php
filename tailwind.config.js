/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

module.exports = {
  content: ["./public/**/*.{html,js,php}", "./templates/**/*.{html,js,php}"],
  theme: {
    extend: {},
  },
  plugins: [
      daisyui,
  ],
}

