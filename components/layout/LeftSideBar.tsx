"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLinks } from "../../constants/index";

const LeftSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { userId } = useAuth();

    return (
        <aside className="flex w-64 duration-75 pt-16 flex-col">
            <div className="pt-0 bg-white flex-col min-h-0 relative flex-1">
                <div className="pb-4 pt-5 overflow-y-auto flex-col flex-1">
                    <div className="pl-3 pr-3 bg-white flex-1">
                        {sidebarLinks.map((link) => {
                            // <li className="list-none space-y-reverse">
                            //     <a
                            //         className="font-normal text-base leading-6 p-2 items-center flex"
                            //         href=""
                            //     >
                            //         {link.label}
                            //     </a>
                            // </li>
                            const isActive =
                                (pathname.includes(link.route) &&
                                    link.route.length > 1) ||
                                pathname === link.route;

                            return (
                                <Link
                                    href={link.route}
                                    key={link.label}
                                    className={`font-normal text-base leading-6 p-2 items-center flex rounded-lg ${
                                        isActive && "bg-slate-100"
                                    }`}
                                >
                                    <Image
                                        src={link.imgURL}
                                        alt={link.label}
                                        width={24}
                                        height={24}
                                    />

                                    <span className="ml-3">{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default LeftSidebar;
