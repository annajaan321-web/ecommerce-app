import { requireAdmin } from "@/lib/auth/guards";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { DashboardScripts } from "@/components/dashboard/DashboardScripts";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <>
      <link rel="stylesheet" href="/dashboard/plugins/metismenu/metisMenu.min.css" />
      <link rel="stylesheet" href="/dashboard/plugins/metismenu/mm-vertical.css" />
      <link rel="stylesheet" href="/dashboard/plugins/simplebar/css/simplebar.css" />
      <link rel="stylesheet" href="/dashboard/css/bootstrap.min.css" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap"
      />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
      <link rel="stylesheet" href="/dashboard/css/bootstrap-extended.css" />
      <link rel="stylesheet" href="/dashboard/css/extra-icons.css" />
      <link rel="stylesheet" href="/dashboard/css/main.css" />
      <link rel="stylesheet" href="/dashboard/css/responsive.css" />

      <Topbar user={{ name: session.name, email: session.email, avatar: session.avatar }} />
      <Sidebar />
      <div className="overlay btn-toggle" />

      <main className="main-wrapper">
        <div className="main-content">{children}</div>
      </main>

      <footer className="page-footer">
        <p className="mb-0">Copyright © 2026. All right reserved.</p>
      </footer>

      <DashboardScripts />
    </>
  );
}
