"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { PageHeader } from "@/components/frontend/PageHeader";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");

  return (
    <>
      <PageHeader title="Account Login" />
      <section className="login-area pt-100 pb-100">
        <div className="container">
          <div className="login-wrap text-center">
            <h3 className="title">Login Into Your Account</h3>

            <ul className="nav nav-pills justify-content-center mb-4" role="tablist">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link${role === "USER" ? " active" : ""}`}
                  onClick={() => setRole("USER")}
                >
                  Customer Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link${role === "ADMIN" ? " active" : ""}`}
                  onClick={() => setRole("ADMIN")}
                >
                  Admin Login
                </button>
              </li>
            </ul>

            <span className="or-text">{role === "ADMIN" ? "ADMIN ACCESS" : "CUSTOMER ACCESS"}</span>

            <form action={formAction} className="login-form">
              <input type="hidden" name="roleHint" value={role} />
              <div className="form-item">
                <h4 className="form-header">Email address</h4>
                <input type="email" name="email" className="form-control" required />
              </div>
              <div className="form-item">
                <h4 className="form-header">Password*</h4>
                <input type="password" name="password" className="form-control" required />
              </div>
              {state?.error && (
                <div className="form-item">
                  <p style={{ color: "#e04b4b" }}>{state.error}</p>
                </div>
              )}
              <div className="submit-btn">
                <button className="rr-primary-btn" type="submit" disabled={pending}>
                  {pending ? "Logging in..." : "Login Account"}
                </button>
              </div>
            </form>
            {role === "USER" && (
              <p className="mt-3">
                No account? <a href="/register">Register here</a>
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
