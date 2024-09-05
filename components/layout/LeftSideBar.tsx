"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Gauge, QrCode, Calendar } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export default function LeftSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex w-64 flex-col border-r bg-background leftSideBar">
            <ScrollArea className="flex-1">
                <nav className="flex flex-col gap-2 p-4">
                    <Link href="/" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                pathname === "/" && "bg-accent"
                            )}
                        >
                            <Gauge className="mr-2 h-4 w-4" />
                            Tableau de bord
                        </Button>
                    </Link>
                    <Link href="/qrcode" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                pathname === "/qrcode" && "bg-accent"
                            )}
                        >
                            <QrCode className="mr-2 h-4 w-4" />
                            QR Code
                        </Button>
                    </Link>
                    <Link href="/calendar" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                pathname === "/calendar" && "bg-accent"
                            )}
                        >
                            <Calendar className="mr-2 h-4 w-4" />
                            Planning
                        </Button>
                    </Link>
                </nav>
            </ScrollArea>
        </div>
    );
}
