// app/components/CalendarDataProvider.tsx

import { users, schedules, User, Schedule } from "@/lib/test-data/calendar";
import Calendar from "@/components/organization/Calendar";

export interface CalendarData {
    users: User[];
    schedules: Schedule[];
    startDate: Date;
    endDate: Date;
}

export default function CalendarPage() {
    // In the future, you can replace this with a database query
    const calendarData = {
        users,
        schedules,
        startDate: new Date("2023-06-01"),
        endDate: new Date("2023-06-30"),
    };

    return <Calendar data={calendarData} />;
}
