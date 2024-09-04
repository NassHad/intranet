"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";
import qrcodeFormSchema from "@/lib/schemas/qrcodeForm";
import { useQRCode } from "next-qrcode";

type FormValues = z.infer<typeof qrcodeFormSchema>;

export default function QRCodeNewForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const svgContainer = useRef<HTMLDivElement>(null);
    const [qrcodeName, setQrcodeName] = useState("");
    const [qrcodeUrl, setQrcodeUrl] = useState(" "); // Have to be an empty string to prevent error
    const [showSVG, setShowSVG] = useState(false);
    const { SVG } = useQRCode();
    const [generalError, setGeneralError] = useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(qrcodeFormSchema),
        defaultValues: {
            name: "",
            hasFile: "no",
            url: "",
        },
    });

    const convertSvgToBlob = (svgHtml: any): Blob => {
        return new Blob([svgHtml], { type: "image/svg+xml" });
    };

    /** SVG DOWNLOAD **/
    const downloadSvg = () => {
        const svgHtml = svgContainer.current?.innerHTML;

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

    const watchHasFile = form.watch("hasFile");

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);
        setShowSVG(false);
        setGeneralError(null);
        form.clearErrors();

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

            if (!response.ok) {
                if (response.status === 400 && result.error) {
                    if (typeof result.error === "string") {
                        setGeneralError(result.error);
                    } else if (typeof result.error === "object") {
                        Object.keys(result.error).forEach((key) => {
                            form.setError(key as keyof FormValues, {
                                type: "manual",
                                message: result.error[key],
                            });
                        });
                    }
                    throw new Error(
                        typeof result.error === "string"
                            ? result.error
                            : "Le formulaire n'a pas pu être enregistré"
                    );
                } else {
                    throw new Error("Failed to submit form 2");
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
        <>
            <h1 className="text-2xl font-bold mb-4">Créer un QR Code</h1>
            <Form {...form}>
                {/* {generalError && (
                    <div className="text-red-500 mb-4">{generalError}</div>
                )} */}
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Entrez un nom"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Le nom doit être unique
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="hasFile"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>
                                    Vers un fichier ou une URL ?
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="yes" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Fichier
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="no" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                URL
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {watchHasFile === "yes" && (
                        <FormField
                            control={form.control}
                            name="file"
                            render={({
                                field: { onChange, value, ...rest },
                            }) => (
                                <FormItem>
                                    <FormLabel>File</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) =>
                                                onChange(e.target.files?.[0])
                                            }
                                            {...rest}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Upload a file (max 5MB).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    {watchHasFile === "no" && (
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Ne pas oublier http:// ou https://
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </Form>
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
        </>
    );
}
