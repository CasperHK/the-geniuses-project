import Link from "next/link";
import { GENIUS_CATEGORY_LABELS } from "../constants/genius-categories";
import type { GroupedGeniuses } from "../types/genius";

interface CategorySectionProps {
  group: GroupedGeniuses;
}

export function CategorySection({ group }: CategorySectionProps) {
  if (!group.items.length) {
    return null;
  }

  return (
    <section id={group.category}>
      <h2>{GENIUS_CATEGORY_LABELS[group.category]}</h2>
      <ul>
        {group.items.map((genius) => (
          <li key={genius.id}>
            <Link href={`/genius/${genius.id}`}>{genius.name}</Link>
            {genius.era ? <p>{genius.era}</p> : null}
            {genius.bio ? <p>{genius.bio}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
