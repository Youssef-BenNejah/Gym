/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gym: {
          primary: '#2563eb',   // 🔵 Bleu moderne (principal)
          secondary: '#0f172a', // ⚫ Gris anthracite (sidebar / fond)
          accent: '#facc15',    // 🟡 Jaune dynamique
          light: '#f8fafc',     // ⚪ Fond clair
        },
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0,0,0,0.05)',
        'card': '0 4px 12px rgba(37,99,235,0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-in-out',
        slideIn: 'slideIn 0.5s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // pour shadcn/ui
    require('@tailwindcss/forms'),   // styliser les <input> & <form>
    require('@tailwindcss/typography'),
  ],
}
