import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 21; // 21MB
const ACCEPTED_FILE_TYPES = ["pdf", "mp4", "png", "jpg"];

const qrcodeFormSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(3, { message: "Le nom doit avoir minimum 3 caractères" })
        .max(100, { message: "Le nom doit avoir maximum 50 caractères" })
        .trim(),

    isFile: z.string(),
    filename: z.string().refine((filename) => {
        ACCEPTED_FILE_TYPES.includes(filename);
    }),
    redirectionUrl: z.string().url(),
    file: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});

export default qrcodeFormSchema;
