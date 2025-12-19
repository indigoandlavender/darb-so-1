import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

async function getAuthClient() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_BASE64) {
    const serviceAccountJson = Buffer.from(
      process.env.GOOGLE_SERVICE_ACCOUNT_BASE64,
      "base64"
    ).toString("utf-8");
    const serviceAccount = JSON.parse(serviceAccountJson);
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    
    return auth;
  }
  
  throw new Error("GOOGLE_SERVICE_ACCOUNT_BASE64 not configured");
}

export async function getSheetData(sheetName: string): Promise<string[][]> {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: sheetName,
    });

    return response.data.values || [];
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error);
    return [];
  }
}

export function rowsToObjects<T>(rows: string[][]): T[] {
  if (rows.length < 2) return [];
  
  const headers = rows[0];
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || "";
    });
    return obj as T;
  });
}

export function convertDriveUrl(url: string): string {
  if (!url) return "";
  if (!url.includes("drive.google.com")) return url;
  
  let fileId = "";
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) fileId = fileMatch[1];
  
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openMatch) fileId = openMatch[1];
  
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
  }
  return url;
}

// Types
export interface City {
  City_ID: string;
  City_Name: string;
  Country: string;
  Lat: string;
  Lng: string;
  Description: string;
  Hero_Image: string;
}

export interface Pin {
  Pin_ID: string;
  City_ID: string;
  Name: string;
  Category: string;
  Lat: string;
  Lng: string;
  Content: string;
  Address: string;
  Hours: string;
  Price_Range: string;
  Image_URL: string;
}

export interface Category {
  Category_ID: string;
  Name: string;
  Icon: string;
  Color: string;
}

export interface Neighborhood {
  Neighborhood_ID: string;
  City_ID: string;
  Name: string;
  Lat: string;
  Lng: string;
  Description: string;
  Character: string;
}

export async function getCities(): Promise<City[]> {
  const rows = await getSheetData("Cities");
  return rowsToObjects<City>(rows);
}

export async function getCity(cityId: string): Promise<City | null> {
  const cities = await getCities();
  return cities.find(c => c.City_ID === cityId) || null;
}

export async function getPins(cityId?: string): Promise<Pin[]> {
  const rows = await getSheetData("Pins");
  const pins = rowsToObjects<Pin>(rows);
  if (cityId) {
    return pins.filter(p => p.City_ID === cityId);
  }
  return pins;
}

export async function getCategories(): Promise<Category[]> {
  const rows = await getSheetData("Categories");
  return rowsToObjects<Category>(rows);
}

export async function getNeighborhoods(cityId?: string): Promise<Neighborhood[]> {
  const rows = await getSheetData("Neighborhoods");
  const neighborhoods = rowsToObjects<Neighborhood>(rows);
  if (cityId) {
    return neighborhoods.filter(n => n.City_ID === cityId);
  }
  return neighborhoods;
}
