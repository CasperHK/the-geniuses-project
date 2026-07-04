import type { GeniusWithAchievements } from "../types/genius";

interface GeniusProfileProps {
  profile: GeniusWithAchievements;
}

export function GeniusProfile({ profile }: GeniusProfileProps) {
  const { genius, achievements } = profile;

  return (
    <article>
      <header>
        <h1>{genius.name}</h1>
        <p>Category: {genius.category}</p>
        {genius.era ? <p>Era: {genius.era}</p> : null}
      </header>

      {genius.bio ? <p>{genius.bio}</p> : null}

      <section>
        <h2>Achievements</h2>
        {!achievements.length ? <p>No achievements yet.</p> : null}
        <ul>
          {achievements.map((achievement) => (
            <li key={achievement.id}>
              <h3>{achievement.title}</h3>
              {achievement.year ? <p>{achievement.year}</p> : null}
              {achievement.description ? <p>{achievement.description}</p> : null}
              {achievement.latex ? <pre>{achievement.latex}</pre> : null}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
