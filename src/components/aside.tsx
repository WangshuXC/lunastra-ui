import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { headers } from "next/headers";
import { cn } from '@/lib/utils';

// 获取 @/app/components/(demos) 文件夹下的所有子文件夹
const getDemoFolders = () => {
    const demosDir = path.join(process.cwd(), 'src/app/components/(demos)');
    const folders = fs.readdirSync(demosDir).filter((item) => {
        const itemPath = path.join(demosDir, item);
        return fs.statSync(itemPath).isDirectory(); // 只保留文件夹
    });
    return folders;
};

export function capitalizeString(str: string) {
    const words = str.split('-');

    const capitalizedWords = words.map(word => {
        if (word.length === 0) return '';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return capitalizedWords.join(' ');
}

export default async function Aside() {
    const demoFolders = getDemoFolders();
    const headerList = headers();
      const pathname = (await headerList).get("x-current-path")?.split('/')[2];

    return (
        <aside className="shrink-0 sticky block self-start min-w-56">
            <nav>
                <ul>
                    <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">All Components</h4>
                    <div className="grid grid-flow-row auto-rows-max text-sm">
                        {demoFolders.map((folder, index) => (
                            <Link 
                                href={`/components/${folder}`}
                                className={cn(
                                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-sky-400 hover:translate-x-1 transition duration-200 text-muted-foreground",
                                    pathname === folder && "font-bold"
                                )}
                                key={folder + index}>
                                {capitalizeString(folder)}
                            </Link>
                        ))}
                    </div>
                </ul>
            </nav>
        </aside>
    );
}