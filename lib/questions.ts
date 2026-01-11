import { Question } from "./types";
import questionsData from "@/data/questions.json";

export function getQuestions(): Question[] {
  return questionsData as Question[];
}

export function getQuestionBySlug(slug: string): Question | undefined {
  return getQuestions().find((q) => q.slug === slug);
}

export function getAllSlugs(): string[] {
  return getQuestions().map((q) => q.slug);
}
