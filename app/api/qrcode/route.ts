import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/utils/database";
import User from "@/lib/models/user.model";

const saveUser = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDB();

    if (req.method === "POST") {
        const { firstname, lastname, email, password } = req.body;

        try {
            const user = new User({ firstname, lastname, email, password });
            await user.save();
            res.status(200).json({ message: "User saved successfully", user });
        } catch (error) {
            res.status(500).json({ message: "Failed to save user", error });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
};

export default saveUser;
