"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { IconTerminal2, IconAppWindow } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function SubComponentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isPreView, setIsPreview] = useState(true);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const fetchCode = async () => {
            try {
                // 从路径中提取组件名称
                const component = pathname.split("/components/")[1];

                if (!component) {
                    throw new Error("Invalid component path");
                }

                const response = await fetch(`/api/getCode/${component}`);
                if (!response.ok) throw new Error("Failed to fetch code");

                const data = await response.json();
                setCode(data.code);
            } catch (error) {
                console.error("Error fetching code:", error);
                setCode("// Error loading code");
            } finally {
                setLoading(false);
            }
        };

        fetchCode();
    }, [pathname]);

    return (
        <div className="flex flex-col w-[70%] pb-10">
            <div className="flex gap-5 mb-3">
                <button
                    className={cn(
                        "rounded-md whitespace-nowrap text-gray-400 text-sm py-2 flex flex-row gap-2 justify-center items-center w-32",
                        isPreView && "bg-gray-200 text-black"
                    )}
                    onClick={() => setIsPreview(true)}>
                    <IconAppWindow className="h-4 w-4" />
                    <span>Preview</span>
                </button>
                <button
                    className={cn(
                        "rounded-md whitespace-nowrap text-gray-400 text-sm py-2 flex flex-row gap-2 justify-center items-center w-32",
                        !isPreView && "bg-gray-200 text-black"
                    )}
                    onClick={() => setIsPreview(false)}>
                    <IconTerminal2 className="h-4 w-4" />
                    <span>Code</span>
                </button>
            </div>
            {isPreView ? (
                <main className="flex min-h-[350px] justify-center items-center p-2 sm:p-10 border rounded-lg bg-[url('/block.svg')]">
                    {children}
                </main>
            ) : (
                <div className="mx-auto w-full">
                    {loading ? (
                        <div>Loading code...</div>
                    ) : (
                        <CodeBlock
                            language="tsx"
                            filename={`${pathname.split("/components/")[1]}.tsx`}
                            code={code}
                        />
                    )}
                </div>
            )}
        </div>
    );
}