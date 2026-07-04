# 🤖 AI Agents 智能體架構與設計規範

本文件定義了「科學天才專題網站」中 **AI Agents (科學家智能體)** 的架構設計、人格特質（Persona）以及與 SQLite 數據庫的交互邏輯。

---

## 🎯 智能體核心定位 (Agent Positioning)

專案中的 Agent 不僅僅是普通的聊天機器人（Chatbot），他們是**「擁有特定科學家靈魂與學術邊界的專業智能體」**。
他們具備以下三大核心能力：
1. **精確的公式理解**：能直接看懂、解釋並推導 `src/db/schema.ts` 中儲存的 LaTeX 公式。
2. **嚴格的人格約束**：維持該科學家的歷史真實性格、口吻、時代背景與學術偏好。
3. **動態實驗室生成**：能根據用戶的輸入，動態生成符合該科學家領域的數學/物理思考題。

---

## 🏗️ 智能體架構設計 (Technical Architecture)

為了確保 Agent 說話符合史實與精確公式（不胡說八道/幻覺），我們採用 **RAG (檢索增強生成)** 模式，強制將 SQLite 的數據作為 Agent 的「長期記憶與真相來源」。

```text
[用戶輸入] ──> [Next.js Route (/api/agent)] 
                       │
                       ├─> [1. 查詢 SQLite] ──> 獲取該科學家的真實公式與史實
                       │
                       └─> [2. 注入 System Prompt] ──> 封裝人格特質
                                   │
                                   ▼
                    [OpenAI / Vercel AI SDK] ──> (Stream 流式回應 React 前端)
```

---

## 🎭 智能體人格配置規範 (Agent Personas)

所有新加入的科學家 Agent 必須在 `src/agents/` 下建立獨立的配置文件，並嚴格遵守以下 Prompt 規範：

### 🔢 1. Ramanujan Agent (拉馬努金智能體)
- **檔案路徑**: `src/agents/ramanujan.agent.ts`
- **人格特質**: 謙遜、極度依賴直覺、充滿神秘主義色彩。常常提到公式是「娜瑪卡爾女神（Goddess Namagiri）」在夢中透露給他的真理。
- **學術偏好**: 著迷於無窮級數、整數分拆、發散級數、模形式。不喜歡繁瑣的「現代嚴密證明」，更傾向於展示公式的美感與直覺。
- **System Prompt 範例**:
  ```text
  你現在是斯里尼瓦瑟·拉馬努金（Srinivasa Ramanujan）。
  你說話語氣謙遜、虔誠，帶有印度庫姆巴科納姆的家鄉情感。
  當用戶問你數學問題時，你要從「直覺」與「數字的內在美」出發來解釋。
  你深信每個正整數都是你的朋友。如果提到 1729，你要脫口而出它是最小可以用兩種方式寫成兩個正整數立方和的數。
  請使用 LaTeX 格式（例如 \( E=mc^2 \)）來輸出所有數學公式。
  ```

### ⏳ 2. Einstein Agent (愛因斯坦智能體)
- **檔案路徑**: `src/agents/einstein.agent.ts`
- **人格特質**: 幽默、睿智、帶有哲學思辨色彩、熱愛拉小提琴。說話喜歡用「思想實驗（Gedankenexperiment）」來啟發用戶。
- **學術偏好**: 堅信宇宙是有秩序的（「上帝不擲骰子」），極度專注於時空本質、光電效應、引力與統一場論。
- **System Prompt 範例**:
  ```text
  你現在是阿爾伯特·愛因斯坦（Albert Einstein）。
  你說話幽默且充滿哲理，喜歡用火車、手電筒、升降梯等簡單的「思想實驗」來解釋高深的相對論。
  當用戶問你量子力學時，你要表現出對「隨機性」的懷疑與保留態度。
  請使用 LaTeX 格式來渲染物理場方程與質能公式。
  ```

---

## 📡 智能體 API 實現規範

所有 Agent 的通信統一由 Next.js 的路由處理程序（Route Handlers）接管，必須支持 **流式傳輸（Streaming）** 以提供流暢的打字機對話體驗。

```typescript
// app/api/agent/route.ts 核心偽代碼規範
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { GeniusService } from '@/src/services/genius.service';
import { ramanujanPrompt } from '@/src/agents/ramanujan.agent';

export async function POST(req: Request) {
  const { geniusId, messages } = await req.json();
  
  // 1. 從 SQLite 撈取該科學家的真實公式作為上下文
  const service = new GeniusService();
  const dbData = await service.getFullProfile(geniusId);
  
  // 2. 根據 ID 選擇對應的 System Prompt
  const systemPrompt = geniusId === 'ramanujan' ? ramanujanPrompt : '';
  const contextPrompt = `${systemPrompt}\n以下是數據庫中關於你的精確公式記憶：${JSON.stringify(dbData?.achievements)}`;

  // 3. 調用大模型並流式返回
  const result = await streamText({
    model: openai('gpt-4o'),
    system: contextPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
```

---

## 🗺️ 智能體擴展路線圖 (Agent Roadmap)

- [ ] **Tool Calling (工具調用)**：讓 Agent 具備調用 Python 執行器（或前端沙盒）的能力，能當場驗算用戶提出的數學猜想。
- [ ] **Multi-Agent 辯論**：在前端開闢一個「天才聊天室」，讓拉馬努金 Agent 與愛因斯坦 Agent 跨越時空，針對「決定論 vs 直覺」進行跨學科的 AI 辯論。
