import type { Metadata } from 'next'
import { headers } from "next/headers";
import SubComponentLayout from "./subLayout";
import { capitalizeString } from '@/components/aside'

export async function generateMetadata(
): Promise<Metadata> {
  const headerList = headers();
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