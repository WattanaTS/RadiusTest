module.exports = {
    mode: 'jit',
    important: true,
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    presets: [require('./app.presets.js')],
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}