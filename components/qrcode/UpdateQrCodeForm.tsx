"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useRef } from "react";

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
import { IQRCode } from "@/lib/types/types";
import { useQRCode } from "next-qrcode";

// Toast
import { useToast } from "@/hooks/use-toast";

const qrcodeUpdateSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 2 characters.",
    }),
    hasFile: z.enum(["yes", "no"]),
    file: z.instanceof(File).optional(),
    url: z.string().url().optional(),
});

type FormValues = z.infer<typeof qrcodeUpdateSchema>;

interface UpdateQRCodeFormProps {
    qrCode: IQRCode;
}

export function UpdateQRCodeForm({ qrCode }: UpdateQRCodeFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const svgContainer = useRef<HTMLDivElement>(null);

    const [qrcodeName, setQrcodeName] = useState("");
    const [qrcodeUrl, setQrcodeUrl] = useState(" "); // Have to be an empty string to prevent error
    const [showSVG, setShowSVG] = useState(false);
    const { SVG } = useQRCode();

    const form = useForm<FormValues>({
        resolver: zodResolver(qrcodeUpdateSchema),
        defaultValues: {
            // Populate the form with default values
            name: qrCode.name,
            hasFile: qrCode.isFile ? "yes" : "no",
            url: qrCode.isFile ? "" : qrCode.redirectionUrl,
        },
    });

    const watchHasFile = form.watch("hasFile");

    const convertSvgToBlob = (svgHtml: any): Blob => {
        return new Blob([svgHtml], { type: "image/svg+xml" });
    };

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

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);
        setShowSVG(false);

        try {
            const formData = new FormData();
            formData.append("id", qrCode._id.toString());
            formData.append("name", data.name);
            formData.append("hasFile", data.hasFile);

            if (data.hasFile === "yes" && data.file) {
                formData.append("file", data.file);
            } else if (data.hasFile === "no" && data.url) {
                formData.append("url", data.url);
            }

            const response = await fetch("/api/qrcode/update", {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to update QR code");
            }

            const result = await response.json();
            setQrcodeName(result.data.name);
            setQrcodeUrl(result.data.entryUrl);
            console.log(result);

            toast({
                title: "QR code updated successfully",
                description: "Your QR code has been updated.",
            });
        } catch (error) {
            console.error("Update error:", error);
            console.log(error);

            toast({
                title: "Error",
                description: "Failed to update QR code. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
            setShowSVG(true);
        }
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
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
                                        Fichier actuel:{" "}
                                        {qrCode.fileName != ""
                                            ? qrCode.fileName
                                            : "Aucun"}
                                        .
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
                                        Provide a valid URL.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "En cours..." : "Mettre à jour"}
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
