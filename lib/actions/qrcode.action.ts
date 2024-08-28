"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import QRCode from "../models/qrcode.model";

import { connectToDB } from "@/utils/database";

export async function fetchQRCode(qrcodeId: string) {
    try {
        connectToDB();

        return await QRCode.findOne({ id: qrcodeId });
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

interface Params {
    name: string;
    isFile: boolean;
    fileName?: string; // Optional, since it might be a URL
    entryUrl: string;
    redirectionUrl?: string; // Optional, only needed if not a file
}

export async function updateQRCode({
    name,
    isFile,
    fileName,
    entryUrl,
    redirectionUrl,
}: Params): Promise<void> {
    "use server";
    try {
        await connectToDB();

        await QRCode.create({
            name,
            isFile,
            fileName,
            entryUrl,
            redirectionUrl,
        });
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}
