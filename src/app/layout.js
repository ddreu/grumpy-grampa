import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Grumpy Grampa",
  description: "Grumpy Grampa",
  icons: {
    icon: "/Black_Logo_Mark.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>{children}</CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
            },
            className: "shadow-lg border border-neutral-800",
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
