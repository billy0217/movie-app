/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      fontFamily:{
        'serif': ['Quicksand', 'sans-serif'],
        'display': ['Quicksand', 'sans-serif'],
        'body': ['Quicksand', 'sans-serif'],
      },
      spacing: {
        '7': '1.875rem',
      },
      colors: {
        martin: {
          lighter: '#a8a1ac',
          lighten: '#e7edef',
          light: '#edf5f7',
          lightGray: '#999',
          gray: '#948a99',
          purple: '#9352b3',
          yellow: '#ffc741',
          darkGray: '#212529',
          darkBlue: '#3e4555',
        }
      }
    }
  },
  plugins: [],
}

