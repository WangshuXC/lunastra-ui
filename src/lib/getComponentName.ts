import { headers } from "next/headers";

export default async function getComponentName(){
    const headerList = headers();
    const pathname = (await headerList).get("x-current-path")?.split('/components/')[1] || '';

    return pathname;
}