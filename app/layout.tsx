import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio — Digital Product Engineering",
  description: "High-end personal & studio web application built with Next.js, Framer Motion, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0A0A0A] text-[#F2F1ED] antialiased selection:bg-[#7C8CFF] selection:text-[#0A0A0A]">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}