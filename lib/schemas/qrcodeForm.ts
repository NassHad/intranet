import { z } from "zod";

const qrcodeFormSchema = z.discriminatedUnion("hasFile", [
    z.object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        hasFile: z.literal("yes"),
        file: z.instanceof(File).refine((file) => {
            return file.size <= 100000000; // 100MB
        }, "File size should be less than 100MB"),
    }),
    z.object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        hasFile: z.literal("no"),
        url: z.string().url("Please enter a valid URL"),
    }),
]);

export type FormValues = z.infer<typeof qrcodeFormSchema>;

export default qrcodeFormSchema;
