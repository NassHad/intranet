import { AreaChartStat } from "@/components/stats/area-chart";
import { BarChartStat } from "@/components/stats/bar-chart";
import { BarChartNegativeStat } from "@/components/stats/bar-chart-negative";
import { PieChartStat } from "@/components/stats/pie-chart";

export default function Home() {
    return (
        <>
            <AreaChartStat />
            <div className="flex justify-around mt-10">
                <div>
                    <PieChartStat />
                </div>
                <div>
                    <BarChartNegativeStat />
                </div>
            </div>
        </>
    );
}
