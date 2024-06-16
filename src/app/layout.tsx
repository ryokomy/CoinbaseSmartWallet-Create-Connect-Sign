import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import Head from "next/head";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Komy: Coinbase Smart Wallet",
  description:
    "Coinbase Smart Wallet Create-Connect-Sign created by Komy | Kyuzan",
  twitter: {
    title: "Komy: Coinbase Smart Wallet",
    description:
      "Coinbase Smart Wallet Create-Connect-Sign created by Komy | Kyuzan",
    images:
      "https://coinbase-smart-wallet-create-connect-sign.vercel.app/ogp.png",
  },
  openGraph: {
    title: "Komy: Coinbase Smart Wallet",
    description:
      "Coinbase Smart Wallet Create-Connect-Sign created by Komy | Kyuzan",
    images:
      "https://coinbase-smart-wallet-create-connect-sign.vercel.app/ogp.png",
  },
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <body className={inter.className}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
