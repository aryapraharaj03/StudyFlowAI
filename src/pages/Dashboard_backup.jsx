import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import {
  FileText,
  ClipboardList,
  Layers,
  MessageCircle,
  Download,
  Copy,
} from "lucide-react";
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

  const [progress, setProgress] = useState(0);
const [progressMessage, setProgressMessage] = useState("");

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
      toast.error(
  error.message.includes("429")
    ? "⚠️ Daily AI limit reached. Please try again later."
    : error.message
);
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
      toast.error(
  error.message.includes("429")
    ? "⚠️ Daily AI limit reached. Please try again later."
    : error.message
);
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
      toast.error(
  error.message.includes("429")
    ? "⚠️ Daily AI limit reached. Please try again later."
    : error.message
);
    } finally {
      setLoading(false);
    }
  };

  const handleRevisionKit = async () => {
  if (!selectedFile) {
    toast.error("Please choose a PDF first.");
    return;
  }

  try {
    setLoading(true);
    setProgress(10);
setProgressMessage("📄 Reading your PDF...");

    let text = pdfText;

    if (!text) {
      text = await extractTextFromPDF(selectedFile);
      setPdfText(text);
      setProgress(30);
setProgressMessage("📝 Creating Summary...");
    }

    const summaryResult = await generateSummary(text);
    setSummary(summaryResult);
    setProgress(55);
setProgressMessage("🧠 Creating Quiz...");

    const quizResult = await generateQuiz(text);
    setQuiz(quizResult);
    setProgress(80);
setProgressMessage("🃏 Creating Flashcards...");

    const flashcardsResult = await generateFlashcards(text);

    const cards = flashcardsResult
      .split("Flashcard")
      .filter(card => card.trim() !== "")
      .map(card => ({
        front: card.match(/Front:(.*)/)?.[1]?.trim(),
        back: card.match(/Back:(.*)/)?.[1]?.trim(),
      }));

    setFlashcards(cards);
    setProgress(100);
setProgressMessage("🎉 Revision Kit Ready!");
    setCurrentCard(0);
    setShowBack(false);

    toast.success("🎉 Revision Kit Ready!");
  } catch (error) {
    console.error(error);
    toast.error(
  error.message.includes("429")
    ? "⚠️ Daily AI limit reached. Please try again later."
    : error.message
);
  } finally {
  setTimeout(() => {
    setLoading(false);
    setProgress(0);
    setProgressMessage("");
  }, 1200);
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
    toast.error(
  error.message.includes("429")
    ? "⚠️ Daily AI limit reached. Please try again later."
    : error.message
);
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

{loading && (
  <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border">

    <p className="text-red-600 text-2xl font-bold">
  TEST
</p>

    <div className="w-full bg-gray-200 rounded-full h-4">

      <div
        className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>

    </div>

    <p className="text-right mt-2 text-gray-600">
      {progress}%
    </p>

  </div>
)}

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