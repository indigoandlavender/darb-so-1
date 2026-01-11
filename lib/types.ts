export interface Question {
  slug: string;
  title: string;
  subtitle?: string;
  sections: Section[];
  illustrations: Illustration[];
  lastUpdated: string;
}

export interface Section {
  heading?: string;
  content: string;
}

export interface Illustration {
  id: string;
  caption: string;
  afterSection: number; // 0-indexed, which section this appears after
}
