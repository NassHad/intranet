"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React, { useEffect } from "react";

const CustomCarMats = () => {
    async function fetchModels() {
        const response = await fetch("/api/amb", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
    }
    useEffect(() => {
        fetchModels();
    }, []);

    return (
        <Card>
            <CardHeader className="flex flex-col items-center justify-center">
                <h1>Custom Car Mats</h1>
                <p>This is a placeholder for the custom car mats page.</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
                <h1>Custom Car Mats</h1>
                <p>This is a placeholder for the custom car mats page.</p>
            </CardContent>
        </Card>
    );
};

export default CustomCarMats;
