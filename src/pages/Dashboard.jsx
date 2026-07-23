import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FileText,
  ClipboardList,
  Layers,
  MessageCircle,
  Download,
  Copy,
  LogOut,
} from "lucide-react";

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
    element.download = "StudyFlow_Summary.txt";

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

  const progress =
  flashcards.length > 0
    ? ((currentCard + 1) / flashcards.length) * 100
    : 0;

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <Navbar />

      <main className="max-w-6xl mx-auto py-12 px-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700
text-white rounded-3xl p-10 shadow-2xl flex-1">

  <p className="uppercase tracking-widest text-sm opacity-80">
    AI Powered Learning
  </p>

  <h1 className="text-3xl md:text-5xl font-extrabold mt-2">
    📚 StudyFlow AI
  </h1>

  <p className="mt-4 text-xl text-purple-100 leading-relaxed max-w-2xl">
    Upload your study notes and instantly generate
    AI summaries, quizzes, flashcards, and ask
    questions about your PDF—all in one place.
  </p>

  <div className="flex flex-wrap gap-3 mt-6">

    <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
      🤖 Gemini AI
    </span>

    <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
      📄 PDF Learning
    </span>

    <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
      ⚡ Smart Study
    </span>

  </div>

  <p className="mt-6 text-sm text-purple-200">
    Logged in as <span className="font-semibold">{userEmail}</span>
  </p>

</div>

          <button
  onClick={handleLogout}
  className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition"
>
  <LogOut size={18} />
  <span>Logout</span>
</button>

        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mt-8 border border-gray-100">

  <div className="text-center">

    <div className="text-6xl mb-4">
      📄
    </div>

    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
      Upload Your Study Notes
    </h2>

    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
      Upload your PDF and let StudyFlow AI instantly generate
      summaries, quizzes, flashcards, and answer your questions.
    </p>

    <button
      onClick={() => document.getElementById("fileUpload").click()}
      className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600
      text-white px-8 py-4 rounded-xl shadow-lg
      hover:scale-105 hover:shadow-xl transition-all duration-300"
    >
      📂 Choose PDF
    </button>

  </div>

          <input
            id="fileUpload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          {selectedFile && (
            <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5 shadow-sm">

  <p className="font-semibold text-green-700 text-lg">
    ✅ Selected PDF
  </p>

  <p className="text-gray-700 mt-2">
    {selectedFile.name}
  </p>

</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

            <button
              onClick={handleSummary}
              disabled={loading}
              className="flex items-center justify-center gap-2
bg-gradient-to-r from-purple-600 to-indigo-600
text-white px-7 py-4 rounded-xl shadow-md
hover:scale-105 transition-all duration-300
disabled:bg-gray-400"
            >
              {loading ? (
  "Generating..."
) : (
  <>
    <FileText size={20} />
    <span>Summary</span>
  </>
)}
            </button>

            <button
              onClick={handleQuiz}
              disabled={loading}
              className="flex items-center justify-center gap-2
bg-gradient-to-r from-green-500 to-emerald-600
text-white px-7 py-4 rounded-xl shadow-md
hover:scale-105 transition-all duration-300
disabled:bg-gray-400"
            >
              {loading ? (
  "Generating..."
) : (
  <>
    <ClipboardList size={20} />
    <span>Quiz</span>
  </>
)}
            </button>

            <button
              onClick={handleFlashcards}
              disabled={loading}
              className="flex items-center justify-center gap-2
bg-gradient-to-r from-orange-500 to-red-500
text-white px-7 py-4 rounded-xl shadow-md
hover:scale-105 transition-all duration-300
disabled:bg-gray-400"
            >
              {loading ? (
  "Generating..."
) : (
  <>
    <Layers size={20} />
    <span>Flashcards</span>
  </>
)}
            </button>

          </div>

          {/* Chat with PDF */}
<div className="mt-8 bg-gray-50 rounded-xl p-6 border">

  <h3 className="text-2xl font-bold mb-4">
    💬 Chat with your PDF
  </h3>

  <input
    type="text"
    placeholder="Ask anything about your uploaded PDF..."
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    className="w-full border rounded-lg p-3 mb-4"
  />

  <button
    onClick={handleAskQuestion}
    disabled={isChatLoading}
    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
  >
    {isChatLoading ? "Thinking..." : "🤖 Ask AI"}
  </button>

  {answer && (
    <div className="mt-6 bg-white rounded-lg p-4 border">
      <h4 className="font-bold text-lg mb-2">
        AI Answer
      </h4>

      <pre className="whitespace-pre-wrap text-gray-700">
        {answer}
      </pre>
    </div>
  )}

</div>
                    {summary && (
  <div className="mt-10 overflow-hidden rounded-3xl shadow-xl border border-gray-200 bg-white">

    {/* Header */}
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

      <div>
        <h3 className="text-2xl font-bold">
          📑 AI Summary
        </h3>

        <p className="text-purple-100 text-sm mt-1">
          Generated from your uploaded PDF
        </p>
      </div>

      <div className="flex gap-3">

        <button
          onClick={copySummary}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
        >
          📋 Copy
        </button>

        <button
          onClick={downloadSummary}
          className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-100 transition"
        >
          ⬇ Download
        </button>

      </div>

    </div>

    {/* Body */}
    <div className="p-8 bg-gray-50">

      <pre className="whitespace-pre-wrap text-gray-700 leading-8 text-[16px]">
        {summary}
      </pre>

    </div>

  </div>
)}

          {quiz && (
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-2xl font-bold mb-4">
                📝 AI Quiz
              </h3>

              <pre className="whitespace-pre-wrap text-gray-700">
                {quiz}
              </pre>
            </div>
          )}

          {flashcards.length > 0 && (
  <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border">

    <h3 className="text-2xl font-bold mb-6">
      🃏 AI Flashcards
    </h3>

    <div className="mb-6">

  <div className="flex justify-between text-sm text-gray-600 mb-2">
    <span>Study Progress</span>
    <span>{Math.round(progress)}%</span>
  </div>

  <div className="w-full bg-gray-200 rounded-full h-3">
    <div
      className="bg-purple-600 h-3 rounded-full transition-all duration-500"
      style={{ width: `${progress}%` }}
    ></div>
  </div>

</div>

<div className="flex justify-end mb-4">
  <button
    onClick={shuffleFlashcards}
    className="bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 transition"
  >
    🔀 Shuffle Flashcards
  </button>
</div>

    <motion.div
  key={showBack ? "back" : "front"}
  initial={{ rotateY: 90, opacity: 0 }}
  animate={{ rotateY: 0, opacity: 1 }}
  transition={{ duration: 0.3 }}
  onClick={() => setShowBack(!showBack)}
  className={`cursor-pointer rounded-2xl p-10 text-center min-h-[260px]
  flex items-center justify-center shadow-xl transition-all duration-300
  ${
    showBack
      ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
      : "bg-gradient-to-br from-orange-400 to-red-500 text-white"
  }`}
>
  <div>
    <p className="text-sm opacity-80 mb-3">
      {showBack ? "Back" : "Front"}
    </p>

    <h2 className="text-2xl font-bold">
      {showBack
        ? flashcards[currentCard]?.back || "No answer available"
        : flashcards[currentCard]?.front || "No question available"}
    </h2>

    <p className="mt-6 opacity-80">
      🔄 Click anywhere on the card to flip
    </p>
  </div>
</motion.div>

    <div className="flex justify-between items-center mt-6">

      <button
        disabled={currentCard === 0}
        onClick={() => {
          setCurrentCard(currentCard - 1);
          setShowBack(false);
        }}
        className="bg-gray-500 text-white px-5 py-2 rounded disabled:bg-gray-300"
      >
        ⬅ Previous
      </button>

      <p className="font-semibold text-purple-700 text-lg">
  📚 Card {currentCard + 1} of {flashcards.length}
</p>

      <button
        disabled={currentCard === flashcards.length - 1}
        onClick={() => {
          setCurrentCard(currentCard + 1);
          setShowBack(false);
        }}
        className="bg-purple-600 text-white px-5 py-2 rounded disabled:bg-gray-300"
      >
        Next ➡
      </button>

    </div>

  </div>
)}

        </div>
              </main>

      <Footer />
    </div>
  );
}

export default Dashboard;