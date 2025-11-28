import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import AdminTopbar from "@/components/AdminTopbar";

export const metadata = {
    title: "Admin Panel - Deveraa",
    description: "Admin panel for managing the blog",
};

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Deveraa" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body >
                <AdminTopbar />
                {children}
                <Toaster />
            </body>
        </html>
    );
}
