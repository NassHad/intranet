import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 21; // 21MB
const ACCEPTED_FILE_TYPES = ["pdf", "mp4", "png", "jpg"];

const formSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(3, { message: "Le nom doit avoir minimum 3 caractères" })
        .max(100, { message: "Le nom doit avoir maximum 50 caractères" })
        .trim(),
    isFile: z.any(), // Using enum to clearly define the expected values
    file:
        typeof FileList !== "undefined"
            ? z
                  .instanceof(FileList)
                  .optional()
                  .refine(
                      (fileList) => {
                          if (!fileList || fileList.length === 0) return true; // If no file selected, return true
                          const file = fileList[0];
                          console.log({ "File in zod 1": file });

                          return file.size <= MAX_UPLOAD_SIZE;
                      },
                      {
                          message:
                              "Le fichier est trop volumineux (21MB maximum)",
                      }
                  )
                  .refine(
                      (fileList) => {
                          if (!fileList || fileList.length === 0) return true; // If no file selected, return true
                          const file = fileList[0];
                          console.log({ "File in zod 2": file });

                          const fileType = file.type.split("/")[1];
                          return ACCEPTED_FILE_TYPES.includes(fileType);
                      },
                      {
                          message:
                              "Le fichier doit avoir l'un des formats suivants : pdf, mp4, png, jpg",
                      }
                  )
            : z.any(),
    filename: z
        .string()
        .optional()
        .refine((filename) => {
            return ACCEPTED_FILE_TYPES.includes(
                filename?.split(".").pop() ?? ""
            );
        }, "Type de fichier non valide"), // Optional filename validation
    redirectionUrl: z.string().optional(),
});

const qrcodeFormSchema = formSchema.refine(
    (data) => {
        if (data.isFile === "1") {
            // When 'file' is selected
            return data.file instanceof FileList && data.file.length > 0; // File should be present
        } else if (data.isFile === "2") {
            // When 'url' is selected
            return data.redirectionUrl !== ""; // URL should be present
        }
        return false;
    },
    {
        message: "Veuillez fournir un fichier ou une URL valide.",
        path: ["file", "redirectionUrl"], // Show error for file and redirectionUrl fields
    }
);

export default qrcodeFormSchema;
