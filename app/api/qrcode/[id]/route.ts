import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import QRCode from "@/lib/models/qrcode.model";

export async function PUT(request: Request) {
    await connectToDB();

    try {
        const formData = await request.formData();
        const id = formData.get("id") as string;
        const name = formData.get("name") as string;
        const hasFile = formData.get("hasFile") as string;
        const file = formData.get("file") as File | null;
        const url = formData.get("url") as string | null;

        const mediaUrl = process.env.PUBLIC_MEDIA_FOLDER_QRCODE_URL;

        const updateData: any = {
            name: name.trim(),
            isFile: hasFile === "yes",
        };

        if (hasFile === "yes" && file) {
            // Handle file upload here
            // For this example, we'll just use the file name
            updateData.fileName = file.name.replace(/\s/g, "_");
            updateData.redirectionUrl =
                mediaUrl + file.name.replace(/\s/g, "_");
        } else if (hasFile === "no" && url) {
            updateData.fileName = null;
            updateData.redirectionUrl = url;
        }

        console.log(updateData);

        const updatedQRCode = await QRCode.findByIdAndUpdate(id, updateData, {
            new: true,
        });

        if (!updatedQRCode) {
            return NextResponse.json(
                { success: false, error: "QR code not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: updatedQRCode });
    } catch (error: any) {
        console.error("Error updating QR code:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: String } }
) {
    await connectToDB();

    try {
        const { id } = params;

        // Check if the QR code exists
        const qrCode = await QRCode.findById(id);

        if (!qrCode) {
            return NextResponse.json(
                { success: false, error: "QR code not found" },
                { status: 404 }
            );
        }

        // Delete the QR code
        await QRCode.findByIdAndDelete(id);
        return NextResponse.json({
            success: true,
            message: "QR code deleted successfully",
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
