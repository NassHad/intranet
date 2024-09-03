import { NextRequest, NextResponse } from "next/server";
import { Client } from "ssh2";
import { Readable } from "stream";
import fs from "fs/promises";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

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

        const filePath = `${process.env.MEDIA_UPLOAD_FOLDER}/${file.name}`;
        const privateKey = await fs.readFile(`${process.env.SSH_KEY_FOLDER}`);

        await new Promise((resolve, reject) => {
            const conn = new Client();

            conn.on("ready", () => {
                conn.sftp((err, sftp) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const stream = sftp.createWriteStream(filePath);

                    stream.on("close", () => {
                        console.log(`File uploaded to ${filePath}`);
                        conn.end();
                        resolve(null);
                    });

                    stream.on("error", (error: any) => {
                        console.error(`Error uploading file: ${error.message}`);
                        conn.end();
                        reject(error);
                    });

                    const readStream = Readable.from(buffer);
                    readStream.pipe(stream);
                });
            });

            conn.on("error", (err) => {
                console.error("SSH connection error:", err);
                reject(err);
            });

            conn.connect({
                host: process.env.SERVER_IP,
                port: parseInt(process.env.SERVER_PORT || "22", 10),
                username: process.env.SSH_USERNAME,
                privateKey,
                passphrase: process.env.SSH_PASSPHRASE,
            });
        });

        return NextResponse.json({ success: true, path: filePath });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
