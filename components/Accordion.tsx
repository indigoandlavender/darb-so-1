'use client';

import { useState } from 'react';
import { Question, Category, categoryLabels } from '@/lib/types';
import { Illustration } from './Illustration';

interface AccordionProps {
  questions: Question[];
}

interface AccordionItemProps {
  question: Question;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="accordion-item">
      <button
        onClick={onToggle}
        className="accordion-trigger"
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{question.title}</span>
        <span className="accordion-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        className={`accordion-content ${isOpen ? 'accordion-content-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="accordion-body">
          {question.subtitle && (
            <p className="accordion-subtitle">{question.subtitle}</p>
          )}

          <div className="prose">
            {question.sections.map((section, index) => (
              <div key={index}>
                <div className="mb-6">
                  {section.heading && <h3>{section.heading}</h3>}
                  <p>{section.content}</p>
                </div>

                {/* Illustrations after this section */}
                {question.illustrations
                  .filter((ill) => ill.afterSection === index)
                  .map((ill) => (
                    <Illustration key={ill.id} id={ill.id} caption={ill.caption} />
                  ))}
              </div>
            ))}
          </div>

          <div className="accordion-meta">
            Last updated: {question.lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ questions }: AccordionProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const handleToggle = (slug: string) => {
    setOpenSlug(openSlug === slug ? null : slug);
  };

  // Group questions by category
  const categories = Object.keys(categoryLabels) as Category[];
  const questionsByCategory = categories
    .map((category) => ({
      category,
      label: categoryLabels[category],
      questions: questions.filter((q) => q.category === category),
    }))
    .filter((group) => group.questions.length > 0);

  return (
    <div className="accordion-groups">
      {questionsByCategory.map((group) => (
        <div key={group.category} className="accordion-group">
          <h3 className="accordion-group-title">{group.label}</h3>
          <div className="accordion">
            {group.questions.map((question) => (
              <AccordionItem
                key={question.slug}
                question={question}
                isOpen={openSlug === question.slug}
                onToggle={() => handleToggle(question.slug)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
