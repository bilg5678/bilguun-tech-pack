"use client";
import { useModal } from "@/hook/useModal";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { createPortal } from "react-dom";
import { Shadow } from "@/components/shadow";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, content } = useModal();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
        {isOpen && createPortal(<Shadow>{content}</Shadow>, document.body)}
      </body>
    </html>
  );
}
