const menu = [
  { href: "/dashboard", icon: "home", label: "Dashboard" },
] as const;

export function Sidebar() {
  return (
    <aside className="sidebar-wrapper">
      <div className="sidebar-header">
        <div className="logo-icon">
          <img src="/frontend/img/logo/logo-1.png" className="logo-img" alt="Roiser" />
        </div>
        <div className="logo-name flex-grow-1">
          <img src="/frontend/img/logo/logo-1.png" alt="Roiser" style={{ height: 28, width: "auto" }} />
        </div>
        <div className="sidebar-close">
          <span className="material-icons-outlined">close</span>
        </div>
      </div>
      <div className="sidebar-nav" data-simplebar="true">
        <ul className="metismenu" id="sidenav">
          {menu.map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                <div className="parent-icon">
                  <i className="material-icons-outlined">{item.icon}</i>
                </div>
                <div className="menu-title">{item.label}</div>
              </a>
            </li>
          ))}

          <li className="menu-label">eCommerce</li>

          <li>
            <a href="#" className="has-arrow">
              <div className="parent-icon">
                <i className="material-icons-outlined">shopping_bag</i>
              </div>
              <div className="menu-title">Products</div>
            </a>
            <ul>
              <li>
                <a href="/dashboard/products">
                  <i className="material-icons-outlined">arrow_right</i>All Products
                </a>
              </li>
              <li>
                <a href="/dashboard/products/add">
                  <i className="material-icons-outlined">arrow_right</i>Add Product
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a href="/dashboard/orders">
              <div className="parent-icon">
                <i className="material-icons-outlined">receipt_long</i>
              </div>
              <div className="menu-title">Orders</div>
            </a>
          </li>

          <li>
            <a href="/dashboard/customers">
              <div className="parent-icon">
                <i className="material-icons-outlined">groups</i>
              </div>
              <div className="menu-title">Customers</div>
            </a>
          </li>

          <li>
            <a href="/dashboard/reviews">
              <div className="parent-icon">
                <i className="material-icons-outlined">star_rate</i>
              </div>
              <div className="menu-title">Reviews</div>
            </a>
          </li>

          <li className="menu-label">Account</li>

          <li>
            <a href="/dashboard/profile">
              <div className="parent-icon">
                <i className="material-icons-outlined">person</i>
              </div>
              <div className="menu-title">Profile</div>
            </a>
          </li>

          <li>
            <a href="/">
              <div className="parent-icon">
                <i className="material-icons-outlined">storefront</i>
              </div>
              <div className="menu-title">View Store</div>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
