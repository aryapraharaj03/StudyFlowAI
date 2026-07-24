function QuizSection({ quiz }) {
  if (!quiz) return null;

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border">
      <h3 className="text-2xl font-bold mb-4">
        📝 AI Quiz
      </h3>

      <pre className="whitespace-pre-wrap text-gray-700">
        {quiz}
      </pre>
    </div>
  );
}

export default QuizSection;