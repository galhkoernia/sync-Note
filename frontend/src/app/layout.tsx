import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "SyncNote is a modern collaborative note-taking workspace designed to organize ideas, manage documents, and support seamless teamwork.";

export const metadata: Metadata = {
  metadataBase: new URL("https://syncnote.web.id"),
  title: {
    default: "SyncNote",
    template: "%s | SyncNote",
  },
  description,
  applicationName: "SyncNote",
  // The root route currently renders a local demo workspace, not a public page.
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    siteName: "SyncNote",
    title: "SyncNote",
    description,
    url: "https://syncnote.web.id",
  },
  twitter: {
    card: "summary",
    title: "SyncNote",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
