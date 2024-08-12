import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const apiResponse = await fetch(
    "https://gemini-morph-43cb3xfcvq-uc.a.run.app/render",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: await request.text(),
    }
  );

  const svgData = await apiResponse.text();

  return new NextResponse(svgData, {
    status: apiResponse.status,
    headers: {
      "Content-Type": "image/svg+xml",
      "Access-Control-Allow-Origin": "https://gemini.oktatas.ai",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://gemini.oktatas.ai",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
