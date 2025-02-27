// app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import localFont from 'next/font/local'
import { Marcellus } from 'next/font/google'

const calFont = localFont({
  src: '../fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal',
})

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marcellus',
})

export const metadata = {
  title: "Dry Day",
  description: "Check if today is a dry day in Kerala.",
  openGraph: {
    title: "Dry Day",
    description: "Check if today is a dry day in Kerala.",
    images: [{ url: "/og-image.png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${calFont.variable} ${marcellus.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}