// schemas/user.ts
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().refine((val) => {
        // Check if the password is at least 8 characters long
        const isValidLength = val.length >= 8;
        // Check if the password contains at least one special character
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val);

        return isValidLength && hasSpecialChar;
    }),
});

export default loginSchema;
