import { NextResponse } from "next/server";

const API_KEY = "Z5AR6QJL62A8X2BTT789XR8LS95HADBJ";
const PRESTASHOP_URL = "https://automotoboutic.com"; // Replace with your actual Prestashop URL

export async function GET() {
    console.log("Hello from the API route");

    try {
        const response = await fetch(
            `${PRESTASHOP_URL}/api/products/?ws_key=${API_KEY}&display=[id]&output_format=JSON`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/xml",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data:", data);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching products:", error);
        if (error instanceof Response) {
            const text = await error.text();
            console.error("Response body:", text);
        }
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
