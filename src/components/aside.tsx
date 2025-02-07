"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import capitalizeString from "@/lib/capitalizeString";

function useComponentsList() {
    const [componentsList, setComponentsList] = useState<string[]>([]);

    useEffect(() => {
        async function loadComponents() {
            try {
                const response = await fetch('/api/getComponentsList');
                if (!response.ok) throw new Error("Failed to fetch code");
                const data = await response.json();

                setComponentsList(data.componentsList);
            } catch (error) {
                console.error("Error fetching components:", error);
            }
        }

        loadComponents();
    }, []);

    return componentsList;
}

export default function Aside() {
    const componentsList = useComponentsList();
    const currentPath = usePathname();
    console.log(currentPath)

    return (
        <aside className="shrink-0 sticky block self-start min-w-56">
            <nav>
                <ul>
                    <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">
                        All Components
                    </h4>
                    <div className="grid grid-flow-row auto-rows-max text-sm">
                        {componentsList.map((componentsItem: string, index: number) => (
                            <Link
                                href={`/components/${componentsItem}`}
                                className={cn(
                                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-sky-400 hover:translate-x-1 transition duration-200 text-muted-foreground",
                                    currentPath.includes(componentsItem) && "font-bold"
                                )}
                                key={componentsItem + index}
                            >
                                {capitalizeString(componentsItem)}
                            </Link>
                        ))}
                    </div>
                </ul>
            </nav>
        </aside>
    );
}