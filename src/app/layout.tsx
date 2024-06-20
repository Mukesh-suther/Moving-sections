import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./css/style.css"
import "./css/plugins.css"
import "./css/reset.css"
import Script from "next/script";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
 {

  return (
    <html lang="en">
      <body className={inter.className}>  
      {children}
      </body>
      <Script src="/js/jquery.min.js"/>
      <Script src="/js/plugins.js"/>
      <Script src="/js/scripts.js"/>
    </html>
  );
}