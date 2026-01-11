'use client';

import { useState, useMemo } from 'react';
import { Question } from '@/lib/types';

interface SearchProps {
  questions: Question[];
  onFilter: (filtered: Question[]) => void;
}

export default function Search({ questions, onFilter }: SearchProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      onFilter(questions);
      return;
    }

    const lower = value.toLowerCase();
    const filtered = questions.filter((q) => {
      // Search in title
      if (q.title.toLowerCase().includes(lower)) return true;
      // Search in subtitle
      if (q.subtitle?.toLowerCase().includes(lower)) return true;
      // Search in section content
      if (q.sections.some((s) => s.content.toLowerCase().includes(lower))) return true;
      // Search in section headings
      if (q.sections.some((s) => s.heading?.toLowerCase().includes(lower))) return true;
      return false;
    });

    onFilter(filtered);
  };

  return (
    <div className="mb-12">
      <input
        type="text"
        className="search-input"
        placeholder="Search questions..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        aria-label="Search questions"
      />
    </div>
  );
}
