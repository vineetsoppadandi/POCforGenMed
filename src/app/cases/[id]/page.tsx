import { notFound } from "next/navigation";
import { allCases, getCaseById } from "@/data/cases";
import StationClient from "./StationClient";

export function generateStaticParams() {
  return allCases.map((c) => ({ id: c.id }));
}

export default function StationPage({ params }: { params: { id: string } }) {
  const osce = getCaseById(params.id);
  if (!osce) notFound();
  return <StationClient osce={osce} />;
}
