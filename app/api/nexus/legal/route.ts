import { NextResponse } from "next/server";
import { getNexusLegalPage, getSiteConfig, replaceTemplateVars } from "@/lib/nexus";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("page");

  if (!pageId) {
    return NextResponse.json({ error: "Missing page parameter" }, { status: 400 });
  }

  try {
    const [page, siteConfig] = await Promise.all([
      getNexusLegalPage(pageId),
      getSiteConfig(),
    ]);

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    let content = page.page_content;
    if (siteConfig) {
      content = replaceTemplateVars(content, siteConfig);
    }

    return NextResponse.json({
      success: true,
      title: page.page_title,
      content,
    });
  } catch (error) {
    console.error("Error fetching legal page:", error);
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 });
  }
}
