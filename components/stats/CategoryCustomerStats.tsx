"use client";

import { useState } from "react";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CentralType, StatsType } from "@/lib/types/types";

// Type definitions (unchanged)
interface DataItem {
    id: number;
    year: number;
    month: string;
    category: string;
    user: string;
    amount: number;
}

type Data = DataItem[];
type Year = string;
type Category = string;
type User = string;
type FilteredData = DataItem[];

interface ComparedDataItem extends Partial<DataItem> {
    set: number;
    month: string;
    amount: number;
}

interface StatsTableProps {
    centrals: CentralType[];
    statistics: StatsType[];
}

type ComparedData = ComparedDataItem[];

// Mock data (unchanged)
const mockData: Data = [
    {
        id: 1,
        year: 2023,
        month: "January",
        category: "Electronics",
        user: "John Doe",
        amount: 1000,
    },
    {
        id: 2,
        year: 2023,
        month: "February",
        category: "Electronics",
        user: "John Doe",
        amount: 1200,
    },
    {
        id: 3,
        year: 2023,
        month: "March",
        category: "Clothing",
        user: "Jane Smith",
        amount: 800,
    },
    {
        id: 4,
        year: 2023,
        month: "April",
        category: "Clothing",
        user: "Jane Smith",
        amount: 900,
    },
    {
        id: 5,
        year: 2024,
        month: "January",
        category: "Electronics",
        user: "John Doe",
        amount: 1100,
    },
    {
        id: 6,
        year: 2024,
        month: "February",
        category: "Electronics",
        user: "John Doe",
        amount: 1300,
    },
    {
        id: 7,
        year: 2024,
        month: "March",
        category: "Clothing",
        user: "Jane Smith",
        amount: 850,
    },
    {
        id: 8,
        year: 2024,
        month: "April",
        category: "Clothing",
        user: "Jane Smith",
        amount: 950,
    },
    {
        id: 1,
        year: 2021,
        month: "January",
        category: "Electronics",
        user: "John Doe",
        amount: 1000,
    },
    {
        id: 2,
        year: 2021,
        month: "February",
        category: "Electronics",
        user: "John Doe",
        amount: 1200,
    },
    {
        id: 3,
        year: 2021,
        month: "March",
        category: "Clothing",
        user: "Jane Smith",
        amount: 800,
    },
    {
        id: 4,
        year: 2021,
        month: "April",
        category: "Clothing",
        user: "Jane Smith",
        amount: 900,
    },
    {
        id: 5,
        year: 2022,
        month: "January",
        category: "Electronics",
        user: "John Doe",
        amount: 1100,
    },
    {
        id: 6,
        year: 2022,
        month: "February",
        category: "Electronics",
        user: "John Doe",
        amount: 1300,
    },
    {
        id: 7,
        year: 2022,
        month: "March",
        category: "Clothing",
        user: "Jane Smith",
        amount: 850,
    },
    {
        id: 8,
        year: 2022,
        month: "April",
        category: "Clothing",
        user: "Jane Smith",
        amount: 950,
    },
];

const years: Year[] = ["2021", "2022", "2023", "2024"];
const categories: Category[] = ["All", "Electronics", "Clothing"];
const users: User[] = ["All", "John Doe", "Jane Smith"];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// Helper functions (unchanged)
function filterData(data: StatsType[]): FilteredData {
    // return data.filter((item) => {
    //     const matchesYear = item.year.toString() === year;
    //     const matchesCategory =
    //         category === "All" || item.category === category;
    //     const matchesUser = user === "All" || item.user === user;
    //     return matchesYear && matchesCategory && matchesUser;
    // });
}

function compareData(data1: FilteredData, data2: FilteredData): ComparedData {
    return months.flatMap((month) => {
        const item1 = data1.find((i) => i.month === month) || {
            id: 0,
            year: parseInt(data1[0]?.year.toString() || "0"),
            month,
            category: "",
            user: "",
            amount: 0,
        };
        const item2 = data2.find((i) => i.month === month) || {
            id: 0,
            year: parseInt(data2[0]?.year.toString() || "0"),
            month,
            category: "",
            user: "",
            amount: 0,
        };
        return [
            { ...item1, set: 1 },
            { ...item2, set: 2 },
        ];
    });
}

export default function CategoryCustomerStats({
    centrals,
    statistics,
}: StatsTableProps) {
    const [selectedYear1, setSelectedYear1] = useState<Year>("2023");
    const [selectedCentral1, setSelectedCentral1] = useState("All");
    const [selectedCategory1, setSelectedCategory1] = useState<Category>("All");
    const [selectedUser1, setSelectedUser1] = useState<User>("All");
    const [selectedYear2, setSelectedYear2] = useState<Year>("2024");
    const [selectedCentral2, setSelectedCentral2] = useState("All");
    const [selectedCategory2, setSelectedCategory2] = useState<Category>("All");
    const [selectedUser2, setSelectedUser2] = useState<User>("All");
    const [showComparison, setShowComparison] = useState(false);

    const filteredData1: FilteredData = filterData(
        mockData,
        selectedYear1,
        selectedCentral1,
        selectedCategory1,
        selectedUser1
    );
    const filteredData2: FilteredData = filterData(
        mockData,
        selectedYear2,
        selectedCentral2,
        selectedCategory2,
        selectedUser2
    );
    const comparedData: ComparedData = showComparison
        ? compareData(filteredData1, filteredData2)
        : filteredData1.map((item) => ({ ...item, set: 1 }));

    const totalAmount1 = comparedData
        .filter((item) => item.set === 1)
        .reduce((sum, item) => sum + item.amount, 0);
    const totalAmount2 = showComparison
        ? comparedData
              .filter((item) => item.set === 2)
              .reduce((sum, item) => sum + item.amount, 0)
        : 0;

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Monthly Statistics Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                    <Checkbox
                        id="show-comparison"
                        checked={showComparison}
                        onCheckedChange={(checked) =>
                            setShowComparison(checked as boolean)
                        }
                    />
                    <Label htmlFor="show-comparison">Show Comparison</Label>
                </div>
                <div className="flex space-x-4 mb-4">
                    <div>
                        <h3 className="text-sm font-medium mb-2">Set 1</h3>
                        <div className="flex space-x-2">
                            <Select
                                value={selectedYear1}
                                onValueChange={setSelectedYear1}
                            >
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedCentral1}
                                onValueChange={setSelectedCentral1}
                            >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Central" />
                                </SelectTrigger>
                                <SelectContent>
                                    {centrals.map((central) => (
                                        <SelectItem
                                            key={central._id}
                                            value={central._id}
                                        >
                                            {central.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedCategory1}
                                onValueChange={setSelectedCategory1}
                            >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedUser1}
                                onValueChange={setSelectedUser1}
                            >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="User" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((user) => (
                                        <SelectItem key={user} value={user}>
                                            {user}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            showComparison
                                ? "max-h-20 opacity-100"
                                : "max-h-0 opacity-0"
                        }`}
                    >
                        <h3 className="text-sm font-medium mb-2 bg-teal-100">
                            Set 2
                        </h3>
                        <div className="flex space-x-2">
                            <Select
                                value={selectedYear2}
                                onValueChange={setSelectedYear2}
                            >
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedCategory2}
                                onValueChange={setSelectedCategory2}
                            >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedUser2}
                                onValueChange={setSelectedUser2}
                            >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="User" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((user) => (
                                        <SelectItem key={user} value={user}>
                                            {user}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden transition-all duration-300 ease-in-out">
                    <Table>
                        <TableCaption>
                            Monthly statistics{" "}
                            {showComparison ? "comparison" : ""}
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mois</TableHead>
                                <TableHead>Année</TableHead>
                                <TableHead>Centrale</TableHead>
                                <TableHead>Catégorie</TableHead>
                                <TableHead>Utilisateur</TableHead>
                                <TableHead className="text-right">
                                    Montant
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {comparedData.map((item, index) => (
                                <TableRow
                                    key={index}
                                    className={`
                    transition-all duration-300 ease-in-out
                    ${
                        showComparison
                            ? item.set === 1
                                ? "bg-white"
                                : "bg-teal-100"
                            : ""
                    }
                    ${showComparison && item.set === 2 ? "animate-fadeIn" : ""}
                  `}
                                >
                                    <TableCell>{item.month}</TableCell>
                                    <TableCell>{item.year}</TableCell>
                                    <TableCell>
                                        {item.category || "-"}
                                    </TableCell>
                                    <TableCell>{item.user || "-"}</TableCell>
                                    <TableCell className="text-right">
                                        ${item.amount.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="font-bold">
                                <TableCell colSpan={4}>Total (Set 1)</TableCell>
                                <TableCell className="text-right">
                                    ${totalAmount1.toFixed(2)}
                                </TableCell>
                            </TableRow>
                            {showComparison && (
                                <TableRow className="font-bold animate-fadeIn">
                                    <TableCell colSpan={4}>
                                        Total (Set 2)
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${totalAmount2.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
