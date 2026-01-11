import { getQuestions } from "@/lib/questions";
import QuestionsClient from "@/components/QuestionsClient";

export const metadata = {
  title: "Questions",
  description:
    "Browse questions about Marrakech: buildings, daily life, getting around, and cultural observations explained.",
};

export default function QuestionsPage() {
  const questions = getQuestions();

  return (
    <div className="container">
      <div className="max-w-prose">
        <section className="mb-10">
          <h1 className="text-2xl md:text-3xl font-serif mb-4">Questions</h1>
          <p className="text-muted">
            Observations about Marrakech that deserve explanation.
          </p>
        </section>

        <QuestionsClient questions={questions} />
      </div>
    </div>
  );
}
