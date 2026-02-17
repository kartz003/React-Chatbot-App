import { GoogleGenerativeAI } from "@google/generative-ai";

const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

export class Assistant {
    #chat;
    #model;
    name = "googleai";
    constructor(model = "gemini-3-flash-preview") {
        this.#model = model;
        const gemini = googleai.getGenerativeModel({ model });
        this.#chat = gemini.startChat({ history: [] });
    }

    createChat(history) {
        const gemini = googleai.getGenerativeModel({ model: this.#model });
        this.#chat = gemini?.startChat({ 
            history: history
                .filter(({ role }) => role !== "system")
                .map(({ role, content }) => ({
                    role: role === "assistant" ? "model" : role,
                    parts: [{ text: content }]
                })) 
        });
    }

    async chat(content) {
        try {
            const result = await this.#chat.sendMessage(content);
            return result.response.text();
        } catch (error) {
            throw error;
        }
    }
    
    async *chatStream(content) {
        try {
            const result = await this.#chat.sendMessageStream(content); 
            for await (const chunk of result.stream) {
                yield chunk.text();
            }
        } catch (error) {
            throw error;
        }
    }
}