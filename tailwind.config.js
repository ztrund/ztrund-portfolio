/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'text': 'hsl(0, 0%, 100%)',
                'background': 'hsl(0, 0%, 10%)',
                'background-lighter': 'hsl(0, 0%, 20%)',
                'background-lightest': 'hsl(0, 0%, 30%)',
                'primary-button': 'hsl(74, 63%, 46%)',
                'primary-button-lighten': 'hsl(74, 63%, 56%)',
                'primary-button-darken': 'hsl(74, 63%, 36%)',
                'secondary-button': 'hsl(0, 0%, 100%)',
                'accent': 'hsl(254, 63%, 46%)',

            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}
