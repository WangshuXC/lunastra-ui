"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { IconTerminal2, IconAppWindow } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import capitalizeString from "@/lib/capitalizeString";

export default function SubComponentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isPreView, setIsPreview] = useState(true);
  const [demoCode, setDemoCode] = useState("");
  const [componentCode, setComponentCode] = useState("");
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const component = pathname.split("/components/")[1];

        if (!component) {
          throw new Error("Invalid component path");
        }

        const demoResponse = await fetch(`https://raw.githubusercontent.com/WangshuXC/lunastra-ui/refs/heads/main/src/app/components/(demos)/${component}/page.tsx`);
        const componentResponse = await fetch(`https://raw.githubusercontent.com/WangshuXC/lunastra-ui/refs/heads/main/src/components/ui/${component}.tsx`);
        if (!demoResponse.ok && !componentResponse) throw new Error("Failed to fetch code");

        const demoCode = await demoResponse.text();
        const componentCode = await componentResponse.text();
        setDemoCode(demoCode);
        setComponentCode(componentCode);
      } catch (error) {
        console.error("Error fetching code:", error);
        setDemoCode("// Error loading code");
        setComponentCode("// Error loading code");
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [pathname]);

  return (
    <div className="flex flex-col w-[70%] pb-10">
      <h1 className="text-4xl font-bold mb-8">
        {capitalizeString(pathname.split("/components/")[1])}
      </h1>
      <div className="flex gap-5 mb-3">
        <button
          className={cn(
            "rounded-md whitespace-nowrap text-gray-400 text-sm py-2 flex flex-row gap-2 justify-center items-center w-32",
            isPreView && "bg-gray-200 text-black"
          )}
          onClick={() => setIsPreview(true)}
        >
          <IconAppWindow className="h-4 w-4" />
          <span>Preview</span>
        </button>
        <button
          className={cn(
            "rounded-md whitespace-nowrap text-gray-400 text-sm py-2 flex flex-row gap-2 justify-center items-center w-32",
            !isPreView && "bg-gray-200 text-black"
          )}
          onClick={() => setIsPreview(false)}
        >
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
            <div className="max-h-[50vh] overflow-auto rounded-md">
              <CodeBlock
                language="tsx"
                filename={`${pathname.split("/components/")[1]}.tsx`}
                code={demoCode}
              />
            </div>
          )}
        </div>
      )}
      <h2 className="text-2xl font-bold mt-12 mb-4">Installation</h2>
      <div className="max-h-[50vh] overflow-auto rounded-md">
        <CodeBlock
          language="tsx"
          filename={`components/ui/${pathname.split("/components/")[1]}.tsx`}
          code={componentCode}
        />
      </div>
    </div>
  );
}
