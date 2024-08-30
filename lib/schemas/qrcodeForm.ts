import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 21; // 21MB
const ACCEPTED_FILE_TYPES = ["pdf", "mp4", "png", "jpg"];

const qrcodeFormSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(3, { message: "Le nom doit avoir minimum 3 caractères" })
        .max(100, { message: "Le nom doit avoir maximum 50 caractères" })
        .trim(),

    isFile: z.boolean({
        invalid_type_error: "isFile must be a boolean",
    }),
    filename: z.string().refine((filename) => {
        ACCEPTED_FILE_TYPES.includes(filename);
    }),
    redirectionUrl: z.string().url(),
    file: z
        .instanceof(File)
        .optional()
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, "Le fichier est trop volumineux (21MB maximum)")
        .refine((file) => {
            return file ? ACCEPTED_FILE_TYPES.includes(file.type) : false;
        }, "Le fichier doit avoir l'un des formats suivants : pdf, mp4, png, jpg"),
});

export default qrcodeFormSchema;
