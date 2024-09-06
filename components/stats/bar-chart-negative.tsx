"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts";

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

export const description = "A bar chart with negative values";

const chartData = [
    { month: "Janvier", visitors: 186 },
    { month: "Février", visitors: 205 },
    { month: "Mars", visitors: -207 },
    { month: "Avril", visitors: 173 },
    { month: "Mai", visitors: -209 },
    { month: "Juin", visitors: 214 },
];

const chartConfig = {
    visitors: {
        label: "Visiteurs",
    },
} satisfies ChartConfig;

export function BarChartNegativeStat() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Graphique à barres - Negatif</CardTitle>
                <CardDescription>Janvier - Juin 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent hideLabel hideIndicator />
                            }
                        />
                        <Bar dataKey="visitors">
                            <LabelList
                                position="top"
                                dataKey="month"
                                fillOpacity={1}
                            />
                            {chartData.map((item) => (
                                <Cell
                                    key={item.month}
                                    fill={
                                        item.visitors > 0
                                            ? "hsl(var(--chart-1))"
                                            : "hsl(var(--chart-2))"
                                    }
                                />
                            ))}
                        </Bar>
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
