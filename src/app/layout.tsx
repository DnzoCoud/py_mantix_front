import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mantix Pro",
  description: "Mantix Pro App",
};
import "@/app/globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <div id="app" className={inter.className}>
          {children}
        </div>
      </body>
    </html>
  );
}
