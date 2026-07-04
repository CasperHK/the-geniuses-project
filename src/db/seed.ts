import { eq, notInArray } from "drizzle-orm";
import { db } from "./index";
import { achievements, geniuses } from "./schema";

const now = new Date();

const profiles = [
  {
    genius: {
      id: "ramanujan",
      name: "Srinivasa Ramanujan",
      chineseName: "斯里尼瓦瑟・拉馬努金",
      slug: "ramanujan",
      category: "math" as const,
      era: "1887-1920",
      bio: "印度傳奇數學家，憑直覺在數論與無窮級數領域留下大量驚人公式。",
      avatarUrl: "/avatars/ramanujan.svg",
      createdAt: now,
      updatedAt: now,
    },
    achievements: [
      {
        title: "1729 計程車數",
        description: "最小可用兩種方式寫成兩個正整數立方和的數。",
        latex: "1729 = 1^3 + 12^3 = 9^3 + 10^3",
        year: 1918,
      },
      {
        title: "Ramanujan 的 pi 級數",
        description: "快速收斂的 1/pi 無窮級數。",
        latex:
          "\\frac{1}{\\pi}=\\frac{2\\sqrt{2}}{9801}\\sum_{k=0}^{\\infty}\\frac{(4k)!(1103+26390k)}{(k!)^4 396^{4k}}",
        year: 1914,
      },
    ],
  },
  {
    genius: {
      id: "einstein",
      name: "Albert Einstein",
      chineseName: "阿爾伯特・愛因斯坦",
      slug: "einstein",
      category: "physics" as const,
      era: "1879-1955",
      bio: "現代物理學之父，以相對論與質能等價改變人類對宇宙的理解。",
      avatarUrl: "/avatars/einstein.svg",
      createdAt: now,
      updatedAt: now,
    },
    achievements: [
      {
        title: "質能等價",
        description: "揭示質量與能量本質可互換。",
        latex: "E = mc^2",
        year: 1905,
      },
      {
        title: "廣義相對論場方程",
        description: "重力可視為時空曲率的結果。",
        latex: "G_{\\mu\\nu}+\\Lambda g_{\\mu\\nu}=\\kappa T_{\\mu\\nu}",
        year: 1915,
      },
    ],
  },
  {
    genius: {
      id: "darwin",
      name: "Charles Darwin",
      chineseName: "查爾斯・達爾文",
      slug: "charles-darwin",
      category: "biology" as const,
      era: "1809-1882",
      bio: "演化論的奠基者，以自然選擇理論改變了人類對生命起源與多樣性的理解。",
      avatarUrl: "/avatars/darwin.svg",
      createdAt: now,
      updatedAt: now,
    },
    achievements: [
      {
        title: "哈地－溫伯格平衡",
        description: "描述理想族群中基因型頻率與等位基因頻率的穩定關係。",
        latex: "p^2 + 2pq + q^2 = 1",
        year: 1908,
      },
      {
        title: "族群增長模型",
        description: "描述生物族群在資源限制下的增長與收斂行為。",
        latex: "\\frac{dN}{dt} = rN\left(1 - \\frac{N}{K}\right)",
        year: 1920,
      },
    ],
  },
  {
    genius: {
      id: "curie",
      name: "Marie Curie",
      chineseName: "瑪麗・居禮",
      slug: "marie-curie",
      category: "chemistry" as const,
      era: "1867-1934",
      bio: "放射化學先驅，發現釙與鐳，並兩度獲得諾貝爾獎。",
      avatarUrl: "/avatars/curie.svg",
      createdAt: now,
      updatedAt: now,
    },
    achievements: [
      {
        title: "放射性衰變定律",
        description: "放射性核種數量隨時間呈指數衰減。",
        latex: "N(t)=N_0e^{-\\lambda t}",
        year: 1902,
      },
      {
        title: "活度公式",
        description: "放射性活度與粒子數關係。",
        latex: "A=\\lambda N",
        year: 1902,
      },
    ],
  },
];

async function seed(): Promise<void> {
  const profileIds = profiles.map((profile) => profile.genius.id);

  await db.delete(achievements).where(notInArray(achievements.geniusId, profileIds));
  await db.delete(geniuses).where(notInArray(geniuses.id, profileIds));

  for (const profile of profiles) {
    await db
      .insert(geniuses)
      .values(profile.genius)
      .onConflictDoUpdate({
        target: geniuses.id,
        set: {
          name: profile.genius.name,
          chineseName: profile.genius.chineseName,
          slug: profile.genius.slug,
          category: profile.genius.category,
          era: profile.genius.era,
          bio: profile.genius.bio,
          avatarUrl: profile.genius.avatarUrl,
          updatedAt: new Date(),
        },
      });

    await db.delete(achievements).where(eq(achievements.geniusId, profile.genius.id));

    await db.insert(achievements).values(
      profile.achievements.map((item) => ({
        geniusId: profile.genius.id,
        title: item.title,
        description: item.description,
        latex: item.latex,
        year: item.year,
      }))
    );
  }

  console.log("Seed 完成：已寫入 4 位科學家與成就資料。");
}

seed().catch((error) => {
  console.error("Seed 失敗:", error);
  process.exit(1);
});
