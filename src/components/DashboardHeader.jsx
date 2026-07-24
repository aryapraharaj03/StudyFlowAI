import { LogOut } from "lucide-react";

function DashboardHeader({ userEmail, handleLogout }) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 text-white rounded-3xl p-10 shadow-2xl flex-1">

        <p className="uppercase tracking-widest text-sm opacity-80">
          AI Powered Learning
        </p>

        <h1 className="text-3xl md:text-5xl font-extrabold mt-2">
          🚀 Prepzy
        </h1>

        <p className="mt-4 text-xl text-purple-100 leading-relaxed max-w-2xl">
          Turn your study notes into summaries, quizzes,
          flashcards, and instant AI answers in seconds.
          Built for students who study smarter—not longer.
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
  );
}

export default DashboardHeader;