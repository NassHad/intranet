"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Gauge,
    QrCode,
    Calendar,
    ChartNoAxesCombined,
    CircleUser,
    NotebookText,
} from "lucide-react";

export default function LeftSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex w-64 flex-col border-r bg-background leftSideBar">
            <ScrollArea className="flex-1">
                <nav className="flex flex-col gap-2 p-4">
                    {/* <Link href="/" passHref>
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
                    <h2 className="text-lg font-bold">Organisation</h2>
                    <Link href="/paid-leave" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                pathname === "/paid-leave" && "bg-accent"
                            )}
                        >
                            <NotebookText className="mr-2 h-4 w-4" />
                            Congés payés
                        </Button>
                    </Link>

                    <h2 className="text-lg font-bold">Clients</h2>
                    <Link href="/customers" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                pathname === "/customers" && "bg-accent"
                            )}
                        >
                            <CircleUser className="mr-2 h-4 w-4" />
                            Liste des clients
                        </Button>
                    </Link>
                    <Link href="/customers/key-account" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                pathname === "/customers/key-account" &&
                                    "bg-accent"
                            )}
                        >
                            <CircleUser className="mr-2 h-4 w-4" />
                            Comptes clés
                        </Button>
                    </Link> */}

                    {/* <Link href="/dashboard" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                pathname === "/dashboard" && "bg-accent"
                            )}
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Commandes
                        </Button>
                    </Link> */}

                    <h2 className="text-lg font-bold">Gestion</h2>
                    {/* <Link href="/stats" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                pathname === "/stats" && "bg-accent"
                            )}
                        >
                            <ChartNoAxesCombined className="mr-2 h-4 w-4" />
                            Statistiques
                        </Button>
                    </Link> */}
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
                    {/* <Link href="/calendar" passHref>
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
                    </Link> */}
                </nav>
            </ScrollArea>
        </div>
    );
}
