/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: '#328E6E',
                secondary: '#67AE6E',
                soft: '#90C67C',
                light: '#E1EEBC',
            },
        },
    },
    plugins: [],
};
