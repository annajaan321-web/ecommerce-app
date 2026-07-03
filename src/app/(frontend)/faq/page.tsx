import { PageHeader } from "@/components/frontend/PageHeader";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping usually takes 3-5 business days. Express shipping is available at checkout for faster delivery.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We currently support cash on delivery, with standard and express shipping options selectable at checkout.",
  },
  {
    q: "Can I return a product?",
    a: "Yes, most items can be returned within 30 days of delivery. Contact our support team to start a return.",
  },
  {
    q: "How do I track my order?",
    a: "Once logged in, you can view your order history and status from your account dashboard.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader title="Frequently Asked Questions" />
      <section className="pt-100 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                {faqs.map((item, i) => (
                  <div className="accordion-item" key={i}>
                    <h2 className="accordion-header" id={`heading-${i}`}>
                      <button
                        className={`accordion-button${i === 0 ? "" : " collapsed"}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${i}`}
                        aria-expanded={i === 0}
                        aria-controls={`collapse-${i}`}
                      >
                        {item.q}
                      </button>
                    </h2>
                    <div
                      id={`collapse-${i}`}
                      className={`accordion-collapse collapse${i === 0 ? " show" : ""}`}
                      aria-labelledby={`heading-${i}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">{item.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
