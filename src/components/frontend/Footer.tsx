export function Footer() {
  return (
    <footer className="footer-section bg-grey pt-60">
      <div className="container">
        <div className="footer-items">
          <div className="footer-item">
            <div className="icon">
              <img src="/frontend/img/icon/footer-1.png" alt="icon" />
            </div>
            <div className="content">
              <h4 className="title">Free Shipping</h4>
              <span>Free shipping on orders over $65</span>
            </div>
          </div>
          <div className="footer-item">
            <div className="icon">
              <img src="/frontend/img/icon/footer-2.png" alt="icon" />
            </div>
            <div className="content">
              <h4 className="title">Free Returns</h4>
              <span>30-days free return policy</span>
            </div>
          </div>
          <div className="footer-item">
            <div className="icon">
              <img src="/frontend/img/icon/footer-3.png" alt="icon" />
            </div>
            <div className="content">
              <h4 className="title">Secured Payments</h4>
              <span>We accept all major credit cards</span>
            </div>
          </div>
          <div className="footer-item item-2">
            <div className="icon">
              <img src="/frontend/img/icon/footer-4.png" alt="icon" />
            </div>
            <div className="content">
              <h4 className="title">Customer Service</h4>
              <span>Top notch customer service</span>
            </div>
          </div>
        </div>
        <div className="row footer-widget-wrap pb-60">
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <div className="widget-header">
                <h3 className="widget-title">About Store</h3>
              </div>
              <div className="footer-contact">
                <div className="icon">
                  <i className="fa-sharp fa-solid fa-phone-rotary" />
                </div>
                <div className="content">
                  <span>Have a question? Call us 24/7</span>
                  <a href="tel:+25836922569">+258 3692 2569</a>
                </div>
              </div>
              <ul className="schedule-list">
                <li>
                  <span>Monday - Friday:</span>8:00am - 6:00pm
                </li>
                <li>
                  <span>Saturday:</span>8:00am - 6:00pm
                </li>
                <li>
                  <span>Sunday</span> Service Closed
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <div className="footer-widget">
              <div className="widget-header">
                <h3 className="widget-title">Shop</h3>
              </div>
              <ul className="footer-list">
                <li>
                  <a href="/shop">All Products</a>
                </li>
                <li>
                  <a href="/cart">Cart</a>
                </li>
                <li>
                  <a href="/checkout">Checkout</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <div className="footer-widget">
              <div className="widget-header">
                <h3 className="widget-title">Company</h3>
              </div>
              <ul className="footer-list">
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <div className="footer-widget">
              <div className="widget-header">
                <h3 className="widget-title">Account</h3>
              </div>
              <ul className="footer-list">
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/register">Register</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <div className="widget-header">
                <h3 className="widget-title">Our Newsletter</h3>
              </div>
              <div className="news-form-wrap">
                <p className="mb-20">
                  Subscribe to the mailing list to receive updates on new arrivals and other discounts
                </p>
                <div className="footer-form mb-20">
                  <form className="rr-subscribe-form" action="#">
                    <input className="form-control" type="email" name="email" placeholder="Email address" />
                    <button className="submit" type="submit">
                      Subscribe
                    </button>
                    <div className="clearfix" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row copyright-content">
            <div className="col-lg-12 text-center">
              <p>
                Copyright &amp; Design 2026 <span>©Roiser</span>. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
