"use client";

import { useEffect, useState } from "react";

interface NexusLegalPageProps {
  pageId: string;
}

export default function NexusLegalPage({ pageId }: NexusLegalPageProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/nexus/legal?page=${pageId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTitle(data.title);
          setContent(data.content);
        } else {
          setError(data.error || "Failed to load page");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load page");
        setLoading(false);
      });
  }, [pageId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl mb-8">{title}</h1>
        <div 
          className="prose prose-sm max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }}
        />
      </div>
    </div>
  );
}
