import localFont from "next/font/local";
import "../globals.css";
import Topbar from "@/components/topbar";
import AdSense from "@/components/AdSense";
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "Deveraa"
  },
  description: "A blog about learning and teaching",
  manifest: "/manifest.json",
  keywords: ["json viewer", "technology", "web application"],
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  facebook: {
    siteName: "Deveraa",
    url: "https://blog.deveraa.com",
    type: "website",
    image: "https://blog.deveraa.com/_next/static/media/deveraa.31c8d42c.png",
  },
  twitter: {
    handle: "@Deveraa",
    site: "@Deveraa",
    cardType: "summary_large_image",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog.deveraa.com",
    siteName: "Deveraa",
    title: "Deveraa",
    description: "A blog about learning and teaching",
    image: "https://blog.deveraa.com/_next/static/media/deveraa.31c8d42c.png",
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
	<meta name="google-adsense-account" content="ca-pub-4558399330681578" />
        <meta property="og:image" content="https://blog.deveraa.com/_next/static/media/deveraa.31c8d42c.png" />
        <meta property="og:image:type" content="png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div >
          <Topbar />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
