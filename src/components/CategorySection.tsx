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
    <section id={group.category} className="category-section fade-in">
      <div className="category-section-head">
        <h2>{GENIUS_CATEGORY_LABELS[group.category]}</h2>
        <p>此分類共 {group.items.length} 位科學家</p>
      </div>
      <ul className="genius-grid">
        {group.items.map((genius) => (
          <li key={genius.id} className="genius-card">
            <Link className="genius-card-link" href={`/genius/${genius.id}`}>
              {genius.avatarUrl ? (
                <img
                  className="genius-avatar"
                  src={genius.avatarUrl}
                  alt={`${genius.name} portrait`}
                  loading="lazy"
                />
              ) : null}
              <h3>{genius.name}</h3>
              <p className="genius-zh-name">{genius.chineseName}</p>
              {genius.era ? <p className="genius-era">{genius.era}</p> : null}
              {genius.bio ? <p className="genius-bio">{genius.bio}</p> : null}
              <span className="genius-cta">查看完整檔案</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
