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
    { id: 1, name: "Emmanuelle RAGOT" },
    { id: 2, name: "Vinciane HANSELMANN" },
    { id: 3, name: "Stella BLAIS" },
    { id: 4, name: "Nassim HADDAD" },
];

export const schedules: Schedule[] = [
    { userId: 1, date: "2024-09-01", status: "work", meeting: false },
    { userId: 1, date: "2024-09-02", status: "work", meeting: true },
    { userId: 1, date: "2024-09-03", status: "work", meeting: false },
    { userId: 1, date: "2024-09-04", status: "work", meeting: true },
    { userId: 1, date: "2024-09-05", status: "work", meeting: false },
    { userId: 1, date: "2024-09-06", status: "work", meeting: true },
    { userId: 1, date: "2024-09-07", status: "work", meeting: false },
    { userId: 1, date: "2024-09-08", status: "work", meeting: true },
    { userId: 1, date: "2024-09-09", status: "work", meeting: false },
    { userId: 1, date: "2024-09-10", status: "work", meeting: true },
    { userId: 1, date: "2024-09-11", status: "work", meeting: false },
    { userId: 1, date: "2024-09-12", status: "work", meeting: true },
    { userId: 1, date: "2024-09-13", status: "work", meeting: false },
    { userId: 1, date: "2024-09-14", status: "work", meeting: true },
    { userId: 1, date: "2024-09-15", status: "work", meeting: false },
    { userId: 1, date: "2024-09-16", status: "work", meeting: true },
    { userId: 1, date: "2024-09-17", status: "work", meeting: false },
    { userId: 1, date: "2024-09-18", status: "work", meeting: true },
    { userId: 1, date: "2024-09-19", status: "work", meeting: false },
    { userId: 1, date: "2024-09-20", status: "work", meeting: true },
    { userId: 1, date: "2024-09-21", status: "work", meeting: false },
    { userId: 1, date: "2024-09-22", status: "work", meeting: true },
    { userId: 1, date: "2024-09-23", status: "work", meeting: true },
    { userId: 1, date: "2024-09-24", status: "work", meeting: false },
    { userId: 1, date: "2024-09-25", status: "work", meeting: true },
    { userId: 1, date: "2024-09-26", status: "work", meeting: false },
    { userId: 1, date: "2024-09-27", status: "half-day", meeting: false },
    { userId: 1, date: "2024-09-28", status: "work", meeting: true },
    { userId: 1, date: "2024-09-29", status: "work", meeting: false },
    { userId: 1, date: "2024-09-30", status: "work", meeting: true },
    { userId: 1, date: "2024-10-01", status: "work", meeting: false },
    { userId: 1, date: "2024-10-02", status: "off", meeting: false },
    { userId: 1, date: "2024-10-03", status: "work", meeting: true },
    { userId: 1, date: "2024-10-04", status: "work", meeting: false },
    { userId: 1, date: "2024-10-05", status: "work", meeting: true },
    { userId: 1, date: "2024-10-06", status: "work", meeting: false },
    { userId: 1, date: "2024-10-07", status: "work", meeting: true },
    { userId: 1, date: "2024-10-08", status: "work", meeting: false },
    { userId: 1, date: "2024-10-09", status: "work", meeting: true },
    { userId: 1, date: "2024-10-10", status: "work", meeting: false },
    { userId: 1, date: "2024-10-11", status: "work", meeting: true },
    { userId: 1, date: "2024-10-12", status: "work", meeting: false },
    { userId: 1, date: "2024-10-13", status: "work", meeting: true },
    { userId: 1, date: "2024-10-14", status: "work", meeting: false },
    { userId: 1, date: "2024-10-15", status: "half-day", meeting: true },
    { userId: 1, date: "2024-10-16", status: "work", meeting: false },
    { userId: 1, date: "2024-10-17", status: "work", meeting: true },
    { userId: 1, date: "2024-10-18", status: "work", meeting: false },
    { userId: 1, date: "2024-10-19", status: "work", meeting: true },
    { userId: 1, date: "2024-10-20", status: "work", meeting: false },
    { userId: 1, date: "2024-10-21", status: "work", meeting: true },
    { userId: 1, date: "2024-10-22", status: "work", meeting: false },
    { userId: 1, date: "2024-10-23", status: "work", meeting: true },
    { userId: 1, date: "2024-10-24", status: "work", meeting: false },
    { userId: 1, date: "2024-10-25", status: "work", meeting: true },
    { userId: 1, date: "2024-10-26", status: "work", meeting: false },
    { userId: 1, date: "2024-10-27", status: "work", meeting: true },
    { userId: 1, date: "2024-10-28", status: "work", meeting: false },
    { userId: 1, date: "2024-10-29", status: "work", meeting: true },
    { userId: 1, date: "2024-10-30", status: "work", meeting: false },
    { userId: 1, date: "2024-10-31", status: "work", meeting: true },
    { userId: 1, date: "2024-11-01", status: "work", meeting: false },
    { userId: 1, date: "2024-11-02", status: "work", meeting: true },
    { userId: 1, date: "2024-11-03", status: "work", meeting: false },
    { userId: 1, date: "2024-11-04", status: "work", meeting: true },
    { userId: 1, date: "2024-11-05", status: "work", meeting: false },
    { userId: 1, date: "2024-11-06", status: "work", meeting: true },
    { userId: 1, date: "2024-11-07", status: "work", meeting: false },
    { userId: 1, date: "2024-11-08", status: "work", meeting: true },
    { userId: 1, date: "2024-11-09", status: "work", meeting: false },
    { userId: 1, date: "2024-11-10", status: "work", meeting: true },
    { userId: 1, date: "2024-11-11", status: "work", meeting: false },
    { userId: 1, date: "2024-11-12", status: "work", meeting: true },
    { userId: 1, date: "2024-11-13", status: "work", meeting: false },
    { userId: 1, date: "2024-11-14", status: "work", meeting: true },
    { userId: 1, date: "2024-11-15", status: "work", meeting: true },
    { userId: 1, date: "2024-11-16", status: "work", meeting: false },
    { userId: 1, date: "2024-11-17", status: "work", meeting: true },
    { userId: 1, date: "2024-11-18", status: "work", meeting: false },
    { userId: 1, date: "2024-11-19", status: "work", meeting: true },
    { userId: 1, date: "2024-11-20", status: "work", meeting: true },
    { userId: 1, date: "2024-11-21", status: "work", meeting: false },
    { userId: 1, date: "2024-11-22", status: "work", meeting: true },
    { userId: 1, date: "2024-11-23", status: "work", meeting: false },
    { userId: 1, date: "2024-11-24", status: "work", meeting: true },
    { userId: 1, date: "2024-11-25", status: "work", meeting: false },
    { userId: 1, date: "2024-11-26", status: "work", meeting: true },
    { userId: 1, date: "2024-11-27", status: "work", meeting: false },
    { userId: 1, date: "2024-11-28", status: "work", meeting: true },
    { userId: 1, date: "2024-11-29", status: "work", meeting: false },
    { userId: 1, date: "2024-11-30", status: "work", meeting: true },
    { userId: 2, date: "2024-09-01", status: "work", meeting: false },
    { userId: 2, date: "2024-09-02", status: "work", meeting: true },
    { userId: 2, date: "2024-09-03", status: "work", meeting: false },
    { userId: 2, date: "2024-09-04", status: "work", meeting: true },
    { userId: 2, date: "2024-09-05", status: "work", meeting: false },
    { userId: 2, date: "2024-09-06", status: "work", meeting: true },
    { userId: 2, date: "2024-09-07", status: "work", meeting: false },
    { userId: 2, date: "2024-09-08", status: "work", meeting: true },
    { userId: 2, date: "2024-09-09", status: "work", meeting: false },
    { userId: 2, date: "2024-09-10", status: "work", meeting: true },
    { userId: 2, date: "2024-09-11", status: "work", meeting: false },
    { userId: 2, date: "2024-09-12", status: "work", meeting: true },
    { userId: 2, date: "2024-09-13", status: "work", meeting: false },
    { userId: 2, date: "2024-09-14", status: "work", meeting: true },
    { userId: 2, date: "2024-09-15", status: "work", meeting: false },
    { userId: 2, date: "2024-09-16", status: "work", meeting: true },
    { userId: 2, date: "2024-09-17", status: "work", meeting: false },
    { userId: 2, date: "2024-09-18", status: "work", meeting: true },
    { userId: 2, date: "2024-09-19", status: "half-day", meeting: false },
    { userId: 2, date: "2024-09-20", status: "work", meeting: true },
    { userId: 2, date: "2024-09-21", status: "work", meeting: false },
    { userId: 2, date: "2024-09-22", status: "work", meeting: true },
    { userId: 2, date: "2024-09-23", status: "work", meeting: false },
    { userId: 2, date: "2024-09-24", status: "work", meeting: true },
    { userId: 2, date: "2024-09-25", status: "work", meeting: false },
    { userId: 2, date: "2024-09-26", status: "work", meeting: true },
    { userId: 2, date: "2024-09-27", status: "work", meeting: false },
    { userId: 2, date: "2024-09-28", status: "work", meeting: true },
    { userId: 2, date: "2024-09-29", status: "work", meeting: false },
    { userId: 2, date: "2024-09-30", status: "work", meeting: false },
    { userId: 2, date: "2024-10-01", status: "work", meeting: true },
    { userId: 2, date: "2024-10-02", status: "work", meeting: false },
    { userId: 2, date: "2024-10-03", status: "work", meeting: true },
    { userId: 2, date: "2024-10-04", status: "work", meeting: false },
    { userId: 2, date: "2024-10-05", status: "work", meeting: true },
    { userId: 2, date: "2024-10-06", status: "work", meeting: false },
    { userId: 2, date: "2024-10-07", status: "work", meeting: true },
    { userId: 2, date: "2024-10-08", status: "work", meeting: false },
    { userId: 2, date: "2024-10-09", status: "off", meeting: false },
    { userId: 2, date: "2024-10-10", status: "work", meeting: true },
    { userId: 2, date: "2024-10-11", status: "work", meeting: false },
    { userId: 2, date: "2024-10-12", status: "work", meeting: true },
    { userId: 2, date: "2024-10-13", status: "work", meeting: false },
    { userId: 2, date: "2024-10-14", status: "work", meeting: true },
    { userId: 2, date: "2024-10-15", status: "work", meeting: false },
    { userId: 2, date: "2024-10-16", status: "work", meeting: true },
    { userId: 2, date: "2024-10-17", status: "work", meeting: false },
    { userId: 2, date: "2024-10-18", status: "work", meeting: true },
    { userId: 2, date: "2024-10-19", status: "work", meeting: false },
    { userId: 2, date: "2024-10-20", status: "work", meeting: true },
    { userId: 2, date: "2024-10-21", status: "work", meeting: false },
    { userId: 2, date: "2024-10-22", status: "work", meeting: true },
    { userId: 2, date: "2024-10-23", status: "work", meeting: false },
    { userId: 2, date: "2024-10-24", status: "work", meeting: true },
    { userId: 2, date: "2024-10-25", status: "work", meeting: false },
    { userId: 2, date: "2024-10-26", status: "work", meeting: true },
    { userId: 2, date: "2024-10-27", status: "work", meeting: false },
    { userId: 2, date: "2024-10-28", status: "work", meeting: true },
    { userId: 2, date: "2024-10-29", status: "work", meeting: false },
    { userId: 2, date: "2024-10-30", status: "work", meeting: true },
    { userId: 2, date: "2024-10-31", status: "work", meeting: false },
    { userId: 2, date: "2024-11-01", status: "work", meeting: true },
    { userId: 2, date: "2024-11-02", status: "work", meeting: false },
    { userId: 2, date: "2024-11-03", status: "work", meeting: true },
    { userId: 2, date: "2024-11-04", status: "work", meeting: false },
    { userId: 2, date: "2024-11-05", status: "work", meeting: true },
    { userId: 2, date: "2024-11-06", status: "half-day", meeting: true },
    { userId: 2, date: "2024-11-07", status: "work", meeting: false },
    { userId: 2, date: "2024-11-08", status: "work", meeting: true },
    { userId: 2, date: "2024-11-09", status: "work", meeting: false },
    { userId: 2, date: "2024-11-10", status: "work", meeting: true },
    { userId: 2, date: "2024-11-11", status: "work", meeting: false },
    { userId: 2, date: "2024-11-12", status: "half-day", meeting: false },
    { userId: 2, date: "2024-11-13", status: "work", meeting: true },
    { userId: 2, date: "2024-11-14", status: "work", meeting: false },
    { userId: 2, date: "2024-11-15", status: "work", meeting: true },
    { userId: 2, date: "2024-11-16", status: "work", meeting: false },
    { userId: 2, date: "2024-11-17", status: "work", meeting: true },
    { userId: 2, date: "2024-11-18", status: "work", meeting: false },
    { userId: 2, date: "2024-11-19", status: "work", meeting: true },
    { userId: 2, date: "2024-11-20", status: "work", meeting: false },
    { userId: 2, date: "2024-11-21", status: "work", meeting: true },
    { userId: 2, date: "2024-11-22", status: "work", meeting: false },
    { userId: 2, date: "2024-11-23", status: "work", meeting: true },
    { userId: 2, date: "2024-11-24", status: "work", meeting: false },
    { userId: 2, date: "2024-11-25", status: "work", meeting: true },
    { userId: 2, date: "2024-11-26", status: "work", meeting: false },
    { userId: 2, date: "2024-11-27", status: "work", meeting: true },
    { userId: 2, date: "2024-11-28", status: "work", meeting: false },
    { userId: 2, date: "2024-11-29", status: "work", meeting: true },
    { userId: 2, date: "2024-11-30", status: "work", meeting: false },
    { userId: 3, date: "2024-09-01", status: "work", meeting: true },
    { userId: 3, date: "2024-09-02", status: "work", meeting: false },
    { userId: 3, date: "2024-09-03", status: "work", meeting: true },
    { userId: 3, date: "2024-09-04", status: "work", meeting: false },
    { userId: 3, date: "2024-09-05", status: "work", meeting: true },
    { userId: 3, date: "2024-09-06", status: "work", meeting: false },
    { userId: 3, date: "2024-09-07", status: "work", meeting: true },
    { userId: 3, date: "2024-09-08", status: "work", meeting: false },
    { userId: 3, date: "2024-09-09", status: "work", meeting: true },
    { userId: 3, date: "2024-09-10", status: "work", meeting: false },
    { userId: 3, date: "2024-09-11", status: "work", meeting: true },
    { userId: 3, date: "2024-09-12", status: "work", meeting: false },
    { userId: 3, date: "2024-09-13", status: "work", meeting: true },
    { userId: 3, date: "2024-09-14", status: "work", meeting: false },
    { userId: 3, date: "2024-09-15", status: "work", meeting: true },
    { userId: 3, date: "2024-09-16", status: "work", meeting: false },
    { userId: 3, date: "2024-09-17", status: "work", meeting: true },
    { userId: 3, date: "2024-09-18", status: "work", meeting: false },
    { userId: 3, date: "2024-09-19", status: "work", meeting: true },
    { userId: 3, date: "2024-09-20", status: "work", meeting: false },
    { userId: 3, date: "2024-09-21", status: "work", meeting: true },
    { userId: 3, date: "2024-09-22", status: "work", meeting: false },
    { userId: 3, date: "2024-09-23", status: "work", meeting: true },
    { userId: 3, date: "2024-09-24", status: "work", meeting: false },
    { userId: 3, date: "2024-09-25", status: "work", meeting: true },
    { userId: 3, date: "2024-09-26", status: "work", meeting: false },
    { userId: 3, date: "2024-09-27", status: "work", meeting: true },
    { userId: 3, date: "2024-09-28", status: "work", meeting: false },
    { userId: 3, date: "2024-09-29", status: "work", meeting: true },
    { userId: 3, date: "2024-09-30", status: "work", meeting: false },
    { userId: 3, date: "2024-10-01", status: "work", meeting: true },
    { userId: 3, date: "2024-10-02", status: "work", meeting: false },
    { userId: 3, date: "2024-10-03", status: "work", meeting: true },
    { userId: 3, date: "2024-10-04", status: "work", meeting: false },
    { userId: 3, date: "2024-10-05", status: "work", meeting: true },
    { userId: 3, date: "2024-10-06", status: "work", meeting: false },
    { userId: 3, date: "2024-10-07", status: "half-day", meeting: true },
    { userId: 3, date: "2024-10-08", status: "work", meeting: false },
    { userId: 3, date: "2024-10-09", status: "work", meeting: true },
    { userId: 3, date: "2024-10-10", status: "work", meeting: false },
    { userId: 3, date: "2024-10-11", status: "work", meeting: true },
    { userId: 3, date: "2024-10-12", status: "work", meeting: false },
    { userId: 3, date: "2024-10-13", status: "work", meeting: true },
    { userId: 3, date: "2024-10-14", status: "work", meeting: false },
    { userId: 3, date: "2024-10-15", status: "work", meeting: true },
    { userId: 3, date: "2024-10-16", status: "work", meeting: false },
    { userId: 3, date: "2024-10-17", status: "work", meeting: true },
    { userId: 3, date: "2024-10-18", status: "work", meeting: false },
    { userId: 3, date: "2024-10-19", status: "work", meeting: true },
    { userId: 3, date: "2024-10-20", status: "work", meeting: false },
    { userId: 3, date: "2024-10-21", status: "work", meeting: true },
    { userId: 3, date: "2024-10-22", status: "work", meeting: false },
    { userId: 3, date: "2024-10-23", status: "work", meeting: true },
    { userId: 3, date: "2024-10-24", status: "work", meeting: false },
    { userId: 3, date: "2024-10-25", status: "work", meeting: true },
    { userId: 3, date: "2024-10-26", status: "work", meeting: false },
    { userId: 3, date: "2024-10-27", status: "work", meeting: true },
    { userId: 3, date: "2024-10-28", status: "off", meeting: false },
    { userId: 3, date: "2024-10-29", status: "work", meeting: true },
    { userId: 3, date: "2024-10-30", status: "work", meeting: false },
    { userId: 3, date: "2024-10-31", status: "work", meeting: true },
    { userId: 3, date: "2024-11-01", status: "off", meeting: false },
    { userId: 3, date: "2024-11-02", status: "work", meeting: true },
    { userId: 3, date: "2024-11-03", status: "work", meeting: false },
    { userId: 3, date: "2024-11-04", status: "work", meeting: true },
    { userId: 3, date: "2024-11-05", status: "work", meeting: false },
    { userId: 3, date: "2024-11-06", status: "work", meeting: true },
    { userId: 3, date: "2024-11-07", status: "work", meeting: false },
    { userId: 3, date: "2024-11-08", status: "work", meeting: false },
    { userId: 3, date: "2024-11-09", status: "work", meeting: true },
    { userId: 3, date: "2024-11-10", status: "work", meeting: false },
    { userId: 3, date: "2024-11-11", status: "work", meeting: true },
    { userId: 3, date: "2024-11-12", status: "work", meeting: false },
    { userId: 3, date: "2024-11-13", status: "work", meeting: true },
    { userId: 3, date: "2024-11-14", status: "work", meeting: false },
    { userId: 3, date: "2024-11-15", status: "work", meeting: true },
    { userId: 3, date: "2024-11-16", status: "work", meeting: false },
    { userId: 3, date: "2024-11-17", status: "work", meeting: true },
    { userId: 3, date: "2024-11-18", status: "work", meeting: false },
    { userId: 3, date: "2024-11-19", status: "work", meeting: true },
    { userId: 3, date: "2024-11-20", status: "work", meeting: false },
    { userId: 3, date: "2024-11-21", status: "work", meeting: true },
    { userId: 3, date: "2024-11-22", status: "work", meeting: false },
    { userId: 3, date: "2024-11-23", status: "work", meeting: true },
    { userId: 3, date: "2024-11-24", status: "work", meeting: false },
    { userId: 3, date: "2024-11-25", status: "work", meeting: true },
    { userId: 3, date: "2024-11-26", status: "work", meeting: false },
    { userId: 3, date: "2024-11-27", status: "work", meeting: true },
    { userId: 3, date: "2024-11-28", status: "work", meeting: false },
    { userId: 3, date: "2024-11-29", status: "work", meeting: true },
    { userId: 3, date: "2024-11-30", status: "work", meeting: false },
    { userId: 4, date: "2024-09-01", status: "work", meeting: true },
    { userId: 4, date: "2024-09-02", status: "work", meeting: false },
    { userId: 4, date: "2024-09-03", status: "work", meeting: true },
    { userId: 4, date: "2024-09-04", status: "work", meeting: false },
    { userId: 4, date: "2024-09-05", status: "work", meeting: true },
    { userId: 4, date: "2024-09-06", status: "work", meeting: false },
    { userId: 4, date: "2024-09-07", status: "work", meeting: true },
    { userId: 4, date: "2024-09-08", status: "work", meeting: false },
    { userId: 4, date: "2024-09-09", status: "work", meeting: true },
    { userId: 4, date: "2024-09-10", status: "work", meeting: false },
    { userId: 4, date: "2024-09-11", status: "work", meeting: true },
    { userId: 4, date: "2024-09-12", status: "work", meeting: false },
    { userId: 4, date: "2024-09-13", status: "work", meeting: true },
    { userId: 4, date: "2024-09-14", status: "work", meeting: false },
    { userId: 4, date: "2024-09-15", status: "work", meeting: true },
    { userId: 4, date: "2024-09-16", status: "work", meeting: false },
    { userId: 4, date: "2024-09-17", status: "work", meeting: true },
    { userId: 4, date: "2024-09-18", status: "work", meeting: false },
    { userId: 4, date: "2024-09-19", status: "work", meeting: true },
    { userId: 4, date: "2024-09-20", status: "work", meeting: false },
    { userId: 4, date: "2024-09-21", status: "work", meeting: true },
    { userId: 4, date: "2024-09-22", status: "work", meeting: false },
    { userId: 4, date: "2024-09-25", status: "off", meeting: false },
    { userId: 4, date: "2024-10-14", status: "work", meeting: true },
    { userId: 4, date: "2024-10-30", status: "half-day", meeting: false },
    { userId: 4, date: "2024-11-18", status: "work", meeting: false },
    { userId: 4, date: "2024-11-29", status: "off", meeting: false },
    { userId: 1, date: "2024-09-27", status: "half-day", meeting: false },
    { userId: 2, date: "2024-10-18", status: "work", meeting: true },
    { userId: 3, date: "2024-11-01", status: "off", meeting: false },
    { userId: 4, date: "2024-11-11", status: "work", meeting: true },
    { userId: 1, date: "2024-10-24", status: "work", meeting: false },
    { userId: 2, date: "2024-11-06", status: "half-day", meeting: true },
    { userId: 3, date: "2024-09-20", status: "work", meeting: false },
    { userId: 4, date: "2024-10-03", status: "off", meeting: false },
    { userId: 1, date: "2024-11-15", status: "work", meeting: true },
    { userId: 2, date: "2024-09-19", status: "half-day", meeting: false },
    { userId: 4, date: "2024-10-01", status: "work", meeting: true },
    { userId: 4, date: "2024-10-02", status: "work", meeting: false },
    { userId: 4, date: "2024-10-03", status: "work", meeting: true },
    { userId: 4, date: "2024-10-04", status: "work", meeting: false },
    { userId: 4, date: "2024-10-07", status: "work", meeting: true },
    { userId: 4, date: "2024-10-08", status: "work", meeting: false },
    { userId: 4, date: "2024-10-09", status: "work", meeting: true },
    { userId: 4, date: "2024-10-10", status: "work", meeting: false },
    { userId: 4, date: "2024-10-11", status: "work", meeting: true },
    { userId: 4, date: "2024-10-14", status: "work", meeting: false },
    { userId: 4, date: "2024-10-15", status: "work", meeting: true },
    { userId: 4, date: "2024-10-16", status: "work", meeting: false },
    { userId: 4, date: "2024-10-17", status: "work", meeting: true },
    { userId: 4, date: "2024-10-18", status: "work", meeting: false },
    { userId: 4, date: "2024-10-21", status: "work", meeting: true },
    { userId: 4, date: "2024-10-22", status: "work", meeting: false },
    { userId: 4, date: "2024-10-23", status: "work", meeting: true },
    { userId: 4, date: "2024-10-24", status: "work", meeting: false },
    { userId: 4, date: "2024-10-25", status: "work", meeting: true },
    { userId: 4, date: "2024-10-28", status: "work", meeting: false },
    { userId: 4, date: "2024-10-29", status: "work", meeting: true },
    { userId: 4, date: "2024-10-30", status: "half-day", meeting: false },
    { userId: 4, date: "2024-10-31", status: "work", meeting: true },
    { userId: 4, date: "2024-11-01", status: "work", meeting: false },
    { userId: 4, date: "2024-11-04", status: "work", meeting: true },
    { userId: 4, date: "2024-11-05", status: "work", meeting: false },
    { userId: 4, date: "2024-11-06", status: "work", meeting: true },
    { userId: 4, date: "2024-11-07", status: "work", meeting: false },
    { userId: 4, date: "2024-11-08", status: "work", meeting: true },
    { userId: 4, date: "2024-11-11", status: "work", meeting: false },
    { userId: 4, date: "2024-11-12", status: "work", meeting: true },
    { userId: 4, date: "2024-11-13", status: "work", meeting: false },
    { userId: 4, date: "2024-11-14", status: "work", meeting: true },
    { userId: 4, date: "2024-11-15", status: "work", meeting: false },
    { userId: 4, date: "2024-11-18", status: "work", meeting: true },
    { userId: 4, date: "2024-11-19", status: "work", meeting: false },
    { userId: 4, date: "2024-11-20", status: "work", meeting: true },
    { userId: 4, date: "2024-11-21", status: "work", meeting: false },
    { userId: 4, date: "2024-11-22", status: "work", meeting: true },
    { userId: 4, date: "2024-11-25", status: "work", meeting: false },
    { userId: 4, date: "2024-11-26", status: "work", meeting: true },
    { userId: 4, date: "2024-11-27", status: "work", meeting: false },
    { userId: 4, date: "2024-11-28", status: "work", meeting: true },
    { userId: 4, date: "2024-11-29", status: "off", meeting: false },
];
