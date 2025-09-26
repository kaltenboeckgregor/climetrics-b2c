"use client";
export default function Badge({children}:{children:React.ReactNode}){
  return <span className="px-2 py-1 border rounded-xl text-sm">{children}</span>;
}
