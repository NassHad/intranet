"use client";
import React from "react";
import { Form, FormProvider } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import paidLeaveFormSchema from "@/lib/schemas/paidLeaveForm";
import type { FormValues } from "@/lib/schemas/paidLeaveForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "../ui/date-picker";
import { addDays } from "date-fns";

const PaidLeaveForm: React.FC = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(paidLeaveFormSchema),
        defaultValues: {
            name: "",
            dateRange: {
                from: new Date(),
                to: addDays(new Date(), 7),
            },
            reason: "",
        },
    });

    async function onSubmit(data: FormValues) {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("dateRange[from]", data.dateRange.from.toISOString());
        formData.append("dateRange[to]", data.dateRange.to.toISOString());
        formData.append("reason", data.reason);
        try {
            const response = await fetch("/api/workday", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            console.log("Form submitted successfully");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
        console.log("Submitted data:", data);
    }

    return (
        <div>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Request Paid Leave</CardTitle>
                    <CardDescription className="flex flex-row justify-between pt-4">
                        Please fill out the form below to request paid leave.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FormProvider {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Test</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Test"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateRange"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date Range</FormLabel>
                                        <FormControl>
                                            <DatePickerWithRange
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="reason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reason</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Test"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Envoyer</Button>
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaidLeaveForm;
