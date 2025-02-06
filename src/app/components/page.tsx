import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full mx-auto px-8 flex-1 items-start flex gap-10">
      <Link href={"/components"}>Components</Link>
    </div>
  );
}
