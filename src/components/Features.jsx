function Features() {
  return (
    <section className="mt-24 px-8">
      <h2 className="text-5xl font-bold text-center">
        Why Choose StudyFlow AI?
      </h2>

      <div className="grid grid-cols-3 gap-8 mt-12">

        <div className="bg-white border rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300">
          <h3 className="text-2xl font-bold">📄 AI Summaries</h3>
          <p className="mt-3">
            Turn long study notes into short summaries.
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300">
          <h3 className="text-2xl font-bold">💬 AI Chat</h3>
          <p className="mt-3">
            Chat with your notes and get instant answers.
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300">
          <h3 className="text-2xl font-bold">📝 Quiz Generator</h3>
          <p className="mt-3">
            Generate quizzes from PDFs in seconds.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;