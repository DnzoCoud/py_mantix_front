import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Tailwind from "primereact/passthrough/tailwind";
import { PrimeReactProvider } from "primereact/api";
import "@/app/globals.css";
import useThemeStore from "@/stores/themeStore";
import "primeicons/primeicons.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import ReduxProviders from "@/redux/providers";
import Head from "next/head";

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
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <html lang="es">
        <body className="transition-all ">
          <div id="app" className={inter.className}>
            <ReduxProviders>
              <SessionAuthProvider>{children}</SessionAuthProvider>
            </ReduxProviders>
          </div>
        </body>
      </html>
    </PrimeReactProvider>
  );
}
