"use client";

import * as React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CentraleData {
    centrale: string;
    interlocuteur1: string;
    interlocuteur2: string;
    respCompte: string;
    assistante: string;
}

const csvData: CentraleData[] = [
    {
        centrale: "CORA Belgique",
        interlocuteur1: "CELINE",
        interlocuteur2: "CHARLOTTE",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "SEDAT AUTO PARTS",
        interlocuteur1: "CELINE",
        interlocuteur2: "",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "TRAFIC",
        interlocuteur1: "CELINE",
        interlocuteur2: "CHARLOTTE",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "EXTRA",
        interlocuteur1: "CELINE",
        interlocuteur2: "CHARLOTTE",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "GUY GERARD",
        interlocuteur1: "CELINE",
        interlocuteur2: "CHARLOTTE",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "CAR MOTORS",
        interlocuteur1: "CELINE",
        interlocuteur2: "JULIEN",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "DIVERS Belgique",
        interlocuteur1: "CELINE",
        interlocuteur2: "",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "CARREFOUR Espagne",
        interlocuteur1: "CELINE",
        interlocuteur2: "JULIEN",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "CARREFOUR Italie",
        interlocuteur1: "CELINE",
        interlocuteur2: "JULIEN",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "ROADY Portugal",
        interlocuteur1: "CELINE",
        interlocuteur2: "JULIEN",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "AUCHAN Portugal",
        interlocuteur1: "CELINE",
        interlocuteur2: "EMELINE",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "DIVERS EXPORT",
        interlocuteur1: "CELINE",
        interlocuteur2: "EMELINE",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "MIDAS INTERNATIONAL",
        interlocuteur1: "CELINE",
        interlocuteur2: "EMELINE",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "WRT EQUATEUR",
        interlocuteur1: "CELINE",
        interlocuteur2: "EMELINE",
        respCompte: "CELINE/EMELINE",
        assistante: "",
    },
    {
        centrale: "RACE ONE ARGENTINE",
        interlocuteur1: "CELINE",
        interlocuteur2: "EMELINE",
        respCompte: "CELINE/EMELINE",
        assistante: "",
    },
    {
        centrale: "IMPEX IBERICA",
        interlocuteur1: "CELINE",
        interlocuteur2: "JULIEN",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "AUCHAN Espagne",
        interlocuteur1: "CELINE",
        interlocuteur2: "CHARLOTTE",
        respCompte: "CELINE/EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "AFRIQUE",
        interlocuteur1: "CELINE",
        interlocuteur2: "EMELINE",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "CFAO",
        interlocuteur1: "CELINE",
        interlocuteur2: "EMELINE",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "COSTCO",
        interlocuteur1: "CELINE",
        interlocuteur2: "CHARLOTTE",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "ACTION",
        interlocuteur1: "CELINE",
        interlocuteur2: "FLORENT",
        respCompte: "EMELINE",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "MEDITERANEO",
        interlocuteur1: "CELINE",
        interlocuteur2: "EMELINE",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "SYNCHRO DIFFUSION",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "ROADY",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "AMERICAN CARWASH",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "PROXITECH",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "FLORENT",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "DIVERS France",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "CARREFOUR BAGAGE",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "RELAIS H",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "",
        respCompte: "STELLA",
        assistante: "VINCIANE",
    },
    {
        centrale: "LE FURET DU NORD",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "",
        respCompte: "STELLA",
        assistante: "VINCIANE",
    },
    {
        centrale: "DECITRE",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "",
        respCompte: "STELLA",
        assistante: "VINCIANE",
    },
    {
        centrale: "SCAPNOR",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SCAPARTOIS",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SCADIF",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SCAOUEST",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SCACHAP",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "CORA France",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "AUCHAN",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "AUCHAN DISCOUNT",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "FLORENT",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "NORAUTO France",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "DOM TOM",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN / FLORENT",
        respCompte: "EMELINE",
        assistante: "DELPHINE/EMMANUELLE",
    },
    {
        centrale: "AUTODISTRIBUTION",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "FLORENT",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "BAMAPPRO",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "EMELINE",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "SOGEDIAL",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "EMELINE",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "ALDI",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN / FLORENT",
        respCompte: "STELLA",
        assistante: "DELPHINE",
    },
    {
        centrale: "AVIA",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "STELLA",
        assistante: "DELPHINE",
    },
    {
        centrale: "DOMOTI",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "EMELINE",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "CAMPING CAR PLUS",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "POINT S / VIASSO",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "AUCHAN MDD",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "AUCHAN MN PAYS",
        interlocuteur1: "CELINE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "NORAUTO PAYS + MDD",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SOCAMAINE",
        interlocuteur1: "DANIEL",
        interlocuteur2: "CHARLOTTE",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SCARMOR",
        interlocuteur1: "DANIEL",
        interlocuteur2: "CHARLOTTE",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SCANORMANDE",
        interlocuteur1: "DANIEL",
        interlocuteur2: "CHARLOTTE",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "STATIONS LECLERC",
        interlocuteur1: "DANIEL",
        interlocuteur2: "JULIEN / FLORENT",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SCAPALSACE",
        interlocuteur1: "DANIEL",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SCAPEST",
        interlocuteur1: "DANIEL",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SCASO",
        interlocuteur1: "FLORENT",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "PROVENCE OUTILLAGE",
        interlocuteur1: "FLORENT",
        interlocuteur2: "STELLA",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "STOKOMANI",
        interlocuteur1: "FLORENT",
        interlocuteur2: "STELLA",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "MARCHE AUX AFFAIRES",
        interlocuteur1: "FLORENT",
        interlocuteur2: "STELLA",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "B&M",
        interlocuteur1: "FLORENT",
        interlocuteur2: "JULIEN",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "LA FOIRFOUILLE",
        interlocuteur1: "FLORENT",
        interlocuteur2: "JULIEN",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "BAZARLAND",
        interlocuteur1: "FLORENT",
        interlocuteur2: "STELLA",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "CENTRAKOR",
        interlocuteur1: "FLORENT",
        interlocuteur2: "STELLA",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "LECASUD",
        interlocuteur1: "FLORENT",
        interlocuteur2: "DANIEL",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SOCAMIL",
        interlocuteur1: "FLORENT",
        interlocuteur2: "DANIEL",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SCALANDES",
        interlocuteur1: "FLORENT",
        interlocuteur2: "DANIEL",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "GALEC",
        interlocuteur1: "FLORENT",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE/STELLA",
        assistante: "VINCIANE/DELPHINE",
    },
    {
        centrale: "AUTOBACS",
        interlocuteur1: "FLORENT/JULIEN",
        interlocuteur2: "EMELINE",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "CARTER CASH",
        interlocuteur1: "GOSIA",
        interlocuteur2: "JULIEN",
        respCompte: "EMELINE",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "AVIS",
        interlocuteur1: "GOSIA",
        interlocuteur2: "JULIEN",
        respCompte: "STELLA",
        assistante: "DELPHINE",
    },
    {
        centrale: "SYSTÈME U",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "",
        respCompte: "STELLA",
        assistante: "DELPHINE",
    },
    {
        centrale: "INTERMARCHE / BRICOMARCHE",
        interlocuteur1: "CHARLOTTE",
        interlocuteur2: "",
        respCompte: "STELLA",
        assistante: "DELPHINE",
    },
    {
        centrale: "FEU VERT",
        interlocuteur1: "JULIEN",
        interlocuteur2: "FLORENT",
        respCompte: "EMELINE",
        assistante: "DELPHINE",
    },
    {
        centrale: "CARREFOUR AUTO",
        interlocuteur1: "JULIEN",
        interlocuteur2: "EMELINE",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SIPLEC",
        interlocuteur1: "JULIEN",
        interlocuteur2: "EMELINE",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SOCARA",
        interlocuteur1: "JULIEN",
        interlocuteur2: "DANIEL",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "SCACENTRE",
        interlocuteur1: "JULIEN",
        interlocuteur2: "FLORENT",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "NAP",
        interlocuteur1: "JULIEN",
        interlocuteur2: "",
        respCompte: "EMELINE",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "NORMA",
        interlocuteur1: "JULIEN",
        interlocuteur2: "EMELINE",
        respCompte: "EMELINE",
        assistante: "VINCIANE",
    },
    {
        centrale: "EURO ACCESSOIRES",
        interlocuteur1: "JULIEN",
        interlocuteur2: "EMELINE",
        respCompte: "EMELINE",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "CMC / HTD",
        interlocuteur1: "JULIEN",
        interlocuteur2: "EMELINE",
        respCompte: "EMELINE",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "POLE E-COMMERCIE (MP + AMB)",
        interlocuteur1: "STELLA",
        interlocuteur2: "JULIEN",
        respCompte: "STELLA",
        assistante: "STELLA",
    },
    {
        centrale: "GT2I",
        interlocuteur1: "STELLA",
        interlocuteur2: "FLORENT",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "ORECA",
        interlocuteur1: "STELLA",
        interlocuteur2: "FLORENT",
        respCompte: "STELLA",
        assistante: "EMMANUELLE",
    },
    {
        centrale: "FAMIFLORA / FLORALUX",
        interlocuteur1: "CELINE",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "CUSTOPOL",
        interlocuteur1: "GOSIA",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "DARTY",
        interlocuteur1: "A DEFINIR",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "BOULANGER",
        interlocuteur1: "A DEFINIR",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "FNAC",
        interlocuteur1: "A DEFINIR",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "ELECTRO DEPOT",
        interlocuteur1: "A DEFINIR",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "GALEC BEAUTE",
        interlocuteur1: "A DEFINIR",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "GALEC TECHNIQUE",
        interlocuteur1: "A DEFINIR",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "CARREFOUR BEAUTE",
        interlocuteur1: "A DEFINIR",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "AUCHAN BEAUTE",
        interlocuteur1: "A DEFINIR",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "MR BRICOLAGE",
        interlocuteur1: "A DEFINIR",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "CASTORAMA",
        interlocuteur1: "A DEFINIR",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "WELDOM",
        interlocuteur1: "A DEFINIR",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
    {
        centrale: "LEROY MERLIN",
        interlocuteur1: "A DEFINIR",
        interlocuteur2: "",
        respCompte: "",
        assistante: "",
    },
];

export default function CentraleTableComplete() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");
    const itemsPerPage = 10;

    const filteredData = React.useMemo(() => {
        return csvData.filter((row) =>
            Object.values(row).some((value) =>
                value.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm]);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    };

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Suivi Comptes Clés & Back Office</CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 mt-2 w-1/4"
                />
                <Table>
                    <TableCaption>
                        Suivi Comptes Clés & Back Office
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">
                                Centrale
                            </TableHead>
                            <TableHead>Interlocuteur n°1</TableHead>
                            <TableHead>Interlocuteur n°2</TableHead>
                            <TableHead>Resp compte back office</TableHead>
                            <TableHead>Assistante back office</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {getCurrentPageData().map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    {row.centrale}
                                </TableCell>
                                <TableCell>{row.interlocuteur1}</TableCell>
                                <TableCell>{row.interlocuteur2}</TableCell>
                                <TableCell>{row.respCompte}</TableCell>
                                <TableCell>{row.assistante}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                // disabled={currentPage === 1}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    onClick={() => setCurrentPage(index + 1)}
                                    isActive={currentPage === index + 1}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                // disabled={currentPage === totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardContent>
        </Card>
    );
}
