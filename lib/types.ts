export type Category =
  | 'everyday-urban-reality'
  | 'built-environment'
  | 'daily-life-infrastructure'
  | 'physical-sensations'
  | 'movement-perception'
  | 'cultural-tech'
  | 'deeper-systems';

export const categoryLabels: Record<Category, string> = {
  'everyday-urban-reality': 'Everyday Urban Reality',
  'built-environment': 'Built Environment Logic',
  'daily-life-infrastructure': 'Daily Life Infrastructure',
  'physical-sensations': 'Physical Sensations',
  'movement-perception': 'Movement & Perception',
  'cultural-tech': 'Cultural Tech Questions',
  'deeper-systems': 'Deeper System Questions',
};

export interface Question {
  slug: string;
  title: string;
  category: Category;
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
