function UploadCard({
  selectedFile,
  handleFileChange,
  handleRevisionKit,
  loading,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 mt-8 border border-gray-100">

      <div className="text-center">

        <div className="text-6xl mb-4">
          📄
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Upload Your Study Notes
        </h2>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Upload your notes and let Prepzy instantly create
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

      <div className="mt-8">

        <button
          onClick={handleRevisionKit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600
          text-white py-5 rounded-2xl text-xl font-bold
          shadow-xl hover:scale-[1.02] transition-all duration-300
          disabled:bg-gray-400"
        >
          {loading
            ? "🤖 Building your Revision Kit..."
            : "✨ Build My Revision Kit"}
        </button>

        <p className="text-center text-gray-500 mt-4">
          Generates your AI Summary, Quiz and Flashcards in one click.
        </p>

      </div>

    </div>
  );
}

export default UploadCard;