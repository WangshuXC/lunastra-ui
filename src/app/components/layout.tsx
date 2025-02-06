"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { cn } from "@/lib/utils";

export default function RootLayout({
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
        <div className="flex flex-col w-[70%]">
            <div className="flex gap-5 mb-3">
                <button
                    className={cn(
                        "rounded-md whitespace-nowrap text-gray-400 text-sm py-2 flex flex-row gap-2 justify-center items-center w-32",
                        isPreView && "bg-gray-200 text-black"
                    )}
                    onClick={() => setIsPreview(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4">
                        <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                        <path d="M6 8h.01"></path><path d="M9 8h.01"/>
                    </svg>
                    <span>Preview</span>
                </button>
                <button
                    className={cn(
                        "rounded-md whitespace-nowrap text-gray-400 text-sm py-2 flex flex-row gap-2 justify-center items-center w-32",
                        !isPreView && "bg-gray-200 text-black"
                    )}
                    onClick={() => setIsPreview(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4">
                        <path d="M8 9l3 3l-3 3"/>
                        <path d="M13 15l3 0"/>
                        <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/>
                    </svg>
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