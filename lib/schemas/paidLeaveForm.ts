import { z } from "zod";

const paidLeaveFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    }),
    reason: z.string().min(2, {
        message: "Reason must be at least 2 characters.",
    }),
});

export type FormValues = z.infer<typeof paidLeaveFormSchema>;

export default paidLeaveFormSchema;
