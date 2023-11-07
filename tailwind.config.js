/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-to-b':
                    'linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);',
            },
        },
        screens:{
            sm: '480px',
            md: '768px',
            lg: '976px',
      xl: '1440px',
        },
    },
    plugins: [
        require('tailwindcss-textshadow'),
        require('tailwind-scrollbar-hide'),
        require('tailwind-scrollbar'),
        require('tailwindcss-textshadow'),
    ],
}

