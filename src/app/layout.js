import "./globals.css";

export const metadata = {
  title: "Chattogram Trails — Explore Sitakunda & Mirsarai",
  description:
    "Discover real-time travel conditions, trails, waterfalls, hilltops, and eco-parks across the Sitakunda–Mirsarai corridor of Chattogram, Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
