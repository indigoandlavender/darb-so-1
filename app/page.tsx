import Link from "next/link";
import { getQuestions } from "@/lib/questions";

export default function Home() {
  const questions = getQuestions();

  return (
    <div className="container">
      <div className="max-w-prose">
        {/* Introduction */}
        <section className="mb-16">
          <h1 className="text-display font-serif mb-8">Derb</h1>
          <div className="prose">
            <p>
              Derb is an urban reference for Marrakech. It explains the systems 
              behind everyday realities that visitors often notice but rarely understand.
            </p>
            <p>
              Why the plumbing behaves strangely. Why there are so many cats. 
              Why bathrooms in old houses sometimes smell. Why noise is unpredictable. 
              These are not complaints. They are observations that deserve explanation.
            </p>
            <p>
              This is not a travel guide. There are no recommendations, no hidden gems, 
              no hospitality language. Derb explains infrastructure, ecology, and history 
              in plain terms. Systems, not stories.
            </p>
          </div>
        </section>

        {/* Questions Index */}
        <section>
          <h2 className="text-small font-medium text-muted uppercase tracking-wide mb-6">
            Questions
          </h2>
          <ul className="space-y-4">
            {questions.map((question) => (
              <li key={question.slug}>
                <Link 
                  href={`/questions/${question.slug}`}
                  className="block py-4 border-b border-border hover:border-foreground transition-colors group"
                >
                  <span className="text-title font-serif group-hover:opacity-70 transition-opacity">
                    {question.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
