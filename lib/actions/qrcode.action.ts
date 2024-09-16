"use server";

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
}: Params): Promise<{ message: string; status: number }> {
    try {
        await connectToDB();

        await QRCode.init(); // Wait for the index to build, to handle duplicate (name is unique)

        await QRCode.create({
            name,
            isFile,
            fileName,
            entryUrl,
            redirectionUrl,
        });

        return { message: "Success", status: 200 };
    } catch (error: any) {
        return { message: "Internal Server Error", status: 500 };
        // throw new Error(`Failed to create/update user: ${error.message}`);
    }
}
