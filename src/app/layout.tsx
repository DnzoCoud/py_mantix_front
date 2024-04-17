import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Tailwind from "primereact/passthrough/tailwind";
import { PrimeReactProvider } from "primereact/api";
import "@/app/globals.css";
import useThemeStore from "@/stores/themeStore";
import "primeicons/primeicons.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mantix Pro",
  description: "Mantix Pro App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrimeReactProvider value={{ unstyled: false, pt: Tailwind }}>
      <html lang="es">
        <body className="transition-all ">
          <div id="app" className={inter.className}>
            {children}
          </div>
        </body>
      </html>
    </PrimeReactProvider>
  );
}
