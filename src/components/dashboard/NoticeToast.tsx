"use client";

import { useEffect, useState } from "react";

const MESSAGES: Record<string, { text: string; type: "success" | "danger" }> = {
  created: { text: "Product created successfully.", type: "success" },
  updated: { text: "Product updated successfully.", type: "success" },
  deleted: { text: "Product deleted successfully.", type: "danger" },
};

export function NoticeToast({ notice }: { notice?: string }) {
  const info = notice ? MESSAGES[notice] : undefined;
  const [visible, setVisible] = useState(!!info);

  useEffect(() => {
    if (!info) return;

    const url = new URL(window.location.href);
    url.searchParams.delete("notice");
    window.history.replaceState({}, "", url.toString());

    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, [info]);

  if (!info || !visible) return null;

  return (
    <div
      className={`alert alert-${info.type} d-flex align-items-center justify-content-between shadow`}
      style={{ position: "fixed", top: 20, right: 20, zIndex: 2000, minWidth: 280 }}
      role="alert"
    >
      <span>{info.text}</span>
      <button type="button" className="btn-close ms-3" aria-label="Close" onClick={() => setVisible(false)} />
    </div>
  );
}
