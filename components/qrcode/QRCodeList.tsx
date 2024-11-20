"use client";

import React, { useState, useEffect } from "react";
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

const ITEMS_PER_PAGE = 10;

export default function QRCodeList({ qrCodes }: QRCodeListProps) {
    const [qrCodeList, setQRCodeList] = useState(qrCodes);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredQRCodes = qrCodeList.filter(
        (qrCode) =>
            qrCode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            qrCode.redirectionUrl
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const indexOfLastQRCode = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstQRCode = indexOfLastQRCode - ITEMS_PER_PAGE;
    const currentQRCodes = filteredQRCodes.slice(
        indexOfFirstQRCode,
        indexOfLastQRCode
    );

    const totalPages = Math.ceil(filteredQRCodes.length / ITEMS_PER_PAGE);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        setCurrentPage(1); // Reset to the first page when the search term changes
    }, [searchTerm]);

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
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Rechercher par nom ou URL"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full max-w-xl border rounded-lg py-2 px-2 border-slate-300"
                        />
                    </div>
                    <Table className="mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>URL de redirection</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentQRCodes.map((qrCode) => (
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
                                                            Confirmer la
                                                            suppression
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Êtes-vous sûr de
                                                            vouloir supprimer ce
                                                            QR code ?
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
                    <div className="flex justify-end mt-4">
                        <Button
                            variant="outline"
                            disabled={currentPage === 1}
                            onClick={() => paginate(currentPage - 1)}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="outline"
                            disabled={currentPage === totalPages}
                            onClick={() => paginate(currentPage + 1)}
                        >
                            Suivant
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
