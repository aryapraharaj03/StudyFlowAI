function ChatSection({
  question,
  setQuestion,
  handleAskQuestion,
  isChatLoading,
  answer,
}) {
  return (
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
  );
}

export default ChatSection;