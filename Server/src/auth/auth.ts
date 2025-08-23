import jwt from "jsonwebtoken";
import type { Request } from "express";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET_KEY!;

export type JwtUser = {
  id: number;
  role: "STUDENT" | "FACULTY" | "ADMIN" | "ALUMNI";
};

export function sign(user: JwtUser) {
  return jwt.sign(user, SECRET, { expiresIn: "7d" });
}

export function getUserFromReq(req: Request): JwtUser | null {
  const token = req.headers["authorization"]?.replace("Bearer ", ""); // ✅ safer
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET) as JwtUser;
  } catch {
    return null;
  }
}
