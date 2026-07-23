import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const generateSummary = async (text) => {
  const prompt = `
You are an AI study assistant.

Summarize the following study notes in a clear, well-structured way.

- Explain the important concepts.
- Keep the summary concise.
- Use bullet points where appropriate.

Study Notes:

${text}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};

export const generateQuiz = async (text) => {
  const prompt = `
You are an AI study assistant.

Read the following study notes and generate 5 multiple-choice questions.

Requirements:
- Each question should have 4 options (A, B, C, D).
- Clearly mention the correct answer after each question.
- Make the questions suitable for exam preparation.

Study Notes:

${text}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};

export const generateFlashcards = async (text) => {
  const prompt = `
You are an AI study assistant.

Create 10 study flashcards from the following study notes.

Requirements:
- Each flashcard should have:
  Front: A question
  Back: A clear answer
- Keep them concise.
- Cover the most important concepts.

Study Notes:

${text}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};

export const askQuestion = async (pdfText, question) => {
  const prompt = `
You are StudyFlow AI, an intelligent study assistant.

Answer ONLY using the study notes below.

If the answer cannot be found in the notes, reply:
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
};