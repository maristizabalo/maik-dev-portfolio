"use client";

const questions = [
  "Que proyectos ha desarrollado?",
  "Con que tecnologias trabaja?",
  "Tiene experiencia en backend?",
  "Esta disponible para proyectos?",
  "Donde puedo ver su CV?",
];

const QuickQuestions = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-[11px] text-white/70 transition hover:border-cyan/35 hover:text-white"
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default QuickQuestions;
