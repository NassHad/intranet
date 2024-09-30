"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

const chartConfig = {
    total: {
        label: "Total",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

const months = [
    "Jan",
    "Fev",
    "Mars",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Aout",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function BarChartStat({ data1, data2 }: { data1: any[]; data2: any[] }) {
    const transformedData = months.map((month, index) => {
        const dataItem1 = data1?.find((item) => item.month - 1 === index);
        const dataItem2 = data2?.find((item) => item.month - 1 === index);
        return {
            month: month,
            total: dataItem1 ? dataItem1.total : 0,
            total2: dataItem2 ? dataItem2.total : 0,
        };
    });

    console.log("Transformed data", transformedData);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Graphique à barres - Total</CardTitle>
                <CardDescription>Statistiques mensuelles</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={transformedData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                            ticks={Array.from(
                                { length: 21 },
                                (_, i) => i * 1000
                            )}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="total"
                            fill="var(--color-total)"
                            radius={4}
                        />
                        <Bar
                            dataKey="total2"
                            fill="var(--color-total2)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Statistiques mensuelles
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Montant total par mois
                </div>
            </CardFooter>
        </Card>
    );
}
