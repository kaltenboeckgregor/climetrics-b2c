"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header(){
  return (
    <header className="sticky top-0 z-40 glass border-b">
      <div className="mx-auto max-w-6xl h-16 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-climetrics.svg" alt="Climetrics" width={24} height={24} priority />
          <span className="font-semibold tracking-tight">Climetrics</span>
          <span className="ml-2 text-xs px-2 py-0.5 border rounded-full">B2C Beta</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-3 text-sm">
          <Link className="px-3 py-1.5 rounded-xl hover:bg-slate-50" href="/dashboard">Dashboard</Link>
          <a className="px-3 py-1.5 rounded-xl hover:bg-slate-50" href="#faq">FAQ</a>
          <Link className="btn btn-quiet" href="/dashboard">Live-Demo</Link>
        </nav>
      </div>
    </header>
  );
}
