"use server";

import { connectToDB } from "@/utils/database";
import Category from "../models/category.model";
import Central from "../models/central.model";
import Statistics from "../models/statistics.model";
import { CentralType } from "@/lib/types/types";

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
        console.log(filters);

        const statistics = await Statistics.find();

        return JSON.parse(JSON.stringify(statistics));
    } catch (error: any) {
        throw new Error(`Failed to fetch central: ${error.message}`);
    }
}
