import { CategorySection } from "../src/components/CategorySection";
import { GeniusNav } from "../src/components/GeniusNav";
import { GeniusService } from "../src/services/genius.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const service = new GeniusService();
  const groups = await service.listGroupedByCategory();
  const hasAnyGenius = groups.some((group) => group.items.length > 0);

  return (
    <main className="page-shell">
      <header className="hero fade-in">
        <p className="hero-kicker">The Geniuses Project</p>
        <h1>科學天才計畫</h1>
        <p className="hero-lead">
          按領域探索科學家，從數學到物理，逐步進入每位天才的公式世界與思想宇宙。
        </p>
      </header>

      <GeniusNav groups={groups} />

      <section className="content-stack">
        {groups.map((group) => (
          <CategorySection key={group.category} group={group} />
        ))}
      </section>

      {!hasAnyGenius ? (
        <section className="empty-state fade-in">
          <h2>目前尚無資料</h2>
          <p>你可以先加入拉馬努金與愛因斯坦資料，頁面會自動依分類分組顯示。</p>
        </section>
      ) : null}
    </main>
  );
}
