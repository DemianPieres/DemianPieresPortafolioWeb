import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET() {
  const pdf = await readFile(path.join(process.cwd(), "docs", "DemianPieres.pdf"));
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="DemianPieres.pdf"',
      "Content-Length": String(pdf.byteLength),
      "X-Content-Type-Options": "nosniff",
    },
  });
}
