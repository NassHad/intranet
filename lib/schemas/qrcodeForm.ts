import { z } from "zod";

const qrcodeFormSchema = z.discriminatedUnion("hasFile", [
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

export default qrcodeFormSchema;
