// src/app/report/[id]/page.tsx
import ReportClient from "./report-client";

// In Next 15 sind params als Promise typisiert
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ReportClient id={id} />;
}
