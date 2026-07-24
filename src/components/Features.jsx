import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "📄 AI Summaries",
    color: "from-purple-600 to-indigo-600",
    description:
      "Prepzy instantly converts long study notes into concise, easy-to-understand summaries. Perfect for quick revision before exams and last-minute preparation.",
  },
  {
    title: "💬 AI Chat",
    color: "from-blue-600 to-cyan-500",
    description:
      "Ask questions directly about your uploaded PDF. Prepzy understands your notes and gives instant answers without searching through hundreds of pages.",
  },
  {
    title: "📝 Quiz Generator",
    color: "from-pink-600 to-purple-600",
    description:
      "Generate practice quizzes from your notes in seconds. Test your understanding and identify weak areas before your exams.",
  },
];

function Features() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-24 px-6">

      <h2 className="text-5xl font-bold text-center text-gray-900">
        Why Choose Prepzy?
      </h2>

      <p className="text-center text-gray-500 mt-4 mb-16">
        Click on a feature to discover how it helps you prepare smarter.
      </p>

      <div className="grid md:grid-cols-3 gap-8">

        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            transition={{ duration: 0.25 }}
            onClick={() =>
              setActive(active === index ? null : index)
            }
            className={`cursor-pointer rounded-3xl p-8 text-white shadow-xl
            bg-gradient-to-br ${feature.color}`}
          >

            <h3 className="text-2xl font-bold">
              {feature.title}
            </h3>

            <AnimatePresence>

              {active === index && (
                <motion.p
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="mt-6 text-purple-100 leading-7 overflow-hidden"
                >
                  {feature.description}
                </motion.p>
              )}

            </AnimatePresence>

          </motion.div>
        ))}

      </div>

    </section>
  );
}

export default Features;