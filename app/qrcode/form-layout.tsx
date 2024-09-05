// app/qrcode/layout.tsx
import { ReactNode } from "react";

export default function QRCodeFormLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <div className="container mx-auto py-10 lg:w-3/6">{children}</div>;
}
