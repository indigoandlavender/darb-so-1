import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQuestionBySlug, getAllSlugs } from "@/lib/questions";
import { Illustration } from "@/components/Illustration";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);
  
  if (!question) {
    return { title: "Not Found" };
  }

  return {
    title: question.title,
    description: question.subtitle || question.sections[0]?.content.slice(0, 160),
    openGraph: {
      title: question.title,
      description: question.subtitle || question.sections[0]?.content.slice(0, 160),
      type: "article",
    },
  };
}

export default async function QuestionPage({ params }: PageProps) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);

  if (!question) {
    notFound();
  }

  // Build content with illustrations inserted at correct positions
  const renderContent = () => {
    const elements: React.ReactNode[] = [];
    
    question.sections.forEach((section, index) => {
      // Add section content
      elements.push(
        <div key={`section-${index}`} className="mb-8">
          {section.heading && (
            <h2>{section.heading}</h2>
          )}
          <p>{section.content}</p>
        </div>
      );

      // Check for illustrations after this section
      const illustrationsAfter = question.illustrations.filter(
        (ill) => ill.afterSection === index
      );
      
      illustrationsAfter.forEach((ill) => {
        elements.push(
          <Illustration 
            key={ill.id} 
            id={ill.id} 
            caption={ill.caption} 
          />
        );
      });
    });

    return elements;
  };

  return (
    <div className="container">
      <article className="max-w-prose">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-display font-serif mb-4">{question.title}</h1>
          {question.subtitle && (
            <p className="text-body text-muted">{question.subtitle}</p>
          )}
        </header>

        {/* Content */}
        <div className="prose">
          {renderContent()}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <p className="text-small text-muted">
            Last updated: {question.lastUpdated}
          </p>
          <a 
            href="/" 
            className="inline-block mt-4 text-small border-b border-border hover:border-foreground transition-colors"
          >
            ← All questions
          </a>
        </footer>
      </article>
    </div>
  );
}
