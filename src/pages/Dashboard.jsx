import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

import DashboardHeader from "../components/DashboardHeader";
import UploadCard from "../components/UploadCard";
import ChatSection from "../components/ChatSection";
import SummarySection from "../components/SummarySection";
import QuizSection from "../components/QuizSection";
import FlashcardsSection from "../components/FlashcardsSection";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { auth } from "../services/firebase";
import {
  generateSummary,
  generateQuiz,
  generateFlashcards,
  askQuestion,
} from "../services/ai";
import { saveRevisionKit } from "../services/firestore";

import { extractTextFromPDF } from "../utils/pdfReader";

function Dashboard() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [pdfText, setPdfText] = useState("");

  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [isChatLoading, setIsChatLoading] = useState(false);
const [currentCard, setCurrentCard] = useState(0);
const [showBack, setShowBack] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setUserEmail(auth.currentUser.email);
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
  toast.error("Please upload a PDF file.");
  return;
}

  setSelectedFile(file);

  // Clear old data
  setPdfText("");
  setSummary("");
  setQuiz("");
  setFlashcards([]);
  setQuestion("");
  setAnswer("");
  setCurrentCard(0);
  setShowBack(false);
};

  const handleSummary = async () => {
    if (!selectedFile) {
      toast.error("Please choose a PDF first.");
      return;
    }

    try {
      setLoading(true);

      let text = pdfText;

if (!text) {
  text = await extractTextFromPDF(selectedFile);
  setPdfText(text);
}

const result = await generateSummary(text);

      setSummary(result);
    } catch (error) {
  console.error(error);
  toast.error(error.message);
} finally {
      setLoading(false);
    }
  };

  const handleQuiz = async () => {
    if (!selectedFile) {
      toast.error("Please choose a PDF first.");
      return;
    }

    try {
      setLoading(true);

      const pdfText = await extractTextFromPDF(selectedFile);

const result = await generateQuiz(pdfText);

      setQuiz(result);
    } catch (error) {
  console.error(error);
  toast.error(error.message);
} finally {
      setLoading(false);
    }
  };

  const handleFlashcards = async () => {
    if (!selectedFile) {
      toast.error("Please choose a PDF first.");
      return;
    }

    try {
      setLoading(true);

      let text = pdfText;

if (!text) {
  text = await extractTextFromPDF(selectedFile);
  setPdfText(text);
}

const result = await generateFlashcards(text);

      const cards = result
  .split("Flashcard")
  .filter(card => card.trim() !== "")
  .map(card => {
    const front = card.match(/Front:(.*)/)?.[1]?.trim();
    const back = card.match(/Back:(.*)/)?.[1]?.trim();

    return { front, back };
  });

setFlashcards(cards);
setCurrentCard(0);
setShowBack(false);
    } catch (error) {
  console.error(error);
  toast.error(error.message);
} finally {
      setLoading(false);
    }
  };

  const handleRevisionKit = async () => {
  console.log("Button clicked");

  if (!selectedFile) {
    toast.error("Please choose a PDF first.");
    return;
  }

  try {
    setLoading(true);

    console.log("Generating summary...");

    let text = pdfText;

    if (!text) {
      text = await extractTextFromPDF(selectedFile);
      setPdfText(text);
    }

    const summaryResult = await generateSummary(text);

    console.log("Summary done");

    const quizResult = await generateQuiz(text);

    console.log("Quiz done");

    const flashcardsResult = await generateFlashcards(text);

    console.log("Flashcards done");

    // existing code...

    console.log("Calling saveRevisionKit...");

    await saveRevisionKit({
      summary: summaryResult,
      quiz: quizResult,
      flashcards: cards,
    });

    console.log("Finished saveRevisionKit");

    toast.success("🎉 Revision Kit Ready!");
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

  const handleAskQuestion = async () => {
  if (!selectedFile) {
    toast.error("Please choose a PDF first.");
    return;
  }

  if (!question.trim()) {
    toast.error("Please enter a question.");
    return;
  }

  try {
    setIsChatLoading(true);

  let text = pdfText;

if (!text) {
  text = await extractTextFromPDF(selectedFile);
  setPdfText(text);
}

const result = await askQuestion(text, question);

    setAnswer(result);
  } catch (error) {
  console.error(error);
  toast.error(error.message);
} finally {
    setIsChatLoading(false);
  }
};

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.success("Summary copied!");
    } catch (error) {
      toast.error("Failed to copy.");
    }
  };

  const downloadSummary = () => {
    const element = document.createElement("a");

    const file = new Blob([summary], {
      type: "text/plain",
    });

    element.href = URL.createObjectURL(file);
    element.download = "Prepzy_Summary.txt";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success("Summary downloaded!");
  };

  const shuffleFlashcards = () => {
  const shuffled = [...flashcards].sort(() => Math.random() - 0.5);

  setFlashcards(shuffled);
  setCurrentCard(0);
  setShowBack(false);

  toast.success("🃏 Flashcards shuffled!");
};

  const flashcardProgress =
  flashcards.length > 0
    ? ((currentCard + 1) / flashcards.length) * 100
    : 0;

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <Navbar />

      <main className="max-w-6xl mx-auto py-12 px-6">

      
        <DashboardHeader
  userEmail={userEmail}
  handleLogout={handleLogout}
/>

        <UploadCard
  selectedFile={selectedFile}
  handleFileChange={handleFileChange}
  handleRevisionKit={handleRevisionKit}
  loading={loading}
/>

          <ChatSection
  question={question}
  setQuestion={setQuestion}
  handleAskQuestion={handleAskQuestion}
  isChatLoading={isChatLoading}
  answer={answer}
/>
                    <SummarySection
  summary={summary}
  copySummary={copySummary}
  downloadSummary={downloadSummary}
/>

          <QuizSection quiz={quiz} />

          <FlashcardsSection
  flashcards={flashcards}
  progress={flashcardProgress}
  currentCard={currentCard}
  setCurrentCard={setCurrentCard}
  showBack={showBack}
  setShowBack={setShowBack}
  shuffleFlashcards={shuffleFlashcards}
/>

        
              </main>

      <Footer />
    </div>
  );
}

export default Dashboard;