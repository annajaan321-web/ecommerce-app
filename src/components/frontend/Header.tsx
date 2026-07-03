import { CartBadge } from "@/components/frontend/CartBadge";

export function Header({ user }: { user: { name: string; role: "USER" | "ADMIN" } | null }) {
  return (
    <>
      <header className="header sticky-active">
        <div className="top-bar">
          <div className="container">
            <div className="top-bar-inner">
              <div className="top-bar-left">
                <ul className="top-left-list">
                  <li>
                    <a href="/about">About</a>
                  </li>
                  {user ? (
                    <li>
                      <a href={user.role === "ADMIN" ? "/dashboard" : "/account"}>My Account</a>
                    </li>
                  ) : (
                    <li>
                      <a href="/login">Login</a>
                    </li>
                  )}
                  <li>
                    <a href="/checkout">Checkout</a>
                  </li>
                </ul>
              </div>
              <div className="top-bar-middle">
                <span>Free shipping for all orders of 150$</span>
              </div>
              <div className="top-bar-right">
                <ul className="top-right-list">
                  <li>
                    <a href="/contact">Store Location</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle">
          <div className="container">
            <div className="header-middle-inner">
              <div className="header-middle-left">
                <div className="header-logo d-lg-block">
                  <a href="/">
                    <img src="/frontend/img/logo/logo-1.png" alt="Logo" />
                  </a>
                </div>
                <div className="category-form-wrap">
                  <form className="header-form" action="/shop">
                    <input className="form-control" type="text" name="q" placeholder="Search here..." />
                    <button className="submit rr-primary-btn" type="submit">
                      Search here
                    </button>
                  </form>
                </div>
              </div>
              <div className="header-middle-right">
                <ul className="contact-item-list">
                  <li>
                    <div className="content">
                      <span>Call Us Now:</span>
                      <a className="number" href="tel:+25821592159">
                        +(258) 2159-2159
                      </a>
                    </div>
                    <a href="tel:+25821592159" className="icon">
                      <i className="fa-regular fa-phone" />
                    </a>
                  </li>
                  <li>
                    <CartBadge />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="primary-header">
          <div className="container">
            <div className="primary-header-inner">
              <div className="header-logo mobile-logo">
                <a href="/">
                  <img src="/frontend/img/logo/logo-1.png" alt="Logo" />
                </a>
              </div>
              <div className="header-menu-wrap">
                <div className="mobile-menu-items">
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="/shop">Shop</a>
                      <ul>
                        <li>
                          <a href="/shop">Shop</a>
                        </li>
                        <li>
                          <a href="/cart">Cart</a>
                        </li>
                        <li>
                          <a href="/checkout">Checkout</a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="#">Pages</a>
                      <ul>
                        <li>
                          <a href="/about">About</a>
                        </li>
                        {!user && (
                          <>
                            <li>
                              <a href="/login">Login</a>
                            </li>
                            <li>
                              <a href="/register">Register</a>
                            </li>
                          </>
                        )}
                        <li>
                          <a href="/faq">Faq</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="/contact">Contact</a>
                    </li>
                    {user?.role === "ADMIN" && (
                      <li>
                        <a href="/dashboard">Dashboard</a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="header-right-wrap">
                <div className="header-right">
                  <span>
                    Get 30% Discount Now <span>Sale</span>
                  </span>
                  <div className="header-right-item">
                    <a href="#" className="mobile-side-menu-toggle">
                      <i className="fa-sharp fa-solid fa-bars" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="popup-search-box">
        <div className="box-inner-wrap d-flex align-items-center">
          <form id="form" action="/shop" method="get" role="search">
            <input id="popup-search" type="text" name="q" placeholder="Type keywords here..." />
          </form>
          <div className="search-close">
            <i className="fa-sharp fa-regular fa-xmark" />
          </div>
        </div>
      </div>

      <div className="mobile-side-menu">
        <div className="side-menu-content">
          <div className="side-menu-head">
            <a href="/">
              <img src="/frontend/img/logo/logo-1.png" alt="logo" />
            </a>
            <button className="mobile-side-menu-close">
              <i className="fa-regular fa-xmark" />
            </button>
          </div>
          <div className="side-menu-wrap" />
          <ul className="side-menu-list">
            <li>
              <i className="fa-light fa-location-dot" />
              Address : <span>Amsterdam, 109-74</span>
            </li>
            <li>
              <i className="fa-light fa-phone" />
              Phone : <a href="tel:+01569896654">+01 569 896 654</a>
            </li>
            <li>
              <i className="fa-light fa-envelope" />
              Email : <a href="mailto:info@example.com">info@example.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div id="preloader">
        <div className="preloader-close">X</div>
        <div className="sk-three-bounce">
          <div className="sk-child sk-bounce1" />
          <div className="sk-child sk-bounce2" />
          <div className="sk-child sk-bounce3" />
        </div>
      </div>
    </>
  );
}
