import { getQuestions } from "@/lib/questions";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  const questions = getQuestions();

  return (
    <div className="container">
      <div className="max-w-prose">
        {/* Introduction */}
        <section className="mb-12">
          <h1 className="text-4xl font-serif mb-6">Derb</h1>
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
          </div>
        </section>

        <HomeContent questions={questions} />
      </div>
    </div>
  );
}
