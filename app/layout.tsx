import type { Metadata } from "next";
import "./globals.css";

// Using system fonts for better performance and offline support
// Can be replaced with Google Fonts if needed

export const metadata: Metadata = {
  title: "SUNO.WTF — Har Scene Ka Ek Gaana Hai",
  description: "Every scene has a song. Enter the room.",
  openGraph: {
    title: "SUNO.WTF",
    description: "Every scene has a song. Enter the room.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUNO.WTF",
    description: "Every scene has a song. Enter the room.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
