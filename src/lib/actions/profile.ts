"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guards";
import { createSession } from "@/lib/auth/session";
import { saveUploadedImage } from "@/lib/upload";

const ProfileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  location: z.string().trim().optional().default(""),
});

export type ProfileFormState = { error?: string; success?: boolean } | undefined;

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const session = await requireAdmin();

  const parsed = ProfileSchema.safeParse({
    name: formData.get("name"),
    location: formData.get("location"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const upload = await saveUploadedImage(formData.get("avatarFile") as File | null, "avatars");
  if (upload.error) {
    return { error: upload.error };
  }

  const user = await prisma.user.update({
    where: { id: session.sub },
    data: {
      name: parsed.data.name,
      location: parsed.data.location,
      ...(upload.path ? { avatar: upload.path } : {}),
    },
  });

  await createSession({
    sub: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  });

  revalidatePath("/dashboard/profile");
  return { success: true };
}
