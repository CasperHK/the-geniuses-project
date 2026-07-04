import { CategorySection } from "../src/components/CategorySection";
import { GeniusNav } from "../src/components/GeniusNav";
import { GeniusService } from "../src/services/genius.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const service = new GeniusService();
  const groups = await service.listGroupedByCategory();

  return (
    <main>
      <h1>The Geniuses Project</h1>
      <p>Explore scientists grouped by domain.</p>

      <GeniusNav groups={groups} />

      {groups.map((group) => (
        <CategorySection key={group.category} group={group} />
      ))}
    </main>
  );
}
