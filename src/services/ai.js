import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// Helper function for handling Gemini errors
const handleAIError = (error, defaultMessage) => {
  console.error("Gemini Error:", error);

  const message =
    error?.message ||
    error?.toString() ||
    JSON.stringify(error);

  if (
    message.includes("429") ||
    message.includes("RESOURCE_EXHAUSTED") ||
    message.toLowerCase().includes("quota")
  ) {
    throw new Error("⚠️ Daily AI limit reached. Please try again tomorrow.");
  }

  throw new Error(defaultMessage);
};

export const generateSummary = async (text) => {
  try {
    const prompt = `
You are Prepzy, an AI study assistant.

Summarize the following study notes.

Requirements:
- Explain the important concepts.
- Keep it concise.
- Use bullet points where appropriate.

Study Notes:

${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    handleAIError(
      error,
      "Something went wrong while generating the summary."
    );
  }
};

export const generateQuiz = async (text) => {
  try {
    const prompt = `
You are Prepzy, an AI study assistant.

Read the following study notes and generate 5 multiple-choice questions.

Requirements:
- 4 options (A, B, C, D)
- Mention the correct answer
- Suitable for exam preparation

Study Notes:

${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    handleAIError(
      error,
      "Something went wrong while generating the quiz."
    );
  }
};

export const generateFlashcards = async (text) => {
  try {
    const prompt = `
You are Prepzy, an AI study assistant.

Create 10 study flashcards.

Requirements:
- Front: Question
- Back: Answer
- Keep them concise.
- Cover the important concepts.

Study Notes:

${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    handleAIError(
      error,
      "Something went wrong while generating flashcards."
    );
  }
};

export const askQuestion = async (pdfText, question) => {
  try {
    const prompt = `
You are Prepzy, an AI study assistant.

Answer ONLY using the study notes below.

If the answer cannot be found, reply exactly:

"I couldn't find that information in your uploaded PDF."

Study Notes:

${pdfText}

Student Question:

${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    handleAIError(
      error,
      "Something went wrong while answering your question."
    );
  }
};