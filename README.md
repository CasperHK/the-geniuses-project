# 🌌 The Geniuses Project - Next.js 全棧科學天才 AI 互動網站

[![Next.js](https://shields.io)](https://nextjs.org)
[![Drizzle ORM](https://shields.io)](https://drizzle.team)
[![SQLite](https://shields.io)](https://sqlite.org)
[![AI Agents](https://shields.io)](#-ai-agents-智能體架構)

本專案是一個基於 **Next.js (App Router)** 構建的高結構化全棧專題平台，旨在致敬拉馬努金、愛因斯坦等傳奇科學天才。專案拋棄了傳統零散的後端架構，利用 Next.js 服務器組件直接驅動 **Drizzle ORM + SQLite**，並前瞻性地集成了 **AI Agent（科學家智能體）** 架構，讓用戶不僅能瀏覽靜態公式，還能與天才的 AI 分身進行深度學術互動。

---

## 🏛️ 結構化目錄規範 (Project Architecture)

專案嚴格區分數據、視圖與智能體邏輯，利用 Next.js 內置的文件架構實現最優化的職責分離：

```text
├── src/
│   ├── db/
│   │   ├── index.ts          # 🔌 數據庫連接中心 (支持 Next.js 熱重載單例)
│   │   └── schema.ts         # 📐 Drizzle 數據庫建模 (唯一真相來源)
│   ├── services/
│   │   └── genius.service.ts # 🧠 核心業務邏輯層 (與 ORM 交互與數據包裝)
│   ├── agents/               # 🤖 AI Agent 核心目錄（詳細規範見 agents.md）
│   │   ├── ramanujan.agent.ts# 🔢 拉馬努金 AI 智能體邏輯
│   │   └── einstein.agent.ts # ⏳ 愛因斯坦 AI 智能體邏輯
│   └── components/
│       └── GeniusProfile.tsx # 🎨 前端客戶端組件 (公式渲染與 Agent 對話界面)
├── app/
│   ├── api/
│   │   └── agent/route.ts    # 📡 統一的 AI Agent 流式傳輸（Streaming）API 端點
│   └── genius/
│       └── [id]/
│           └── page.tsx      # 🚀 全棧路由核心 (Server Component，直接讀取 SQLite)
└── agents.md                 # 📄 智能體架構與 Persona 設計規範
```

---

## 🛠️ 技術優勢 (Technical Highlights)

1. **零 API 膠水代碼**: 不需要編寫獨立的後端服務器，Next.js 服務器組件（RSC）在服務器端直接調用 Service 讀取本地 `sqlite.db`。
2. **極致加載速度 (SSR)**: 科學家的傳奇故事與 LaTeX 公式在服務器端渲染成 HTML，瞬間送達瀏覽器，對 SEO 極度友善。
3. **數據與智能體雙驅動**: SQLite 負責提供精確的歷史史實與公式真相（RAG 基座），AI Agent 負責提供動態對話與公式推導。

---

## 📦 快速開始 (Quick Start)

### 1. 初始化環境與安裝依賴
```bash
# 安裝 Drizzle ORM、本地 SQLite 驅動、數學公式渲染套件
npm install drizzle-orm better-sqlite3 react-mathjax2

# 安裝 AI Agent 核心依賴（推薦使用 Vercel AI SDK）
npm install ai @ai-sdk/openai dotenv

# 安裝 開發工具
npm install -D drizzle-kit @types/better-sqlite3 tsx
```

### 2. 配置環境變量
在項目根目錄創建 `.env` 文件：
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. 數據庫初始化與遷移 (Drizzle Workflow)
```bash
# 🔄 1. 生成 SQL 遷移文件
npx drizzle-kit generate

# 🚀 2. 將結構正式套用到本地 sqlite.db
npx drizzle-kit migrate
```

### 4. 啟動開發環境
```bash
npm run dev
```
打開瀏覽器訪問 `http://localhost:3000/genius/ramanujan`。

---

## 👑 視覺化數據庫後台 (Drizzle Studio)

專案運行期間，隨時可以打開另一個終端執行：
```bash
npx drizzle-kit studio
```
訪問 `https://drizzle.studio`，即可直接在瀏覽器中對科學家的生平、公式、實驗室故事進行視覺化增刪改查。

---

## 📄 開源協議 (License)

本專案採用 **MIT License**。智能體設計與架構規範請參考專案內的 `agents.md`。
