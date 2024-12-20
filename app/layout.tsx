import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

import { frFR } from "@clerk/localizations";
import "./globals.css";
import LeftSidebar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Intranet",
    description: "",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider localization={frFR}>
            <html lang="fr">
                <body
                    className={`${inter.className} flex flex-col bg-muted/40`}
                >
                    <SignedIn>
                        <TopBar />
                    </SignedIn>
                    <main className="flex flex-row">
                        <SignedIn>
                            <LeftSidebar />
                        </SignedIn>

                        <section className="main-container w-full p-8">
                            {children}
                            <Toaster />
                        </section>
                    </main>
                </body>
            </html>
        </ClerkProvider>
    );
}
