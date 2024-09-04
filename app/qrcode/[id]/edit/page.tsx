// app/qrcode/[id]/edit/page.tsx
import { UpdateQRCodeForm } from "@/components/qrcode/UpdateQRCodeForm";
import QRCode from "@/lib/models/qrcode.model";
import { connectToDB } from "@/utils/database";
import { notFound } from "next/navigation";

export default async function EditQRCodePage({
    params,
}: {
    params: { id: string };
}) {
    await connectToDB();

    const qrCode = await QRCode.findById(params.id);

    if (!qrCode) {
        notFound();
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Éditer ce QR Code</h1>
            <UpdateQRCodeForm qrCode={qrCode} />
        </div>
    );
}
