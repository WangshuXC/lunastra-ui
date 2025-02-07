"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import capitalizeString from "@/lib/capitalizeString";
import { componentsList } from "@/app/data/componentsList";

export default function Aside() {
    const currentPath = usePathname();

    return (
        <aside className="shrink-0 sticky block self-start min-w-56">
            <nav>
                <ul>
                    <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">
                        All Components
                    </h4>
                    <div className="grid grid-flow-row auto-rows-max text-sm">
                        {componentsList.map((componentsItem: { name: string, description: string }, index: number) => (
                            <Link
                                href={`/components/${componentsItem.name}`}
                                className={cn(
                                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-sky-400 hover:translate-x-1 transition duration-200 text-muted-foreground",
                                    currentPath.includes(componentsItem.name) && "font-bold"
                                )}
                                key={componentsItem.name + index}
                            >
                                {capitalizeString(componentsItem.name)}
                            </Link>
                        ))}
                    </div>
                </ul>
            </nav>
        </aside>
    );
}