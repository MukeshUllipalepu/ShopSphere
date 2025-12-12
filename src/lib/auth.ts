import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { SessionUser, UserRecord } from "@/types";

const USERS_FILE = path.join(process.cwd(), "data", "users.json");
const TOKEN_COOKIE = "token";

const jwtSecret =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "development" ? "dev-secret" : undefined);
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

async function ensureUserFile() {
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    await fs.writeFile(USERS_FILE, "[]", "utf-8");
  }
}

export async function readUsers(): Promise<UserRecord[]> {
  await ensureUserFile();
  const raw = await fs.readFile(USERS_FILE, "utf-8");
  return JSON.parse(raw) as UserRecord[];
}

export async function saveUsers(users: UserRecord[]): Promise<void> {
  await ensureUserFile();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

function buildSessionUser(user: UserRecord): SessionUser {
  const { id, name, email } = user;
  return { id, name, email };
}

function assertSecret() {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<SessionUser> {
  assertSecret();
  const users = await readUsers();
  const normalizedEmail = email.toLowerCase();
  const existing = users.find((user) => user.email === normalizedEmail);
  if (existing) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, saltRounds);
  const newUser: UserRecord = {
    id: randomUUID(),
    name,
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  await saveUsers(users);
  return buildSessionUser(newUser);
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<SessionUser> {
  assertSecret();
  const users = await readUsers();
  const user = users.find((u) => u.email === email.toLowerCase());
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    throw new Error("Invalid credentials");
  }
  return buildSessionUser(user);
}

export function signToken(user: SessionUser): string {
  assertSecret();
  return jwt.sign(user, jwtSecret!, { expiresIn: "7d" });
}

export function verifyToken(token?: string | null): SessionUser | null {
  try {
    if (!token) return null;
    assertSecret();
    return jwt.verify(token, jwtSecret!) as SessionUser;
  } catch {
    return null;
  }
}

export function getTokenFromCookies() {
  const cookieStore = cookies();
  return cookieStore.get(TOKEN_COOKIE)?.value;
}

export function getTokenFromRequest(request: NextRequest) {
  return request.cookies.get(TOKEN_COOKIE)?.value;
}

export function setAuthCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete(TOKEN_COOKIE);
}

export async function getUserFromCookies(): Promise<SessionUser | null> {
  const token = getTokenFromCookies();
  return verifyToken(token);
}

