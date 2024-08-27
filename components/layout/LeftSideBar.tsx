"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { Sidebar } from "flowbite-react";
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiViewBoards,
} from "react-icons/hi";

import { sidebarLinks } from "../../constants/index";

const LeftSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { userId } = useAuth();

    return (
        <aside className="flex w-64 duration-75 pt-16 flex-col transition-transform sm:translate-x-0 -translate-x-full h-full">
            <Sidebar aria-label="Default sidebar example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            icon={HiViewBoards}
                            label="Pro"
                            labelColor="dark"
                        >
                            Kanban
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiInbox} label="3">
                            Inbox
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiUser}>
                            Users
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiShoppingBag}>
                            Products
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiArrowSmRight}>
                            Sign In
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiTable}>
                            Sign Up
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </aside>
    );
};

export default LeftSidebar;
