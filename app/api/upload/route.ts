import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "video/mp4",
    "video/quicktime",
];

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;
        console.log("File", file);

        if (!file) {
            return NextResponse.json(
                { success: false, error: "No file provided" },
                { status: 400 }
            );
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return NextResponse.json(
                { success: false, error: "Invalid file type" },
                { status: 400 }
            );
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { success: false, error: "File too large" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(
            process.cwd(),
            "..",
            "media_folder",
            "document"
        );
        console.log(uploadDir);

        const safeName = path.basename(file.name).replace(/\s/g, "_");
        console.log("Upload Dir", uploadDir);

        const filePath = path.join(uploadDir, safeName);
        console.log("File Path", filePath);

        await fs.writeFile(filePath, buffer);

        return NextResponse.json({ success: true, path: filePath });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
