import { NextResponse } from "next/server";
import { registerUser, setAuthCookie, signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 },
      );
    }
    const user = await registerUser(name, email, password);
    const token = signToken(user);
    setAuthCookie(token);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Signup failed" },
      { status: 400 },
    );
  }
}

