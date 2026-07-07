"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/lib/actions/auth";
import { PageHeader } from "@/components/frontend/PageHeader";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/");
      router.refresh();
    }
  }, [state, router]);

  return (
    <>
      <PageHeader title="Create Account" />
      <section className="login-area pt-100 pb-100">
        <div className="container">
          <div className="login-wrap text-center">
            <h3 className="title">Create Your Account</h3>
            <span className="or-text">CUSTOMER REGISTRATION</span>
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
              Already have an account? <a href="/login">Log in</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
