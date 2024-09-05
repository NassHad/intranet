// components/qrcode/QRCodeForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
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
import qrcodeFormSchema from "@/lib/schemas/qrcodeForm";

type FormValues = z.infer<typeof qrcodeFormSchema>;

interface QRCodeFormProps {
    onSubmit: (data: FormValues) => Promise<void>;
    isSubmitting: boolean;
}

export function CreateQRCodeForm({ onSubmit, isSubmitting }: QRCodeFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(qrcodeFormSchema),
        defaultValues: {
            name: "",
            hasFile: "no",
            url: "",
        },
    });

    const watchHasFile = form.watch("hasFile");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez un nom" {...field} />
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
                            <FormLabel>Vers un fichier ou une URL ?</FormLabel>
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
                        render={({ field: { onChange, value, ...rest } }) => (
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
    );
}
