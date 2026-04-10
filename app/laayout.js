import "./globals.css";

export const metadata = {
    title: "Weather Insight App",
    description: "Weather-based travel, risk, and activity suggestions",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}