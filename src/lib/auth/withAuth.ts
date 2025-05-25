import { NextRequest, NextResponse } from "next/server";

const FAKE_SECRET = process.env.API_SECRET ?? "fortestapikey123"; // For testing

export const withAuth = async (
  req: NextRequest,
  callback: () => Promise<NextResponse>
) => {
  const auth = req.headers.get("Authorization");

  if (!auth || !auth.startsWith("Bearer ") || auth.split(" ")[1] !== FAKE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return await callback();
};
