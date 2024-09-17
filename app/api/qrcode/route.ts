import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import QRCode from "@/lib/models/qrcode.model";
import User from "@/lib/models/user.model";

export async function POST(request: Request) {
    await connectToDB();

    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const hasFile = formData.get("hasFile") as string;
        const file = formData.get("file") as File | null;
        const url = formData.get("url") as string | null;

        const mediaUrl = process.env.PUBLIC_MEDIA_QRCODE_URL;
        const mediaFolderUrl = process.env.PUBLIC_MEDIA_FOLDER_QRCODE_URL;

        const existingQRCode = await QRCode.findOne({
            name: name,
        });

        if (existingQRCode) {
            return NextResponse.json(
                {
                    success: false,
                    error: { name: "Ce nom est déjà utilisé." },
                },
                { status: 400 }
            );
        }

        const qrCode = new QRCode({
            name: name.trim(),
            isFile: hasFile === "yes",
            fileName: file ? file.name.replace(/\s/g, "_") : null,
            redirectionUrl:
                hasFile === "no"
                    ? url
                    : file
                    ? mediaFolderUrl + file.name.replace(/\s/g, "_")
                    : null,
        });
        // Save the initial QR code document
        const savedQRCode = await qrCode.save();

        // Update the QR code with the entryUrl
        const entryUrl = `${mediaUrl}${savedQRCode._id}`;
        savedQRCode.entryUrl = entryUrl;
        await savedQRCode.save();

        return NextResponse.json({ success: true, data: savedQRCode });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
