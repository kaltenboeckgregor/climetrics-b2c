// src/app/demo/page.tsx
import { redirect } from "next/navigation";
import { encodeId, type InputPayload } from "@/lib/compute";

export default function DemoPage() {
  const demo: InputPayload = {
    address: "Wien 1070",
    horizon: 2050,
    homeType: "apartment",
  };
  const id = encodeId(demo);
  redirect(`/report/${id}`);
}
