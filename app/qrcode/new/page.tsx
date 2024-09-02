"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "flowbite-react";
import { DevTool } from "@hookform/devtools";

import { useQRCode } from "next-qrcode";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { updateQRCode } from "@/lib/actions/qrcode.action";
import { alertMessages } from "@/lib/messages/alert";
import qrcodeFormSchema from "@/lib/schemas/qrcodeForm";
import { z } from "zod";
import { useFormState, useFormStatus } from "react-dom";
import {
    Controller,
    Form,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Params {
    name: string;
    isFile: boolean;
    fileName?: string; // Optional, since it might be a URL
    entryUrl: string;
    redirectionUrl?: string; // Optional, only needed if not a file
}

const QrCodeNew = () => {
    const form = useForm<z.infer<typeof qrcodeFormSchema>>({
        defaultValues: {
            name: "",
            isFile: "1",
            file: "",
            redirectionUrl: "",
        },
        resolver: zodResolver(qrcodeFormSchema),
    });

    const isFile = form.watch("isFile");

    const { SVG } = useQRCode();

    const [url, setUrl] = useState(" ");
    const [qrcodeName, setQrcodeName] = useState("");
    const [isFileStatus, setIsFileStatus] = useState(true);
    const [isFileStatusString, setIsFileStatusString] = useState("1");
    const router = useRouter();
    const svgContainer = useRef<HTMLDivElement>(null);

    const [isFormValidated, setIsFormValidated] = useState(false);
    const [alertMessageOn, setAlertMessageOn] = useState(false);
    const [formAlertClass, setFormAlertClass] = useState("");
    const fileRef = form.register("file");

    const handleUrl = (e: ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value == "" ? " " : e.target.value;
        setUrl(newUrl);
    };

    const handleIsFileStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setIsFileStatus(!isFileStatus);
        const newIsFileValue = isFileStatusString == "1" ? "0" : "1";
        console.log(newIsFileValue);

        setIsFileStatusString(newIsFileValue);
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

    // Button component
    function SubmitButton() {
        const { pending } = useFormStatus();
        return;
    }

    function onSubmit(data: z.infer<typeof qrcodeFormSchema>) {
        console.log(data);
    }

    /** FORM HANDLING **/
    const formAction = async (formData: FormData) => {
        console.log(formData);

        const parsedFormValue = qrcodeFormSchema.safeParse(formData);

        if (!parsedFormValue.success) {
            const err = parsedFormValue.error.format();

            setFormError(err);
            return;
        }

        let name = formData.get("name") as string;
        const entryUrl = `${
            process.env.NEXT_PUBLIC_MEDIA_QRCODE_URL + name.replace(" ", "_")
        }` as string;

        const isFile = formData.get("file_or_url") === "1";
        const file = formData.get("file") as File;
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
            ? (formData.get("redirectionUrl") as string)
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

            <FormProvider {...form}>
                <form
                    className="flex max-w-md flex-col gap-2 justify-around"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom du QR Code</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Le nom est obligatoire
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="isFile"
                        control={form.control}
                        render={({ field }) => (
                            <FormControl>
                                <RadioGroup
                                    name={field.name}
                                    onValueChange={field.onChange}
                                    onChange={handleIsFileStatus}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Fichier
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="2" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Url
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                    {/* <fieldset className="flex max-w-md flex-col gap-4">
                        <legend className="my-4">
                            Redirection vers une url ou un fichier ?
                        </legend>
                        <div className="flex items-center gap-2">
                            <Radio
                                id="radioFile"
                                {...register("isFile")}
                                value={1}
                                onChange={() => setIsFileStatus(!isFileStatus)}
                                defaultChecked
                            />
                            <Label htmlFor="radioFile">Fichier</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio
                                id="radioUrl"
                                {...register("isFile")}
                                value={0}
                                onChange={() => setIsFileStatus(!isFileStatus)}
                            />
                            <Label htmlFor="radioUrl">URL</Label>
                        </div>
                    </fieldset> */}

                    {isFile === "1" ? (
                        <>
                            <FormField
                                name="file"
                                control={form.control}
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Fichier</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                {...fileRef}
                                                defaultValue={""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Obligatoire
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    ) : (
                        <>
                            <FormField
                                name="redirectionUrl"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            L'url vers laquelle le QR Code sera
                                            redirigé
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                defaultValue={""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Obligatoire
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    {/* <SubmitButton /> */}
                    <Button type="submit">Enregistrer le QR Code</Button>
                </form>
            </FormProvider>
            {/* <DevTool control={form.control} /> */}
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
