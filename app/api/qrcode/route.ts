import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import QRCode from "@/lib/models/qrcode.model";
import User from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    await connectToDB();

    try {
        const body = await request.json();
        const { name, hasFile, file, url } = body;
        const mediaUrl = "https://media.gti-sodifac.com/";
        const qrCode = new QRCode({
            name: name.trim(),
            isFile: hasFile === "yes",
            fileName: hasFile === "yes" ? file.name : null,
            entryUrl: mediaUrl + name.trim().replace(/\s+/g, "").toLowerCase(),
            redirectionUrl: hasFile === "no" ? url : mediaUrl + "/" + file.name,
        });

        await qrCode.save();
        return NextResponse.json({ success: true, data: qrCode });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
