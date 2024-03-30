
/** @type {import('tailwindcss').Config} */

export const tailwindConfig = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        colors: {
            pichlaRang: "rgb(var(--rang-pichla) / <alpha-value>)",
            pehlaRang: "rgb(var(--rang-pehla) / <alpha-value>)",
            doojaRang: "rgb(var(--rang-dooja) / <alpha-value>)",
            silverRang: "rgb(var(--rang-silver) / <alpha-value>)",
            baakiRang: {
                1: "rgb(var(--rang-baaki1) / <alpha-value>)",
                2: "rgb(var(--rang-baaki2) / <alpha-value>)",
            },
        },
        screens: {
            sm: "641px",

            md: "769px",

            lg: "1025px",

            xl: "1281px",

            "2xl": "1537px",
        },
        extend: {},
    },
    plugins: [],
};

