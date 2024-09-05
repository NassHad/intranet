// app/qrcode/[id]/edit/page.tsx
import { UpdateQRCodeForm } from "@/components/qrcode/UpdateQrCodeForm";
import QRCode from "@/lib/models/qrcode.model";
import { connectToDB } from "@/utils/database";
import { notFound } from "next/navigation";
import { QRCode as QRCodeType } from "@/lib/types/types";
import QRCodeLayout from "../../form-layout";

export default async function EditQRCodePage({
    params,
}: {
    params: { id: string };
}) {
    await connectToDB();

    const qrCode = (await QRCode.findById(params.id)) as unknown as QRCodeType;
    const plainQRCode = {
        _id: qrCode._id.toString(),
        name: qrCode.name,
        isFile: qrCode.isFile,
        fileName: qrCode.fileName,
        entryUrl: qrCode.entryUrl,
        redirectionUrl: qrCode.redirectionUrl,
    };

    if (!qrCode) {
        notFound();
    }

    return (
        <div className="w-2/6 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Éditer ce QR Code</h1>
            <UpdateQRCodeForm qrCode={plainQRCode} />
        </div>
    );
}
