import UserStats from "@/components/stats/UserStats";
import {
    fetchCentrals,
    fetchStatistics,
    fetchCategories,
} from "@/lib/actions/stats.action";
import { fetchUsers, fetchUserGroup } from "@/lib/actions/user.action";

const StatsPage = async () => {
    const users = await fetchUsers();
    const centrals = await fetchCentrals();
    const categories = await fetchCategories();
    const userGroups = await fetchUserGroup();
    const statistics = await fetchStatistics();

    return (
        <>
            <UserStats
                centrals={centrals}
                statistics={statistics}
                categories={categories}
                userGroups={userGroups}
                users={users}
            />
        </>
    );
};

export default StatsPage;
