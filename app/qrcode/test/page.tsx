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
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const formSchema = z.discriminatedUnion("hasFile", [
    z.object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        hasFile: z.literal("yes"),
        file: z.instanceof(File).refine((file) => {
            return file.size <= 5000000; // 5MB
        }, "File size should be less than 5MB"),
    }),
    z.object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        hasFile: z.literal("no"),
        url: z.string().url("Please enter a valid URL"),
    }),
]);

type FormValues = z.infer<typeof formSchema>;

export default function ConditionalForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            hasFile: "no",
            url: "",
        },
    });

    const watchHasFile = form.watch("hasFile");

    async function onSubmit(data: FormValues) {
        console.log(data);

        setIsSubmitting(true);
        try {
            let fileUrl = null;

            if (data.hasFile === "yes" && data.file) {
                // Create a FormData object for file upload
                const formData = new FormData();
                formData.append("file", data.file);

                // Call the upload API
                const uploadResponse = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    throw new Error("Failed to upload file");
                }

                const uploadResult = await uploadResponse.json();
                fileUrl = uploadResult.url; // Assuming the API returns the file URL
            }
            const response = await fetch("/api/qrcode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            const result = await response.json();
            console.log(result);
            toast({
                title: "Form submitted successfully",
                description: "Your QR code data has been saved.",
            });
        } catch (error) {
            console.error("Submission error:", error);
            toast({
                title: "Error",
                description: "Failed to submit form. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

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
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
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
                            <FormLabel>Do you have a file to upload?</FormLabel>
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
                                            Yes, I have a file
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="no" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            No, I'll provide a URL
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
                                    Provide a valid URL.
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
