import { motion } from "framer-motion";

function FlashcardsSection({
  flashcards,
  progress,
  currentCard,
  setCurrentCard,
  showBack,
  setShowBack,
  shuffleFlashcards,
}) {
  if (flashcards.length === 0) return null;

  return (
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
  );
}

export default FlashcardsSection;