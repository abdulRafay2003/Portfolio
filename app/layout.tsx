import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import favicon from "@/app/favicon.ico";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Software Engineer Portfolio",
  description:
    "Professional portfolio showcasing software engineering projects and experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href={favicon.src} type="image/x-icon" />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
