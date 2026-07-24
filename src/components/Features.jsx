import { useState } from "react";

function Features() {
  const [active, setActive] = useState(null);

  const features = [
    {
      title: "📄 Smart Summaries",
      description:
        "Prepzy transforms lengthy notes into concise, easy-to-understand summaries so you can revise faster without missing the important concepts.",
    },
    {
      title: "💬 AI Chat",
      description:
        "Ask questions about your uploaded notes and get instant, context-aware answers. It's like having a personal tutor available 24/7.",
    },
    {
      title: "📝 Quiz Generator",
      description:
        "Generate practice quizzes from your notes in seconds. Test yourself before exams and quickly identify weak topics that need more revision.",
    },
  ];

  return (
    <section className="py-24 px-8 bg-transparent">
      <h2 className="text-5xl font-bold text-center text-gray-900">
        Why Choose <span className="text-violet-600">Prepzy?</span>
      </h2>

      <p className="text-center text-gray-500 mt-5 max-w-2xl mx-auto">
        Click on any mode to discover how Prepzy helps you prepare smarter for
        your exams.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() =>
              setActive(active === index ? null : index)
            }
            className="cursor-pointer bg-violet-600 text-white rounded-3xl p-8 shadow-xl hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="text-2xl font-bold">
              {feature.title}
            </h3>

            {active === index ? (
              <p className="mt-5 text-violet-100 leading-7">
                {feature.description}
              </p>
            ) : (
              <p className="mt-5 text-violet-200">
                Click to learn more →
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;