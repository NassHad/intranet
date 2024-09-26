"use server";

import { connectToDB } from "@/utils/database";
import Category from "../models/category.model";
import Central from "../models/central.model";
import Statistics from "../models/statistics.model";
import { CentralType } from "@/lib/types/types";
import mongoose from "mongoose";

export async function fetchCategories() {
    try {
        await connectToDB();
        const categories = await Category.find();
        return JSON.parse(JSON.stringify(categories));
    } catch (error: any) {
        throw new Error(`Failed to fetch categories: ${error.message}`);
    }
}

export async function fetchCentrals(): Promise<CentralType[]> {
    try {
        await connectToDB();
        const centrals = await Central.find();

        return JSON.parse(JSON.stringify(centrals));
    } catch (error: any) {
        throw new Error(`Failed to fetch central: ${error.message}`);
    }
}

export async function fetchStatistics() {
    try {
        await connectToDB();
        const statistics = await Statistics.find();

        return JSON.parse(JSON.stringify(statistics));
    } catch (error: any) {
        throw new Error(`Failed to fetch central: ${error.message}`);
    }
}

export async function fetchStatisticsWithFilter(filters: {
    year: string;
    month: string;
    category: string;
    central: string;
    user: string;
}) {
    "use server";
    try {
        await connectToDB();
        const monthNumber = stringMonthToNumber(filters.month);
        const data = Object.fromEntries(
            Object.entries({
                ...filters,
                month: monthNumber,
            }).filter(([_, value]) => value !== "All")
        );
        fetchTotalEarned(filters);

        const statistics = await Statistics.find(data);

        return JSON.parse(JSON.stringify(statistics));
    } catch (error: any) {
        throw new Error(`Failed to fetch central: ${error.message}`);
    }
}

export async function fetchTotalEarned(filters: {
    year?: string;
    month?: string;
    user?: string;
}) {
    "use server";
    try {
        await connectToDB();

        let aggregationPipeline: any[] = [];
        let monthlyTotals: any[] = [];
        console.log(filters.user);

        if (filters.user && filters.user !== "All") {
            const userId = new mongoose.Types.ObjectId(filters.user);
            // User-specific totals for all years and months
            aggregationPipeline = [
                { $match: { user: userId } },
                {
                    $group: {
                        _id: { year: "$year", month: "$month" },
                        total: { $sum: "$totalEarned" },
                    },
                },
                { $sort: { "_id.year": 1, "_id.month": 1 } },
                {
                    $group: {
                        _id: "$_id.year",
                        months: {
                            $push: {
                                month: "$_id.month",
                                total: "$total",
                            },
                        },
                        yearTotal: { $sum: "$total" },
                    },
                },
                { $sort: { _id: 1 } },
            ];
        } else if (
            filters.year &&
            filters.month &&
            filters.year !== "All" &&
            filters.month !== "All"
        ) {
            // Total for specific year and month
            const monthNumber = stringMonthToNumber(filters.month);
            aggregationPipeline = [
                {
                    $match: {
                        year: parseInt(filters.year),
                        month: monthNumber,
                    },
                },
                { $group: { _id: null, total: { $sum: "$totalEarned" } } },
            ];
        } else if (filters.year && filters.year !== "All") {
            // Just the year
            console.log("Just the year");

            // Total for specific year and monthly breakdown
            aggregationPipeline = [
                { $match: { year: parseInt(filters.year) } },
                {
                    $group: {
                        _id: { year: "$year", month: "$month" },
                        total: { $sum: "$totalEarned" },
                    },
                },
                { $sort: { "_id.year": 1, "_id.month": 1 } },
                {
                    $group: {
                        _id: "$_id.year",
                        months: {
                            $push: {
                                month: "$_id.month",
                                total: "$total",
                            },
                        },
                        yearTotal: { $sum: "$total" },
                    },
                },
                { $sort: { _id: 1 } },
            ];
            // monthlyTotals = await Statistics.aggregate(aggregationPipeline);

            // // Calculate year total
            // aggregationPipeline = [
            //     { $match: { year: parseInt(filters.year) } },
            //     { $group: { _id: null, total: { $sum: "$totalEarned" } } },
            // ];
        } else {
            throw new Error("Invalid filter combination");
        }

        const result = await Statistics.aggregate(aggregationPipeline);

        if (filters.year && !filters.month && !filters.user) {
            return {
                yearTotal: result[0]?.total || 0,
                monthlyTotals: monthlyTotals.map((item) => ({
                    month: item._id,
                    total: item.total,
                })),
            };
        }
        console.log(result);

        return JSON.parse(JSON.stringify(result));
    } catch (error: any) {
        throw new Error(`Failed to fetch total earned: ${error.message}`);
    }
}

// Function to get monthly totals for a specific user
async function getMonthlyTotalsForUser(userId: string, year: number) {
    return await Statistics.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId), year } },
        { $group: { _id: "$month", total: { $sum: "$totalEarned" } } },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, month: "$_id", total: 1 } },
    ]);
}

function stringMonthToNumber(month: string): number {
    const monthMap: { [key: string]: number } = {
        Janvier: 1,
        Février: 2,
        Mars: 3,
        Avril: 4,
        Mai: 5,
        Juin: 6,
        Juillet: 7,
        Août: 8,
        Septembre: 9,
        Octobre: 10,
        Novembre: 11,
        Décembre: 12,
    };

    const normalizedMonth =
        month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    return monthMap[normalizedMonth] || 0;
}