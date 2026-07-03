import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guards";
import { PageBreadcrumb } from "@/components/dashboard/PageBreadcrumb";
import { ProfileForm } from "@/components/dashboard/ProfileForm";

export default async function ProfilePage() {
  const session = await requireAdmin();
  const user = await prisma.user.findUnique({ where: { id: session.sub } });
  if (!user) notFound();

  const initial = user.name.trim().charAt(0).toUpperCase() || "A";

  return (
    <>
      <PageBreadcrumb title="Profile" />

      <div className="row g-4">
        <div className="col-12 col-xl-4">
          <div className="card">
            <div className="card-body text-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-circle mb-3"
                  style={{ width: 96, height: 96, objectFit: "cover" }}
                />
              ) : (
                <span
                  className="rounded-circle mb-3 d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary fw-bold fs-2"
                  style={{ width: 96, height: 96 }}
                >
                  {initial}
                </span>
              )}
              <h5 className="mb-0">{user.name}</h5>
              <p className="mb-0 text-muted">Administrator</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-8">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">Account Settings</h5>
              <ProfileForm user={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
