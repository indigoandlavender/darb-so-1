"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Question, Category, categoryLabels } from "@/lib/types";
import Accordion from "./Accordion";
import Search from "./Search";

interface QuestionsClientProps {
  questions: Question[];
}

function QuestionsInner({ questions }: QuestionsClientProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = (searchParams.get("c") as Category) || "";

  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [activeCategory, setActiveCategory] = useState<Category | "">(initialCategory);

  // Apply initial category filter
  useEffect(() => {
    if (initialCategory) {
      const filtered = questions.filter((q) => q.category === initialCategory);
      setFilteredQuestions(filtered);
    }
  }, [initialCategory, questions]);

  const handleFilter = (filtered: Question[]) => {
    // If category is active, also apply category filter
    if (activeCategory) {
      setFilteredQuestions(filtered.filter((q) => q.category === activeCategory));
    } else {
      setFilteredQuestions(filtered);
    }
  };

  const handleCategoryChange = (category: Category | "") => {
    setActiveCategory(category);
    if (category) {
      setFilteredQuestions(questions.filter((q) => q.category === category));
    } else {
      setFilteredQuestions(questions);
    }
  };

  return (
    <>
      {/* Search */}
      <Search
        questions={questions}
        onFilter={handleFilter}
        initialQuery={initialQuery}
      />

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => handleCategoryChange("")}
          className={`tag transition-opacity ${activeCategory === "" ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
        >
          All
        </button>
        {(Object.keys(categoryLabels) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`tag transition-opacity ${activeCategory === cat ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Questions */}
      <section>
        <h2 className="text-small font-medium text-muted uppercase tracking-wide mb-6">
          {filteredQuestions.length === questions.length
            ? `${questions.length} Questions`
            : `${filteredQuestions.length} result${filteredQuestions.length !== 1 ? "s" : ""}`}
        </h2>
        {filteredQuestions.length > 0 ? (
          <Accordion questions={filteredQuestions} />
        ) : (
          <p className="text-muted py-8">No questions match your search.</p>
        )}
      </section>
    </>
  );
}

export default function QuestionsClient({ questions }: QuestionsClientProps) {
  return (
    <Suspense fallback={<div className="text-muted">Loading...</div>}>
      <QuestionsInner questions={questions} />
    </Suspense>
  );
}
