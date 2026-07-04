import Link from "next/link";
import { notFound } from "next/navigation";
import { GeniusProfile } from "../../../src/components/GeniusProfile";
import { GeniusService } from "../../../src/services/genius.service";

interface GeniusPageProps {
  params: Promise<{ id: string }>;
}

export default async function GeniusPage({ params }: GeniusPageProps) {
  const { id } = await params;
  const service = new GeniusService();
  const profile = await service.getFullProfile(id);

  if (!profile) {
    notFound();
  }

  return (
    <main>
      <Link href="/">Back to categories</Link>
      <GeniusProfile profile={profile} />
    </main>
  );
}
