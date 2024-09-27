"use client";

import { useState, useMemo } from "react";
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
import {
    CategoryType,
    CentralType,
    StatsType,
    UserGroupType,
    UserType,
} from "@/lib/types/types";
import { fetchTotalEarned } from "@/lib/actions/stats.action";
import { Button } from "../ui/button";
import { BarChartStat } from "./bar-chart";

interface StatsTestProps {
    users: UserType[];
    centrals: CentralType[];
    statistics: StatsType[];
    categories: CategoryType[];
    userGroups: UserGroupType[];
}

const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
];

const UserStats = ({
    centrals,
    statistics,
    categories,
    userGroups,
    users,
}: StatsTestProps) => {
    const [selectedYear1, setSelectedYear1] = useState<string>("2024");
    const [selectedMonth1, setSelectedMonth1] = useState<string>("All");
    const [selectedCentral1, setSelectedCentral1] = useState<string>("All");
    const [selectedCategory1, setSelectedCategory1] = useState<string>("All");
    const [selectedUser1, setSelectedUser1] = useState<string>("All");
    const [selectedYear2, setSelectedYear2] = useState<string>("2024");
    const [selectedMonth2, setSelectedMonth2] = useState<string>("All");
    const [selectedCentral2, setSelectedCentral2] = useState<string>("All");
    const [selectedCategory2, setSelectedCategory2] = useState<string>("All");
    const [selectedUser2, setSelectedUser2] = useState<string>("All");
    const [graphData, setGraphData] = useState<object>({});
    const [showComparison, setShowComparison] = useState(false);

    const years = useMemo(() => {
        const uniqueYears = new Set(statistics.map((stat) => stat.year));
        return Array.from(uniqueYears).sort();
    }, [statistics]);

    const fetchStats = async (filters: {
        year: string;
        month: string;
        central: string;
        category: string;
        user: string;
    }) => {
        const result = await fetchTotalEarned(filters);
        return result;
    };

    const handleShowStats = async () => {
        const result = await fetchStats({
            year: selectedYear1,
            month: selectedMonth1,
            central: selectedCentral1,
            category: selectedCategory1,
            user: selectedUser1,
        });
        setGraphData(result);
    };

    const filterData = (
        data: StatsType[],
        year: string,
        month: string,
        central: string,
        category: string,
        user: string
    ) => {
        return data.filter(
            (stat) =>
                (year === "All" || stat.year === year) &&
                (month === "All" ||
                    months[parseInt(stat.month) - 1] === month) &&
                (central === "All" || stat.central === central) &&
                (category === "All" || stat.category === category) &&
                (user === "All" || stat.user === user)
        );
    };

    const filteredData1 = useMemo(
        () =>
            filterData(
                statistics,
                selectedYear1,
                selectedMonth1,
                selectedCentral1,
                selectedCategory1,
                selectedUser1
            ),
        [
            statistics,
            selectedYear1,
            selectedMonth1,
            selectedCentral1,
            selectedCategory1,
            selectedUser1,
        ]
    );

    const filteredData2 = useMemo(
        () =>
            showComparison
                ? filterData(
                      statistics,
                      selectedYear2,
                      selectedMonth2,
                      selectedCentral2,
                      selectedCategory2,
                      selectedUser2
                  )
                : [],
        [
            statistics,
            selectedYear2,
            selectedMonth2,
            selectedCentral2,
            selectedCategory2,
            selectedUser2,
            showComparison,
        ]
    );

    const displayData = useMemo(() => {
        if (!showComparison) {
            return filteredData1.map((item) => ({ ...item, set: 1 }));
        }

        const comparedData = [];

        let totalEarned1 = 0;
        let totalEarned2 = 0;

        for (const item1 of filteredData1) {
            totalEarned1 += item1.totalEarned;
            item1.totalEarnedByMonth = totalEarned1;
            comparedData.push({ ...item1, set: 1 });
        }
        for (const item2 of filteredData2) {
            totalEarned2 += item2.totalEarned;
            item2.totalEarnedByMonth = totalEarned2;
            comparedData.push({ ...item2, set: 2 });
        }

        if (
            selectedYear1 !== "All" &&
            selectedMonth1 !== "All" &&
            selectedYear2 !== "All" &&
            selectedMonth2 !== "All"
        ) {
            const percentageChange =
                ((totalEarned2 - totalEarned1) / totalEarned1) * 100;
            comparedData.forEach((item) => {
                console.log(percentageChange);
                item.percentage = percentageChange;
            });
        }

        return comparedData;
    }, [filteredData1, filteredData2, showComparison]);

    return (
        <>
            <Card className="w-full mx-auto">
                <CardHeader>
                    <CardTitle>
                        Comparaison des statistiques mensuelles
                    </CardTitle>
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
                        <Label htmlFor="show-comparison">
                            Afficher la comparaison
                        </Label>
                    </div>
                    <div className="flex mb-4 space-x-10">
                        <div>
                            <h3 className="text-sm font-medium mb-2">
                                Ensemble 1
                            </h3>
                            <div className="flex space-x-2">
                                <Select
                                    value={selectedYear1}
                                    onValueChange={setSelectedYear1}
                                >
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Année" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">
                                            Toutes
                                        </SelectItem>
                                        {years.map((year) => (
                                            <SelectItem key={year} value={year}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select
                                    value={selectedMonth1}
                                    onValueChange={setSelectedMonth1}
                                >
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Mois" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">
                                            Tous
                                        </SelectItem>
                                        {months.map((month, index) => (
                                            <SelectItem
                                                key={index}
                                                value={month}
                                            >
                                                {month}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select
                                    value={selectedCentral1}
                                    onValueChange={setSelectedCentral1}
                                >
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Centrale" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">
                                            Toutes
                                        </SelectItem>
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
                                        <SelectValue placeholder="Catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">
                                            Toutes
                                        </SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select
                                    value={selectedUser1}
                                    onValueChange={setSelectedUser1}
                                >
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Utilisateur" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">
                                            Tous
                                        </SelectItem>
                                        {users.map((user) => (
                                            <SelectItem
                                                key={user._id}
                                                value={user._id}
                                            >
                                                {user.firstname} {user.lastname}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {showComparison && (
                            <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-20 opacity-100">
                                <h3 className="text-sm font-medium mb-2">
                                    Ensemble 2
                                </h3>
                                <div className="flex space-x-2">
                                    <Select
                                        value={selectedYear2}
                                        onValueChange={setSelectedYear2}
                                    >
                                        <SelectTrigger className="w-[100px]">
                                            <SelectValue placeholder="Année" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">
                                                Toutes
                                            </SelectItem>
                                            {years.map((year) => (
                                                <SelectItem
                                                    key={year}
                                                    value={year}
                                                >
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        value={selectedMonth2}
                                        onValueChange={setSelectedMonth2}
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Mois" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">
                                                Tous
                                            </SelectItem>
                                            {months.map((month, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={month}
                                                >
                                                    {month}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        value={selectedCentral2}
                                        onValueChange={setSelectedCentral2}
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Centrale" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">
                                                Toutes
                                            </SelectItem>
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
                                        value={selectedCategory2}
                                        onValueChange={setSelectedCategory2}
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">
                                                Toutes
                                            </SelectItem>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category._id}
                                                    value={category._id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        value={selectedUser2}
                                        onValueChange={setSelectedUser2}
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Utilisateur" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">
                                                Tous
                                            </SelectItem>
                                            {users.map((user) => (
                                                <SelectItem
                                                    key={user._id}
                                                    value={user._id}
                                                >
                                                    {user.firstname}{" "}
                                                    {user.lastname}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="overflow-hidden transition-all duration-300 ease-in-out">
                        <Table>
                            <TableCaption>
                                Statistiques mensuelles{" "}
                                {showComparison ? "comparées" : ""}
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
                                {displayData.map((stat, index) => (
                                    <TableRow
                                        key={index}
                                        className={
                                            stat.set === 2 ? "bg-slate-200" : ""
                                        }
                                    >
                                        <TableCell>
                                            {months[parseInt(stat.month) - 1]}
                                        </TableCell>
                                        <TableCell>{stat.year}</TableCell>
                                        <TableCell>
                                            {centrals.find(
                                                (c) => c._id === stat.central
                                            )?.name || "Inconnu"}
                                        </TableCell>
                                        <TableCell>
                                            {categories.find(
                                                (c) => c._id === stat.category
                                            )?.name || "Inconnu"}
                                        </TableCell>
                                        <TableCell>
                                            {users.find(
                                                (u) => u._id === stat.user
                                            )?.firstname || "Inconnu"}{" "}
                                            {users.find(
                                                (u) => u._id === stat.user
                                            )?.lastname || ""}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {stat.totalEarned}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            <div className="w-2/4">
                <Card>
                    <CardHeader>
                        <CardTitle>Statistiques globales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BarChartStat data={graphData} />
                        <div className="flex items-center space-x-2 mb-4">
                            <Button onClick={handleShowStats}>
                                Show stats
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default UserStats;
