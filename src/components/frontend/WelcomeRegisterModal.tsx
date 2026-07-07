"use client";

import { useActionState, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { registerAction } from "@/lib/actions/auth";

const STORAGE_KEY = "roiser_welcome_register_dismissed";
const HIDE_ON_PATHS = ["/login", "/register"];

export function WelcomeRegisterModal({ loggedIn }: { loggedIn: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(registerAction, undefined);

  useEffect(() => {
    if (loggedIn) return;
    if (HIDE_ON_PATHS.some((p) => pathname?.startsWith(p))) return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    setOpen(true);
  }, [loggedIn, pathname]);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (state?.success) {
      dismiss();
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (!open) return null;

  return (
    <div className="welcome-modal-overlay" onClick={dismiss}>
      <div className="welcome-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="welcome-modal-close" aria-label="Close" onClick={dismiss}>
          <i className="fa-regular fa-xmark" />
        </button>
        <div className="text-center">
          <h3 className="title">Create Your Account</h3>
          <span className="or-text">GET 30% OFF YOUR FIRST ORDER</span>
          <form action={formAction} className="login-form">
            <div className="form-item">
              <h4 className="form-header">Full Name</h4>
              <input type="text" name="name" className="form-control" required />
            </div>
            <div className="form-item">
              <h4 className="form-header">Email address</h4>
              <input type="email" name="email" className="form-control" required />
            </div>
            <div className="form-item">
              <h4 className="form-header">Password*</h4>
              <input type="password" name="password" className="form-control" minLength={6} required />
            </div>
            {state?.error && (
              <div className="form-item">
                <p style={{ color: "#e04b4b" }}>{state.error}</p>
              </div>
            )}
            <div className="submit-btn">
              <button className="rr-primary-btn" type="submit" disabled={pending}>
                {pending ? "Creating account..." : "Register Account"}
              </button>
            </div>
          </form>
          <p className="mt-3">
            Already have an account?{" "}
            <a href="/login" onClick={dismiss}>
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
