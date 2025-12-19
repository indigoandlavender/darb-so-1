import { google } from "googleapis";

const NEXUS_SHEET_ID = process.env.NEXUS_SHEET_ID || "1x0iiBTRZUck7MhIv5IM42Lck01MsRqwX";
const SITE_ID = process.env.SITE_ID || "darb";

function getAuth() {
  const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
  if (!base64) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_BASE64");
  const json = Buffer.from(base64, "base64").toString("utf-8");
  const credentials = JSON.parse(json);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

async function getNexusSheetData(tabName: string): Promise<string[][]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: NEXUS_SHEET_ID,
    range: `${tabName}!A:Z`,
  });
  return (response.data.values as string[][]) || [];
}

function rowsToObjects<T>(rows: string[][]): T[] {
  if (rows.length < 2) return [];
  const headers = rows[0];
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] || "";
    });
    return obj as T;
  });
}

// Get site ID
export function getSiteId(): string {
  return SITE_ID;
}

// Get site config from Nexus
export interface NexusSiteConfig {
  site_id: string;
  site_name: string;
  site_url: string;
  legal_entity: string;
  contact_email: string;
  contact_phone: string;
  whatsapp: string;
  jurisdiction_country: string;
  jurisdiction_city: string;
  address_line1: string;
  address_line2: string;
  site_type: string;
  parent_brand: string;
  year_founded: string;
}

export async function getSiteConfig(): Promise<NexusSiteConfig | null> {
  const rows = await getNexusSheetData("Sites");
  const sites = rowsToObjects<NexusSiteConfig>(rows);
  return sites.find((s) => s.site_id === SITE_ID) || null;
}

// Get legal page content
export interface NexusLegalPage {
  page_id: string;
  page_title: string;
  page_content: string;
  applies_to_site_types: string;
}

export async function getNexusLegalPage(pageId: string): Promise<NexusLegalPage | null> {
  const rows = await getNexusSheetData("Nexus_Legal_Pages");
  const pages = rowsToObjects<NexusLegalPage>(rows);
  return pages.find((p) => p.page_id === pageId) || null;
}

// Get footer links
export interface NexusFooterLink {
  brand_id: string;
  column_number: string;
  column_title: string;
  link_order: string;
  link_label: string;
  link_href: string;
  link_type: string;
}

export async function getNexusFooterLinks(brandId?: string): Promise<NexusFooterLink[]> {
  const rows = await getNexusSheetData("Nexus_Footer_Links");
  const allLinks = rowsToObjects<NexusFooterLink>(rows);
  const targetBrand = brandId || SITE_ID;
  return allLinks.filter((link) => link.brand_id === targetBrand);
}

// Get currencies
export interface NexusCurrency {
  currency_code: string;
  currency_symbol: string;
  currency_label: string;
  show_for_site_types: string;
}

export async function getNexusCurrencies(): Promise<NexusCurrency[]> {
  const rows = await getNexusSheetData("Nexus_Currencies");
  return rowsToObjects<NexusCurrency>(rows);
}

// Get languages
export interface NexusLanguage {
  language_code: string;
  language_label: string;
  native_label: string;
  rtl: string;
  enabled_default: string;
}

export async function getNexusLanguages(): Promise<NexusLanguage[]> {
  const rows = await getNexusSheetData("Nexus_Languages");
  return rowsToObjects<NexusLanguage>(rows);
}

// Replace template variables in content
export function replaceTemplateVars(content: string, siteConfig: NexusSiteConfig): string {
  return content
    .replace(/\{\{site_name\}\}/g, siteConfig.site_name)
    .replace(/\{\{site_url\}\}/g, siteConfig.site_url)
    .replace(/\{\{legal_entity\}\}/g, siteConfig.legal_entity)
    .replace(/\{\{contact_email\}\}/g, siteConfig.contact_email)
    .replace(/\{\{contact_phone\}\}/g, siteConfig.contact_phone)
    .replace(/\{\{whatsapp\}\}/g, siteConfig.whatsapp)
    .replace(/\{\{jurisdiction_country\}\}/g, siteConfig.jurisdiction_country)
    .replace(/\{\{jurisdiction_city\}\}/g, siteConfig.jurisdiction_city)
    .replace(/\{\{address_line1\}\}/g, siteConfig.address_line1)
    .replace(/\{\{address_line2\}\}/g, siteConfig.address_line2)
    .replace(/\{\{year_founded\}\}/g, siteConfig.year_founded);
}
