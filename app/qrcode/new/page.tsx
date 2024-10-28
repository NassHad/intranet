// app/qrcode/new/page.tsx
"use client";

import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQRCode } from "next-qrcode";
import { Button } from "@/components/ui/button";
import { CreateQRCodeForm } from "@/components/qrcode/CreateQrCodeForm";
import type { FormValues } from "@/lib/schemas/qrcodeForm";
import QRCodeFormLayout from "../form-layout";

export default function QRCodeNewForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const svgContainer = useRef<HTMLDivElement>(null);
    const [qrcodeName, setQrcodeName] = useState("");
    const [qrcodeUrl, setQrcodeUrl] = useState(" ");
    const [showSVG, setShowSVG] = useState(false);
    const { SVG } = useQRCode();
    const [generalError, setGeneralError] = useState<string | null>(null);

    const convertSvgToBlob = (svgHtml: any): Blob => {
        return new Blob([svgHtml], { type: "image/svg+xml" });
    };

    const fetchQRCodeFromAPI = async (): Promise<string> => {
        try {
            console.log(qrcodeUrl);

            const response = await fetch(
                `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrcodeUrl}&format=svg`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch QR code from API");
            }
            const svgText = await response.text();
            const svgBlob = convertSvgToBlob(svgText);
            const downloadUrl = URL.createObjectURL(svgBlob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = `${qrcodeName}.svg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
            return svgText;
        } catch (error) {
            console.error("Error fetching QR code from API:", error);
            throw error;
        }
    };

    const downloadSvg = () => {
        fetchQRCodeFromAPI();
        // const svgElement = svgContainer.current?.querySelector("svg");
        // if (!svgElement) {
        //     console.error("SVG element not found");
        //     return;
        // }

        // const serializer = new XMLSerializer();
        // const svgString = serializer.serializeToString(svgElement);
        // const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
        // const downloadUrl = URL.createObjectURL(svgBlob);
        // const a = document.createElement("a");
        // a.href = downloadUrl;
        // a.download = `${qrcodeName}.svg`;
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
        // URL.revokeObjectURL(downloadUrl);
    };

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);
        setShowSVG(false);
        setGeneralError(null);

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("hasFile", data.hasFile);

            if (data.hasFile === "yes" && data.file) {
                formData.append("file", data.file);
            } else if (data.hasFile === "no" && data.url) {
                formData.append("url", data.url);
            }

            const response = await fetch("/api/qrcode", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("Result", result);

            if (!response.ok) {
                if (response.status === 400 && result.error) {
                    if (typeof result.error === "string") {
                        setGeneralError(result.error);
                    } else if (typeof result.error === "object") {
                        // Handle field-specific errors if needed
                    }
                    throw new Error(
                        typeof result.error === "string"
                            ? result.error
                            : "Le formulaire n'a pas pu être enregistré"
                    );
                } else {
                    throw new Error("Failed to submit form");
                }
            } else if (response.ok && data.hasFile === "yes") {
                const uploadResponse = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    throw new Error("Failed to upload file");
                }
            }

            setQrcodeName(result.data.name);
            setQrcodeUrl(result.data.entryUrl);
            setShowSVG(true);

            toast({
                title: "Form submitted successfully",
                description: "Your QR code data has been saved.",
            });
        } catch (error: any) {
            console.error("Submission error:", error);
            if (!generalError) {
                setGeneralError(
                    error.message ||
                        "An unexpected error occurred. Please try again."
                );
            }
            toast({
                title: "Error",
                description:
                    error.message || "Failed to submit form. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <QRCodeFormLayout>
            {generalError && (
                <div className="text-red-500 mb-4">{generalError}</div>
            )}
            <CreateQRCodeForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
            {showSVG && (
                <>
                    <div className="py-6 transition-all" ref={svgContainer}>
                        <SVG
                            text={qrcodeUrl}
                            options={{
                                margin: 2,
                                width: 150,
                                color: {
                                    dark: "#000000",
                                    light: "#FFFFFF",
                                },
                            }}
                        />
                    </div>
                    <Button type="button" onClick={downloadSvg}>
                        Télécharger le QR Code
                    </Button>
                </>
            )}
        </QRCodeFormLayout>
    );
}
