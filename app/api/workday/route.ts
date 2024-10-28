import { NextRequest } from "next/server";
import { connectToDB } from "@/utils/database";
import Workday from "@/lib/models/workday.model";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        console.log(formData);

        const name = formData.get("name") as string | null;
        const startDate = formData.get("dateRange[from]") as string | null;
        const endDate = formData.get("dateRange[to]") as string | null;
        const reason = formData.get("reason") as string | null;

        if (!name || !reason || !startDate || !endDate) {
            throw new Error("Missing required form data");
        }

        const workday = new Workday({
            name,
            reason,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            type: 1,
            status: 0,
        });

        // Save the workday to the database
        await connectToDB();
        console.log(workday);

        await workday.save();

        return new Response("Workday created successfully", {
            status: 201,
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", {
            status: 500,
        });
    }
}
