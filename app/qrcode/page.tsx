// app/qrcode/page.tsx
import { connectToDB } from "@/utils/database";
import QRCode from "@/lib/models/qrcode.model";
import QRCodeList from "@/components/qrcode/QRCodeList";
import { QRCode as QRCodeType } from "@/lib/types/types";
import QRCodeLayout from "./form-layout";

export default async function QRCodeListPage() {
    await connectToDB();
    const qrCodes = (await QRCode.find({}).lean()) as unknown as QRCodeType[];
    const plainQRCodes = qrCodes.map((doc) => ({
        _id: doc._id.toString(),
        name: doc.name,
        isFile: doc.isFile,
        fileName: doc.fileName,
        entryUrl: doc.entryUrl,
        redirectionUrl: doc.redirectionUrl,
    }));

    return <QRCodeList qrCodes={plainQRCodes} />;
}
