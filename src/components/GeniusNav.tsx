import Link from "next/link";
import { GENIUS_CATEGORY_LABELS } from "../constants/genius-categories";
import type { GroupedGeniuses } from "../types/genius";

interface GeniusNavProps {
  groups: GroupedGeniuses[];
}

export function GeniusNav({ groups }: GeniusNavProps) {
  return (
    <nav aria-label="Genius categories">
      <ul>
        {groups
          .filter((group) => group.items.length > 0)
          .map((group) => (
            <li key={group.category}>
              <Link href={`#${group.category}`}>{GENIUS_CATEGORY_LABELS[group.category]}</Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
