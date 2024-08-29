"use client";

import {
    Alert,
    Button,
    FileInput,
    Label,
    Radio,
    TextInput,
} from "flowbite-react";

import { useQRCode } from "next-qrcode";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { updateQRCode } from "@/lib/actions/qrcode.action";
import { alertMessages } from "@/lib/messages/alert";

interface Params {
    name: string;
    isFile: boolean;
    fileName?: string; // Optional, since it might be a URL
    entryUrl: string;
    redirectionUrl?: string; // Optional, only needed if not a file
}

const QrCodeNew = () => {
    const { SVG } = useQRCode();

    const [url, setUrl] = useState(" ");
    const [qrcodeName, setQrcodeName] = useState("");
    const [isFileStatus, setIsFileStatus] = useState(true);
    const router = useRouter();
    const svgContainer = useRef<HTMLDivElement>(null);

    const [isFormValidated, setIsFormValidated] = useState(false);
    const [alertMessageOn, setAlertMessageOn] = useState(false);
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [formAlertClass, setFormAlertClass] = useState("");
    const buttonProps = isFormLoading
        ? { isProcessing: true, disabled: true }
        : {};

    console.log(alertMessages);

    const handleUrl = (e: ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value == "" ? " " : e.target.value;
        setUrl(newUrl);
    };

    const handlingFormStatus = () => {
        setIsFormLoading(!isFormLoading);
    };

    const convertSvgToBlob = (svgHtml: any): Blob => {
        return new Blob([svgHtml], { type: "image/svg+xml" });
    };

    /** SVG DOWNLOAD **/
    const downloadSvg = () => {
        const svgHtml = svgContainer.current?.innerHTML;
        console.log(svgHtml);

        const svgBlob = convertSvgToBlob(svgHtml);
        const downloadUrl = URL.createObjectURL(svgBlob);

        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `${qrcodeName}.svg`; // Filename for the downloaded SVG
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(downloadUrl);
    };

    /** FORM HANDLING **/
    const formAction = async (formData: FormData) => {
        let name = formData.get("qrcode_name") as string;
        const entryUrl = `${
            process.env.NEXT_PUBLIC_MEDIA_QRCODE_URL + name.replace(" ", "_")
        }` as string;

        const isFile = formData.get("file_or_url") === "1";
        const file = formData.get("qrcode_file") as File;
        let fileName = "";

        if (file) {
            fileName = file.name as string;
            fileName = fileName.replace(" ", "_");
            try {
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) throw new Error(await res.text());
            } catch (e: any) {
                console.log(e);
            }
        }
        const redirectionUrl = !isFileStatus
            ? (formData.get("qrcode_url") as string)
            : process.env.NEXT_PUBLIC_MEDIA_QRCODE_URL + fileName;

        // Construct the Params object expected by updateQRCode
        const params: Params = {
            name,
            isFile,
            fileName,
            entryUrl,
            redirectionUrl,
        };

        // Call the server action with the Params
        const res = await updateQRCode(params);
        if (res.status == 500) {
            setIsFormValidated(false);
            setAlertMessageOn(true);
            setFormAlertClass("failure");
        } else {
            setIsFormValidated(true);
            setUrl(entryUrl);
            setFormAlertClass("success");
            // router.push("/");
        }
        handlingFormStatus();
    };

    return (
        <>
            {alertMessageOn && (
                <Alert color={formAlertClass}>
                    <span className="font-medium">
                        {formAlertClass == "failure"
                            ? alertMessages.qrcodeFailure.start
                            : alertMessages.qrcodeSuccess.start}
                    </span>{" "}
                    {formAlertClass == "failure"
                        ? alertMessages.qrcodeFailure.text
                        : alertMessages.qrcodeSuccess.text}
                </Alert>
            )}
            <form
                className="flex max-w-md flex-col gap-2 justify-around"
                action={formAction}
            >
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Nom du QR Code" />
                </div>
                <TextInput
                    id="name"
                    name="qrcode_name"
                    value={qrcodeName}
                    onChange={(e) => setQrcodeName(e.target.value)}
                    required
                />
                <fieldset className="flex max-w-md flex-col gap-4">
                    <legend className="my-4">
                        Redirection vers une url ou un fichier ?
                    </legend>
                    <div className="flex items-center gap-2">
                        <Radio
                            id="radioFile"
                            name="file_or_url"
                            value={1}
                            onChange={() => setIsFileStatus(!isFileStatus)}
                            defaultChecked
                        />
                        <Label htmlFor="radioFile">Fichier</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio
                            id="radioUrl"
                            name="file_or_url"
                            value={0}
                            onChange={() => setIsFileStatus(!isFileStatus)}
                        />
                        <Label htmlFor="radioUrl">URL</Label>
                    </div>
                </fieldset>

                {isFileStatus ? (
                    <>
                        <div className="mt-4 block">
                            <Label
                                htmlFor="file"
                                value="Choisissez le fichier"
                            />
                        </div>
                        <FileInput id="file" name="qrcode_file" />
                    </>
                ) : (
                    <>
                        <div className="mt-4 block">
                            <Label htmlFor="url" value="URL" />
                        </div>
                        <TextInput
                            id="url"
                            name="qrcode_url"
                            placeholder="exemple: https://www.youtube.com"
                            onChange={handleUrl}
                            value={url}
                        />
                    </>
                )}
                <Button type="submit" {...buttonProps}>
                    Enregistrer le QR Code
                </Button>
            </form>
            {isFormValidated && (
                <>
                    <div className="py-6 transition-all" ref={svgContainer}>
                        <SVG
                            text={url}
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
        </>
    );
};

export default QrCodeNew;
