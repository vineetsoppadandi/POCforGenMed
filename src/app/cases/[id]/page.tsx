import { notFound } from "next/navigation";
import { allCases, getCaseById } from "@/data/cases";
import StationClient from "./StationClient";

export function generateStaticParams() {
  return allCases.map((c) => ({ id: c.id }));
}

export default async function StationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const osce = getCaseById(id);
  if (!osce) notFound();
  return <StationClient osce={osce} />;
}
