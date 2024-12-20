import Link from "next/link";
import {
    Activity,
    ArrowUpRight,
    CreditCard,
    DollarSign,
    Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const description =
    "Une coque d'application avec un en-tête et une zone de contenu principal. L'en-tête comporte une barre de navigation, une zone de recherche et un menu déroulant de navigation utilisateur. La navigation utilisateur est activée par un bouton avec une image d'avatar.";

export function Dashboard() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Revenu Total
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                45 231,89 €
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +20,1% par rapport au mois dernier
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Abonnements
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2350</div>
                            <p className="text-xs text-muted-foreground">
                                +180,1% par rapport au mois dernier
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Ventes
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12 234</div>
                            <p className="text-xs text-muted-foreground">
                                +19% par rapport au mois dernier
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Utilisateurs actifs
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">
                                +201 depuis la dernière heure
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card className="xl:col-span-2">
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Transactions</CardTitle>
                                <CardDescription>
                                    Transactions récentes de la boutique.
                                </CardDescription>
                            </div>
                            <Button asChild size="sm" className="ml-auto gap-1">
                                <Link href="#">
                                    Voir Tout
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Client</TableHead>
                                        <TableHead className="hidden xl:table-column">
                                            Type
                                        </TableHead>
                                        <TableHead className="hidden xl:table-column">
                                            Statut
                                        </TableHead>
                                        <TableHead className="hidden xl:table-column">
                                            Date
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Montant
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">
                                                Liam Johnson
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                liam@exemple.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-column">
                                            Vente
                                        </TableCell>
                                        <TableCell className="hidden xl:table-column">
                                            <Badge
                                                className="text-xs"
                                                variant="outline"
                                            >
                                                Approuvé
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                            23/06/2023
                                        </TableCell>
                                        <TableCell className="text-right">
                                            250,00 €
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">
                                                Olivia Smith
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                olivia@exemple.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-column">
                                            Remboursement
                                        </TableCell>
                                        <TableCell className="hidden xl:table-column">
                                            <Badge
                                                className="text-xs"
                                                variant="outline"
                                            >
                                                Refusé
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                            24/06/2023
                                        </TableCell>
                                        <TableCell className="text-right">
                                            150,00 €
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">
                                                Noah Williams
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                noah@exemple.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-column">
                                            Abonnement
                                        </TableCell>
                                        <TableCell className="hidden xl:table-column">
                                            <Badge
                                                className="text-xs"
                                                variant="outline"
                                            >
                                                Approuvé
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                            25/06/2023
                                        </TableCell>
                                        <TableCell className="text-right">
                                            350,00 €
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">
                                                Emma Brown
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                emma@exemple.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-column">
                                            Vente
                                        </TableCell>
                                        <TableCell className="hidden xl:table-column">
                                            <Badge
                                                className="text-xs"
                                                variant="outline"
                                            >
                                                Approuvé
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                            26/06/2023
                                        </TableCell>
                                        <TableCell className="text-right">
                                            450,00 €
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">
                                                Liam Johnson
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                liam@exemple.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-column">
                                            Vente
                                        </TableCell>
                                        <TableCell className="hidden xl:table-column">
                                            <Badge
                                                className="text-xs"
                                                variant="outline"
                                            >
                                                Approuvé
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                            27/06/2023
                                        </TableCell>
                                        <TableCell className="text-right">
                                            550,00 €
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Ventes Récentes</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage
                                        src="/avatars/01.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Olivia Martin
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        olivia.martin@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +1 999,00 €
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage
                                        src="/avatars/02.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>JL</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Jackson Lee
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        jackson.lee@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +39,00 €
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage
                                        src="/avatars/03.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>IN</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Isabella Nguyen
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        isabella.nguyen@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +299,00 €
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage
                                        src="/avatars/04.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>WK</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        William Kim
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        will@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +99,00 €
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage
                                        src="/avatars/05.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Sofia Davis
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        sofia.davis@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +39,00 €
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
