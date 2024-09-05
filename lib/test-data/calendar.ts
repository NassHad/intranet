export interface User {
    id: number;
    name: string;
}

export interface Schedule {
    userId: number;
    date: string;
    status: "work" | "off" | "half-day";
    meeting: boolean;
}

export const users: User[] = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "Diana Prince" },
];

export const schedules: Schedule[] = [
    { userId: 1, date: "2024-09-16", status: "work", meeting: true },
    { userId: 1, date: "2024-09-17", status: "work", meeting: false },
    { userId: 1, date: "2024-09-18", status: "off", meeting: false },
    { userId: 1, date: "2024-09-19", status: "work", meeting: false },
    { userId: 1, date: "2024-09-20", status: "work", meeting: true },
    { userId: 2, date: "2024-09-16", status: "off", meeting: false },
    { userId: 2, date: "2024-09-17", status: "off", meeting: false },
    { userId: 2, date: "2024-09-18", status: "work", meeting: true },
    { userId: 2, date: "2024-09-19", status: "work", meeting: false },
    { userId: 2, date: "2024-09-20", status: "work", meeting: true },
    { userId: 3, date: "2024-09-16", status: "work", meeting: false },
    { userId: 3, date: "2024-09-17", status: "work", meeting: true },
    { userId: 3, date: "2024-09-18", status: "work", meeting: false },
    { userId: 3, date: "2024-09-19", status: "work", meeting: false },
    { userId: 3, date: "2024-09-20", status: "work", meeting: true },
    { userId: 4, date: "2024-09-16", status: "off", meeting: true },
    { userId: 4, date: "2024-09-17", status: "off", meeting: false },
    { userId: 4, date: "2024-09-18", status: "off", meeting: false },
    { userId: 4, date: "2024-09-19", status: "work", meeting: false },
    { userId: 4, date: "2024-09-20", status: "work", meeting: true },
];
