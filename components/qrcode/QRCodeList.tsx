// components/QRCodeList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { QRCode } from "@/lib/types/types";

interface QRCodeListProps {
    qrCodes: QRCode[];
}

export default function QRCodeList({ qrCodes }: QRCodeListProps) {
    const [qrCodeList, setQRCodeList] = useState(qrCodes);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/qrcode/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setQRCodeList(
                    qrCodeList.filter((qr) => qr._id.toString() !== id)
                );
                router.refresh();
            } else {
                console.error("Failed to delete QR code");
            }
        } catch (error) {
            console.error("Error deleting QR code:", error);
        }
    };

    return (
        <>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>QR Codes</CardTitle>
                    <CardDescription className="flex flex-row justify-between pt-4">
                        Retrouvez tous les QR Code actuellement actifs
                        <Link href={`/qrcode/new`} passHref>
                            <Button variant="default">Nouveau</Button>
                        </Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table className="mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>URL de redirection</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {qrCodeList.map((qrCode) => (
                                <TableRow key={qrCode._id.toString()}>
                                    <TableCell className="font-medium">
                                        {qrCode.name}
                                    </TableCell>
                                    <TableCell>
                                        {qrCode.redirectionUrl}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/qrcode/${qrCode._id}/edit`}
                                                passHref
                                            >
                                                <Button variant="outline">
                                                    Modifier
                                                </Button>
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive">
                                                        Supprimer
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Êtes vous vraiment
                                                            sûr ?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Cette action est
                                                            irréversible. Il
                                                            vous saura toujours
                                                            possible de créer à
                                                            nouveau ce QR Code.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Annuler
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                handleDelete(
                                                                    qrCode._id.toString()
                                                                )
                                                            }
                                                        >
                                                            Supprimer
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
