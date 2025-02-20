import { z } from "zod";

const qrcodeFormSchema = z.discriminatedUnion("hasFile", [
    z.object({
        name: z.string().min(3, {
            message: "Name must be at least 3 characters.",
        }),
        hasFile: z.literal("yes"),
        file: z.instanceof(File),
        url: z.string().optional(),
    }),
    z.object({
        name: z.string().min(3, {
            message: "Name must be at least 3 characters.",
        }),
        hasFile: z.literal("no"),
        url: z.string().url(),
        file: z.any().optional(),
    }),
]);

export type FormValues = z.infer<typeof qrcodeFormSchema>;

export default qrcodeFormSchema;
