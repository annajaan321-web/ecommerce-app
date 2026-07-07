"use client";

import { useEffect, useRef, useState } from "react";
import { logoutAction } from "@/lib/actions/auth";

export function ProfileMenu({
  user,
}: {
  user: { name: string; role: "USER" | "ADMIN"; avatar?: string | null };
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const accountHref = user.role === "ADMIN" ? "/dashboard" : "/account";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <a
        href="#"
        className="icon"
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <i className="fa-light fa-circle-user" />
        )}
      </a>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 15px)",
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid var(--rr-color-border-1)",
            borderRadius: 6,
            minWidth: 200,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            zIndex: 999,
            padding: "15px 0",
            textAlign: "left",
          }}
        >
          <div
            style={{
              padding: "0 20px 10px",
              borderBottom: "1px solid var(--rr-color-border-1)",
              marginBottom: 10,
            }}
          >
            <strong>{user.name}</strong>
          </div>
          <a href={accountHref} style={{ display: "block", padding: "8px 20px" }}>
            {user.role === "ADMIN" ? "Dashboard" : "My Account"}
          </a>
          <form action={logoutAction}>
            <button
              type="submit"
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "8px 20px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
