"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function TopBar() {
    return (
        <nav className="w-full z-30 bg-white border-b-2 flex flex-row justify-between">
            <div className="pl-3 pr-5 pb-3 pt-3">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center">
                        <button
                            className="inline p-2 rounded cursor-pointer mr-3"
                            data-drawer-target="default-sidebar"
                            data-drawer-toggle="default-sidebar"
                            aria-controls="default-sidebar"
                        >
                            <Image
                                src="/assets/menu.svg"
                                alt="logo"
                                width={30}
                                height={30}
                            />
                        </button>
                        <Image
                            src="/assets/logo.svg"
                            alt="logo"
                            width={48}
                            height={48}
                        />
                        <span className="text-2xl">Intranet</span>
                    </div>
                </div>
            </div>
            <div>
                <UserButton />
            </div>
        </nav>
    );
}
