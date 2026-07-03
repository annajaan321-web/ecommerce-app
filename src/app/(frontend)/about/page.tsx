import { PageHeader } from "@/components/frontend/PageHeader";

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Us" />
      <section className="about-section pt-100 pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-content">
                <h2 className="section-title mb-3">Welcome to Roiser</h2>
                <p className="mb-4">
                  Roiser is a multipurpose store bringing you quality fashion, accessories and
                  everyday essentials at honest prices. We work directly with vendors to keep our
                  catalog fresh and our shipping fast.
                </p>
                <div className="about-items">
                  <div className="about-item">
                    <i className="fa-sharp fa-solid fa-circle-check" />
                    Fast Growing Selection
                  </div>
                  <div className="about-item">
                    <i className="fa-sharp fa-solid fa-circle-check" />
                    24/7 Quality Services
                  </div>
                  <div className="about-item">
                    <i className="fa-sharp fa-solid fa-circle-check" />
                    Skilled Team Members
                  </div>
                  <div className="about-item">
                    <i className="fa-sharp fa-solid fa-circle-check" />
                    Best Quality Products
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="/frontend/img/placeholder-wide.svg"
                alt="About Roiser"
                style={{ width: "100%", borderRadius: 12 }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
