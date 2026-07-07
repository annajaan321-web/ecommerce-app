"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";

export type AuthFormState = { error?: string; success?: boolean } | undefined;

const LoginSchema = z.object({
  email: z.string().trim().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  roleHint: z.enum(["USER", "ADMIN"]).default("USER"),
});

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    roleHint: formData.get("roleHint") ?? "USER",
  });

  if (!parsed.success) {
    return { error: "Please enter a valid email and password." };
  }

  const { email, password, roleHint } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Invalid email or password." };
  }

  const passwordOk = await verifyPassword(password, user.passwordHash);
  if (!passwordOk) {
    return { error: "Invalid email or password." };
  }

  if (roleHint === "ADMIN" && user.role !== "ADMIN") {
    return { error: "This account is not an admin account." };
  }

  await createSession({
    sub: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  });

  redirect(user.role === "ADMIN" ? "/dashboard" : "/");
}

const RegisterSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "USER",
    },
  });

  await createSession({
    sub: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  });

  return { success: true };
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
