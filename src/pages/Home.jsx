import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-100">

      <Navbar />

      <main className="relative overflow-hidden">

  <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400 opacity-20 blur-3xl rounded-full"></div>

  <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 opacity-20 blur-3xl rounded-full"></div>

  <div className="max-w-7xl mx-auto px-6 py-28 text-center">

    <span className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full font-semibold">
      🚀 AI Powered Last-Minute Study Assistant
    </span>

    <h1 className="mt-8 text-6xl md:text-8xl font-black text-gray-900 leading-tight">

      Ace Exams.

      <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
        Not Stress.
      </span>

    </h1>

    <p className="max-w-3xl mx-auto mt-8 text-xl text-gray-600 leading-9">

      Upload your notes once.

      Generate summaries.

      Create quizzes.

      Chat with your PDFs.

      Revise faster than ever with Prepzy.

    </p>

    <div className="mt-12 flex justify-center gap-6 flex-wrap">

      <button
        onClick={() => navigate("/login")}
        className="bg-gradient-to-r from-purple-600 to-blue-600
        text-white px-8 py-4 rounded-xl shadow-xl
        hover:scale-105 transition"
      >
        🚀 Start Prepping
      </button>

    </div>

    <div className="mt-20 grid md:grid-cols-4 gap-6">

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-purple-600">
          AI
        </h2>
        <p className="text-gray-500 mt-2">
          Smart Learning
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-purple-600">
          PDFs
        </h2>
        <p className="text-gray-500 mt-2">
          Interactive Notes
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-purple-600">
          Quiz
        </h2>
        <p className="text-gray-500 mt-2">
          Practice Smarter
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-purple-600">
          Chat
        </h2>
        <p className="text-gray-500 mt-2">
          Ask Anything
        </p>
      </div>

    </div>

  </div>

</main>

      <Features />

      <Footer />

    </div>
  );
}

export default Home;