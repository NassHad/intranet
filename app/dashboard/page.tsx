import { Dashboard } from "@/components/stats/Dashboard";
import {
    fetchCategories,
    fetchCentrals,
    fetchStatistics,
} from "@/lib/actions/stats.action";
import { fetchUserGroup, fetchUsers } from "@/lib/actions/user.action";

export default async function DashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}
