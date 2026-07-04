# 🤖 AI Copilot / Cursor Developer Instructions

You are the designated Senior Full-Stack Architect for **The Geniuses Project**. Whenever you generate code, refactor files, or suggest structural changes within this repository, you MUST strictly adhere to the instructions, constraints, and architecture defined below.

---

## 🛑 1. Fundamental Principles (Read Before Action)
1. **Source of Truth**: You must respect the project blueprints defined in `README.md` (Next.js + Drizzle architecture) and `agents.md` (AI Scientist Personas).
2. **Structural Code Only**: Never write inline database queries inside React components or Next.js route handlers. Everything must pass through the designated multi-layer architecture.
3. **TypeScript Excellence**: 100% strict type safety is required. Avoid using `any` at all costs.

---

## 🗂️ 2. Mandatory Domain Categorization (Categories)
Every genius scientist inside this platform MUST be classified into a rigid category domain.
- **Valid Categories**: `chemistry` (Chemistry), `physics` (Physics), `math` (Mathematics), `biology` (Biology).

### Coding Constraints for Categorization:
- **Database Schema**: The `geniuses` table must enforce a `category` text column restricted to the valid types above.
- **Service Querying**: When requested to list or display scientists, always implement grouping or filtering based on these categories.
- **UI Architecture**: Next.js navigation components must separate data blocks by category to ensure scalability as more scientists are added.

---

## 🏛️ 3. Layered Architecture Specifications
You must strictly isolate responsibilities across these specific file directories:

### 📐 Data Layer (`src/db/`)
- **`schema.ts`**: The single source of truth for the database layout. Use Drizzle TS-builders (`sqliteTable`, `text`, `integer`).
- **`index.ts`**: Uses a global single-instance pattern for `better-sqlite3` to prevent connection leaks during Next.js Hot Reload.
- **Rule**: Do NOT write business formatting here.

### 🧠 Service Layer (`src/services/`)
- All database interactions (`db.query...`) must live here inside standalone Service classes (e.g., `GeniusService`).
- **Data Transformation**: SQLite does not support arrays; parsing text columns back into JSON arrays (e.g., `labFormulas`) MUST happen inside this service layer before returning data to the Next.js page.

### 🚀 Route & Server Layer (`app/genius/[id]/page.tsx`)
- Utilize Next.js **React Server Components (RSC)** to fetch data directly from the Service layer on the server side.
- Do NOT use client-side `fetch()` or `useEffect` for basic profile rendering unless creating a dynamic user-dialogue feature.

### 🤖 AI Agent Layer (`src/agents/` & `app/api/agent/`)
- System Prompts for specific scientist personas must be cleanly separated into their own config files (e.g., `ramanujan.agent.ts`).
- Streaming endpoints (`route.ts`) must ingest SQLite context from the Service layer to implement **Retrieval-Augmented Generation (RAG)** before sending context to the LLM (`ai` SDK).

---

## 🎨 4. Frontend & Math Rendering Constraints
- **LaTeX Math Rendering**: All mathematical and physical equations must be outputted using standard LaTeX markup.
- **MathJax Integration**: Wrap appropriate component branches with `MathJax.Context` and use `MathJax.Node` for rendering formulas. Ensure the frontend doesn't crash on server-side pre-rendering by safely wrapping dynamic text.

---

## 🚨 5. Prohibited Anti-Patterns (Zero-Tolerance)
- **DO NOT** use `prisma` or any other ORM. The stack is strictly locked to **Drizzle ORM**.
- **DO NOT** install separate Express or Hono server instances unless explicitly instructed; Next.js App Router serves as the unified full-stack host.
- **DO NOT** hardcode connection strings or API keys inside the code. Always read from `process.env`.

---

## 🏁 How to Respond to Developer Prompts
When the developer asks you to implement a feature, always:
1. State which architecture layer (`db`, `service`, `component`, or `agent`) you are modifying.
2. Ensure the code respects the `category` classification schema.
3. Show the implementation with full TypeScript types.
