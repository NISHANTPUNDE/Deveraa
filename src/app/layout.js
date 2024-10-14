import localFont from "next/font/local";
import "./globals.css";
import Topbar from "@/components/topbar";
import AdSense from "@/components/AdSense";
import { Toaster } from "@/components/ui/toaster"
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "learnwithdeveloper"
  },
  description: "A blog about learning and teaching",
  facebook: {
    siteName: "learnwithdeveloper",
    url: "https://learnwithdeveloper.com",
    type: "website",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/_next/static/media/deveraa.31c8d42c.png`,
  },
  twitter: {
    handle: "@learnwithdeveloper",
    site: "@learnwithdeveloper",
    cardType: "summary_large_image",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learnwithdeveloper.com",
    siteName: "learnwithdeveloper",
    title: "learnwithdeveloper",
    description: "A blog about learning and teaching",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/_next/static/media/deveraa.31c8d42c.png`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <AdSense pId="ca-pub-5901668124190040" />
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Deveraa" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mb-20">
          <Topbar />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
