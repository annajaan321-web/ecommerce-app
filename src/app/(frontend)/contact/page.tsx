import { PageHeader } from "@/components/frontend/PageHeader";

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" />
      <section className="pt-100 pb-100">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="footer-contact">
                <div className="icon">
                  <i className="fa-sharp fa-solid fa-phone-rotary" />
                </div>
                <div className="content">
                  <span>Call Us 24/7</span>
                  <a href="tel:+25836922569">+258 3692 2569</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-contact">
                <div className="icon">
                  <i className="fa-sharp fa-solid fa-envelope" />
                </div>
                <div className="content">
                  <span>Email Us</span>
                  <a href="mailto:info@example.com">info@example.com</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-contact">
                <div className="icon">
                  <i className="fa-sharp fa-solid fa-location-dot" />
                </div>
                <div className="content">
                  <span>Address</span>
                  <span>Amsterdam, 109-74</span>
                </div>
              </div>
            </div>
          </div>

          <form className="mt-5" action="#">
            <div className="row g-3">
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div className="col-md-6">
                <input type="email" className="form-control" placeholder="Your Email" />
              </div>
              <div className="col-12">
                <textarea className="form-control" rows={5} placeholder="Your Message" />
              </div>
              <div className="col-12">
                <button type="submit" className="rr-primary-btn">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
