import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberStation — One Partner, One Cybersecurity",
  description:
    "CyberStation turns assessment, hardening, managed SOC, compliance and training into a visible operating system for security leaders — with a live scope, a transparent estimate and board-ready proof.",
};

export const viewport: Viewport = {
  themeColor: "#04070f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
