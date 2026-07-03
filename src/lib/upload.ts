import "server-only";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export async function saveUploadedImage(
  file: File | null,
  subdir: string
): Promise<{ path?: string; error?: string }> {
  if (!file || file.size === 0) return {};
  if (!file.type.startsWith("image/")) return { error: "Uploaded file must be an image." };
  if (file.size > MAX_IMAGE_BYTES) return { error: "Image must be smaller than 5MB." };

  const ext = path.extname(file.name) || ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", subdir);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()));

  return { path: `/uploads/${subdir}/${filename}` };
}
