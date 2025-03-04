import type { Metadata } from 'next'
import { headers } from "next/headers";
import SubComponentLayout from "./subLayout";
import capitalizeString from '@/lib/capitalizeString';

export async function generateMetadata(
): Promise<Metadata> {
    const headerList = await headers();
    const pathname = (await headerList).get("x-current-path")?.split('/')[2] || 'Component';
    return {
        title: capitalizeString(pathname) + ' - Lunastra Ui',
    }
}

export default function ComponentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SubComponentLayout>
            {children}
        </SubComponentLayout>
    );
}