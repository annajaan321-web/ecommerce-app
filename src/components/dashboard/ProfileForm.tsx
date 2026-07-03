"use client";

import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/profile";
import type { User } from "@/generated/prisma/client";

export function ProfileForm({ user }: { user: User }) {
  const [state, formAction, pending] = useActionState(updateProfile, undefined);

  return (
    <form action={formAction}>
      <div className="mb-3">
        <label className="form-label">Profile Photo</label>
        {user.avatar && (
          <div className="mb-2">
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
        )}
        <input type="file" name="avatarFile" accept="image/*" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" name="name" className="form-control" defaultValue={user.name} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" defaultValue={user.email} disabled />
      </div>
      <div className="mb-3">
        <label className="form-label">Location</label>
        <input type="text" name="location" className="form-control" defaultValue={user.location ?? ""} />
      </div>
      {state?.error && <div className="alert alert-danger">{state.error}</div>}
      {state?.success && <div className="alert alert-success">Profile updated.</div>}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
