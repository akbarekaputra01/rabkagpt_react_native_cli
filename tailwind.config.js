/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './App.{js,jsx,ts,tsx}',
        './_App.{js,jsx,ts,tsx}',
        './src/screens/**/*.{js,jsx,ts,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primaryColor: '#FEAD1E',
                secondaryColor: '#315B73',

                primaryColor50: '#FEAC1E7C',
                secondaryColor50: '#315B737C',
            },
        },
    },
    plugins: [],
};