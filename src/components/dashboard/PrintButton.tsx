"use client";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-dark btn-sm">
      <i className="bi bi-printer-fill me-2" />
      Print
    </button>
  );
}
