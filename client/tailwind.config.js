/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
    theme: {
        extend: {
            colors: {
                mainBackground: "#06141D",
                cardBackground: "#1A2730",
                searchBarBackground: "#27343E",
                like: "#F2506D",
                reTweet: "#46D1A6",
                comment: "#5398FF",
                text: "#D2DADD",
                gray: {
                    hashtag: "#62707C",
                    border: "rgba(98, 112, 124, 0.25)"
                },
                link: "#21A2F1",
            }
        },
        borderRadius: {
            card: "20px",
            full: "9999px",
            "2xl": "1rem",
        }
    },
    plugins: [],
}

