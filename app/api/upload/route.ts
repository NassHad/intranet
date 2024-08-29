import { NextRequest, NextResponse } from "next/server";
import { Client, SFTPWrapper } from "ssh2";
import { Readable } from "stream";
import fs from "fs"; // Import the 'fs' module to read SSH keys

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get("qrcode_file") as unknown as File;
    if (!file) {
        return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const conn = new Client();
    const filePath = `${process.env.MEDIA_UPLOAD_FOLDER}/${file.name}`;

    conn.on("ready", () => {
        conn.sftp((err: any | null, sftp: SFTPWrapper) => {
            if (err) throw err;

            const stream = sftp.createWriteStream(filePath);

            stream.on("close", () => {
                console.log(`File uploaded to ${filePath}`);
                conn.end();
            });

            stream.on("error", (error: any) => {
                console.error(`Error uploading file: ${error.message}`);
                conn.end();
            });

            const readStream = Readable.from(buffer);
            readStream.pipe(stream);
        });
    }).connect({
        host: process.env.SERVER_IP,
        port: process.env.SERVER_PORT as unknown as number,
        username: process.env.SSH_USERNAME,
        privateKey: fs.readFileSync(`${process.env.SSH_KEY_FOLDER}`), // Path to your private SSH key
        passphrase: process.env.SSH_PASSPHRASE, // If your private key is encrypted, otherwise omit this line
    });

    return NextResponse.json({ success: true, path: filePath });
}
