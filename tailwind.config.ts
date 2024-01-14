import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: "#961A88",
        cosmicLight: "#EEE1F0",
        classic: "#191978",
        classicLight: "#E9EEF6",
        atomic: "#00AEB1",
        atomicLight: "#EAF9F7",
      },
      fontFamily: {
        nova: ["Ibarra Real Nova", "serif"],
      }
    },
    plugins: [],
  }
}
export default config
