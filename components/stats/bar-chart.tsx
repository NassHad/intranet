"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
    { month: "Janvier", desktop: 186, mobile: 80 },
    { month: "Février", desktop: 305, mobile: 200 },
    { month: "Mars", desktop: 237, mobile: 120 },
    { month: "Avril", desktop: 73, mobile: 190 },
    { month: "Mai", desktop: 209, mobile: 130 },
    { month: "Juin", desktop: 214, mobile: 140 },
];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function BarChartStat() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Graphique à barres - Multiple</CardTitle>
                <CardDescription>Janvier - Juin 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 5)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="desktop"
                            fill="var(--color-desktop)"
                            radius={4}
                        />
                        <Bar
                            dataKey="mobile"
                            fill="var(--color-mobile)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Augmentation de 5.2% ce mois-ci{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Nombre total de visiteurs sur les 6 derniers mois
                </div>
            </CardFooter>
        </Card>
    );
}
