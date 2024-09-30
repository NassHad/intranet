import CategoryCustomerStats from "@/components/stats/CategoryCustomerStats";
import { Dashboard } from "@/components/stats/Dashboard";
import {
    fetchCategories,
    fetchCentrals,
    fetchStatistics,
} from "@/lib/actions/stats.action";
import { fetchUserGroup, fetchUsers } from "@/lib/actions/user.action";

export default async function DashboardPage() {
    const users = await fetchUsers();
    const centrals = await fetchCentrals();
    const categories = await fetchCategories();
    const userGroups = await fetchUserGroup();
    const statistics = await fetchStatistics();

    return (
        <CategoryCustomerStats
            centrals={centrals}
            statistics={statistics}
            categories={categories}
            userGroups={userGroups}
            users={users}
        />
    );
}
