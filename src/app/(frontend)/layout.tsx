import { getSession } from "@/lib/auth/session";
import { CartProvider } from "@/components/frontend/CartContext";
import { Header } from "@/components/frontend/Header";
import { Footer } from "@/components/frontend/Footer";
import { FrontendScripts } from "@/components/frontend/FrontendScripts";

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <>
      <link rel="stylesheet" href="/frontend/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/frontend/css/fontawesome.min.css" />
      <link rel="stylesheet" href="/frontend/css/venobox.min.css" />
      <link rel="stylesheet" href="/frontend/css/odometer.min.css" />
      <link rel="stylesheet" href="/frontend/css/nice-select.css" />
      <link rel="stylesheet" href="/frontend/css/swiper.min.css" />
      <link rel="stylesheet" href="/frontend/css/main.css" />

      <CartProvider>
        <Header user={session ? { name: session.name, role: session.role } : null} />
        {children}
        <Footer />
      </CartProvider>

      <div id="scroll-percentage">
        <span id="scroll-percentage-value" />
      </div>

      <FrontendScripts />
    </>
  );
}
