import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-100">

      <Navbar />

      <main className="flex flex-col items-center justify-center text-center px-6 py-28">

        <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
          🚀 AI Exam Companion
        </span>

        <h1 className="mt-8 text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight">
          Prepzy
        </h1>

        <h2 className="mt-6 text-3xl font-semibold text-gray-700">
          From Panic to Prepared.
        </h2>

        <p className="mt-8 max-w-3xl text-lg text-gray-500 leading-8">
          Upload your notes and let Prepzy build your complete revision kit—
          smart summaries, quizzes, AI chat, flashcards, cheat sheets, and
          personalized study plans in minutes.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <button
            onClick={() => navigate("/login")}
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
          >
            ✨ Start Prepping
          </button>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">

          <div className="bg-white shadow-lg rounded-2xl p-6 hover:-translate-y-2 transition">
            📄
            <h3 className="font-bold mt-3">Smart Summaries</h3>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 hover:-translate-y-2 transition">
            🤖
            <h3 className="font-bold mt-3">AI Chat</h3>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 hover:-translate-y-2 transition">
            📝
            <h3 className="font-bold mt-3">Quiz Generator</h3>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 hover:-translate-y-2 transition">
            ⚡
            <h3 className="font-bold mt-3">Revision Kit</h3>
          </div>

        </div>

      </main>

      <Features />

      <Footer />

    </div>
  );
}

export default Home;