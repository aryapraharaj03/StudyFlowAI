import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
    const navigate = useNavigate();
  return (
  <div className="min-h-screen bg-gray-100">

    <Navbar />

    <main className="flex flex-col items-center justify-center text-center mt-24 py-20 bg-gradient-to-b from-purple-50 to-gray-100 rounded-3xl mx-6">

      <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900">
        StudyFlow AI
      </h1>

      <h2 className="text-3xl text-gray-600 mt-6">
        Study Smarter. Score Higher.
      </h2>

      <p className="mt-6 max-w-2xl text-gray-500">
        AI-powered summaries, quizzes, and chat with your study notes.
      </p>

      <div className="mt-10 flex gap-4">

        <button
  onClick={() => navigate("/signup")}
  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 hover:scale-105 transition duration-300"
>
  Get Started
</button>

        <button className="border border-gray-400 px-6 py-3 rounded-lg hover:bg-gray-200 hover:scale-105 transition duration-300">
          Learn More
        </button>

      </div>

    </main>

    <Features />

<Footer />

</div>
);
}

export default Home;