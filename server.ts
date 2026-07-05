import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Gemini API calls will fail.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Route for Açaí Business Advisor
app.post("/api/gemini/consultant", async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!apiKey) {
      return res.status(500).json({
        error: "A chave de API do Gemini não está configurada neste ambiente.",
        suggestion: "Por favor, configure GEMINI_API_KEY no painel de Secrets.",
      });
    }

    const ai = getGeminiClient();

    // Construct a rich system instruction to guide the model specifically on Brazilian Açaí Reselling
    const systemInstruction = `
Você é o "Mestre do Açaí", um consultor empresarial sênior do mercado de distribuição e varejo de açaí no Brasil.
Seu objetivo é ajudar novos revendedores, pequenos empreendedores, donos de açaíterias e revendedores de potes/caixas a maximizarem seus lucros e estruturarem seus modelos de negócio.

Forneça orientações precisas sobre:
1. Margens de lucro e precificação (ex: Caixas de 10L que custam em média R$110 a R$160 na revenda e geram cerca de 30 a 35 copos de 300ml. Custo de insumos + adicionais variando de R$3 a R$5, vendidos a R$12 a R$15, proporcionando margens brutas excelentes de mais de 100% a 200%).
2. Requisitos de armazenamento (freezers específicos que mantêm temperaturas abaixo de -18°C para preservar a cremosidade sem formar cristais de gelo).
3. Melhores acompanhamentos (leite condensado, leite em pó, banana, morango, granola, creme de avelã/ninho, etc.) e técnicas de montagem "Self-Service" vs "Copos Montados".
4. Como atrair clientes e fazer branding irresistível, especialmente com vídeos de copos de açaí (vídeos de ultra-sensorial, açaí caindo, leite condensado escorrendo).

Responda sempre em Português do Brasil com entusiasmo, clareza, formatação Markdown elegante, espaçamentos limpos e foco prático em rentabilidade. Cite exemplos reais de valores em Reais (R$).
Se o usuário pedir cálculos, faça simulações detalhadas e recomende preços estratégicos.
`;

    // Process standard chat format
    const contents = history ? [...history, { role: "user", parts: [{ text: message }] }] : message;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text,
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Ocorreu um erro ao processar a consulta com o consultor de açaí.",
      details: error.message || error,
    });
  }
});

// Configure Vite or Static server
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Started Express Server in Development mode with Vite middleware.");
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Started Express Server in Production mode serving built files.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on address http://0.0.0.0:${PORT}`);
  });
}

setupServer();
