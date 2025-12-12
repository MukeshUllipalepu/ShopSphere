import { NextResponse } from "next/server";
import { authenticateUser, setAuthCookie, signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }
    const user = await authenticateUser(email, password);
    const token = signToken(user);
    setAuthCookie(token);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sign in failed" },
      { status: 401 },
    );
  }
}

