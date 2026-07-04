import type { GeniusWithAchievements } from "../types/genius";
import { GENIUS_CATEGORY_LABELS } from "../constants/genius-categories";
import katex from "katex";

interface GeniusProfileProps {
  profile: GeniusWithAchievements;
}

function renderLatexToHtml(latex: string): string {
  try {
    return katex.renderToString(latex, {
      displayMode: true,
      throwOnError: false,
      strict: "ignore",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知錯誤";
    return `<span style="color:#b5482c;">公式渲染失敗：${message}</span>`;
  }
}

export function GeniusProfile({ profile }: GeniusProfileProps) {
  const { genius, achievements } = profile;

  return (
    <article className="profile-card fade-in">
      <header className="profile-header">
        <h1>
          {genius.name}
          <span className="profile-zh-name"> {genius.chineseName}</span>
        </h1>
        <div className="profile-meta">
          <span>分類：{GENIUS_CATEGORY_LABELS[genius.category]}</span>
          {genius.era ? <span>時代：{genius.era}</span> : null}
        </div>
      </header>

      {genius.bio ? <p className="profile-bio">{genius.bio}</p> : null}

      <section className="achievement-panel">
        <h2>主要成就</h2>
        {!achievements.length ? <p>尚未建立成就資料。</p> : null}
        <ul className="achievement-list">
          {achievements.map((achievement) => (
            <li key={achievement.id} className="achievement-item">
              <h3>{achievement.title}</h3>
              {achievement.year ? <p className="achievement-year">{achievement.year}</p> : null}
              {achievement.description ? <p>{achievement.description}</p> : null}
              {achievement.latex ? (
                <div className="latex-block">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderLatexToHtml(achievement.latex),
                    }}
                  />
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
