import { logoutAction } from "@/lib/actions/auth";

export function Topbar({
  user,
}: {
  user: { name: string; email: string; avatar?: string | null };
}) {
  const initial = user.name.trim().charAt(0).toUpperCase() || "A";

  return (
    <header className="top-header">
      <nav className="navbar navbar-expand align-items-center gap-4">
        <div className="btn-toggle">
          <a href="#">
            <i className="material-icons-outlined">menu</i>
          </a>
        </div>
        <div className="search-bar flex-grow-1">
          <div className="position-relative">
            <input
              className="form-control rounded-5 px-5 search-control d-lg-block d-none"
              type="text"
              placeholder="Search"
            />
            <span className="material-icons-outlined position-absolute d-lg-block d-none ms-3 translate-middle-y start-0 top-50">
              search
            </span>
            <span className="material-icons-outlined position-absolute me-3 translate-middle-y end-0 top-50 search-close">
              close
            </span>
            <div className="search-popup p-3">
              <div className="card rounded-4 overflow-hidden">
                <div className="card-header d-lg-none">
                  <div className="position-relative">
                    <input
                      className="form-control rounded-5 px-5 mobile-search-control"
                      type="text"
                      placeholder="Search"
                    />
                    <span className="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50">
                      search
                    </span>
                    <span className="material-icons-outlined position-absolute me-3 translate-middle-y end-0 top-50 mobile-search-close">
                      close
                    </span>
                  </div>
                </div>
                <div className="card-body search-content">
                  <p className="search-title">Recent Searches</p>
                  <div className="d-flex align-items-start flex-wrap gap-2 kewords-wrapper">
                    <a href="#" className="kewords">
                      <span>Products</span>
                      <i className="material-icons-outlined fs-6">search</i>
                    </a>
                    <a href="#" className="kewords">
                      <span>Orders</span>
                      <i className="material-icons-outlined fs-6">search</i>
                    </a>
                    <a href="#" className="kewords">
                      <span>Customers</span>
                      <i className="material-icons-outlined fs-6">search</i>
                    </a>
                  </div>
                  <hr />
                  <p className="search-title">Quick Links</p>
                  <div className="search-list d-flex flex-column gap-2">
                    <a href="/dashboard/products/add" className="search-list-item d-flex align-items-center gap-3">
                      <div className="list-icon">
                        <i className="material-icons-outlined fs-5">add_box</i>
                      </div>
                      <div>
                        <h5 className="mb-0 search-list-title">Add Product</h5>
                      </div>
                    </a>
                    <a href="/dashboard/orders" className="search-list-item d-flex align-items-center gap-3">
                      <div className="list-icon">
                        <i className="material-icons-outlined fs-5">receipt_long</i>
                      </div>
                      <div>
                        <h5 className="mb-0 search-list-title">View Orders</h5>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="navbar-nav gap-1 nav-right-links align-items-center">
          <li className="nav-item d-lg-none mobile-search-btn">
            <a className="nav-link" href="#">
              <i className="material-icons-outlined">search</i>
            </a>
          </li>

          <li className="nav-item dropdown position-static">
            <a
              className="nav-link dropdown-toggle dropdown-toggle-nocaret"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
              href="#"
            >
              <i className="material-icons-outlined">done_all</i>
            </a>
            <div className="dropdown-menu dropdown-menu-end mega-menu shadow-lg p-4 p-lg-5">
              <div className="mega-menu-widgets">
                <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4 g-lg-5">
                  {[
                    { icon: "06", title: "Marketing", href: "/dashboard" },
                    { icon: "02", title: "Products", href: "/dashboard/products" },
                    { icon: "03", title: "Customers", href: "/dashboard/customers" },
                    { icon: "01", title: "Orders", href: "/dashboard/orders" },
                    { icon: "11", title: "Profile", href: "/dashboard/profile" },
                    { icon: "13", title: "Store", href: "/" },
                  ].map((item) => (
                    <div className="col" key={item.title}>
                      <div className="card rounded-4 shadow-none border mb-0">
                        <div className="card-body">
                          <div className="d-flex align-items-start gap-3">
                            <img src={`/dashboard/images/megaIcons/${item.icon}.png`} width={40} alt="" />
                            <div className="mega-menu-content">
                              <h5>
                                <a href={item.href}>{item.title}</a>
                              </h5>
                              <p className="mb-0 f-14">Quick access to {item.title.toLowerCase()}.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle dropdown-toggle-nocaret"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
              href="#"
            >
              <i className="material-icons-outlined">apps</i>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-apps shadow-lg p-3">
              <div className="border rounded-4 overflow-hidden">
                {[
                  ["01", "Gmail"],
                  ["02", "Skype"],
                  ["03", "Slack"],
                  ["04", "YouTube"],
                  ["05", "Google"],
                  ["06", "Instagram"],
                  ["07", "Spotify"],
                  ["08", "Yahoo"],
                  ["09", "Facebook"],
                ]
                  .reduce<string[][][]>((rows, item, i) => {
                    if (i % 3 === 0) rows.push([]);
                    rows[rows.length - 1].push(item);
                    return rows;
                  }, [])
                  .map((row, i) => (
                    <div className="row row-cols-3 g-0 border-bottom" key={i}>
                      {row.map(([icon, name], j) => (
                        <div className={`col${j < row.length - 1 ? " border-end" : ""}`} key={name}>
                          <div className="app-wrapper d-flex flex-column gap-2 text-center">
                            <div className="app-icon">
                              <img src={`/dashboard/images/apps/${icon}.png`} width={36} alt="" />
                            </div>
                            <div className="app-name">
                              <p className="mb-0">{name}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link position-relative" href="/dashboard/orders">
              <i className="material-icons-outlined">shopping_cart</i>
            </a>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
              href="#"
            >
              <i className="material-icons-outlined">notifications</i>
              <span className="badge-notify">3</span>
            </a>
            <div className="dropdown-menu dropdown-notify dropdown-menu-end shadow">
              <div className="px-3 py-1 d-flex align-items-center justify-content-between border-bottom">
                <h5 className="notiy-title mb-0">Notifications</h5>
              </div>
              <div className="notify-list">
                <a className="dropdown-item border-bottom py-2" href="/dashboard/orders">
                  <div className="d-flex align-items-center gap-3">
                    <div className="user-wrapper bg-primary text-primary bg-opacity-10">
                      <span>OR</span>
                    </div>
                    <div>
                      <h5 className="notify-title">New Order Received</h5>
                      <p className="mb-0 notify-desc">A customer just placed an order.</p>
                      <p className="mb-0 notify-time">Today</p>
                    </div>
                  </div>
                </a>
                <a className="dropdown-item border-bottom py-2" href="/dashboard/customers">
                  <div className="d-flex align-items-center gap-3">
                    <div className="user-wrapper bg-success text-success bg-opacity-10">
                      <span>NC</span>
                    </div>
                    <div>
                      <h5 className="notify-title">New Customer</h5>
                      <p className="mb-0 notify-desc">A new customer has registered.</p>
                      <p className="mb-0 notify-time">Yesterday</p>
                    </div>
                  </div>
                </a>
                <a className="dropdown-item py-2" href="/dashboard/products">
                  <div className="d-flex align-items-center gap-3">
                    <div className="user-wrapper bg-danger text-danger bg-opacity-10">
                      <span>LS</span>
                    </div>
                    <div>
                      <h5 className="notify-title">Low Stock</h5>
                      <p className="mb-0 notify-desc">Some products are running low.</p>
                      <p className="mb-0 notify-time">2d ago</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </li>

          <li className="nav-item dropdown">
            <a
              href="#"
              className="dropdown-toggle dropdown-toggle-nocaret"
              data-bs-toggle="dropdown"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-circle"
                  style={{ width: 45, height: 45, objectFit: "cover" }}
                />
              ) : (
                <span
                  className="rounded-circle p-1 border d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary fw-bold"
                  style={{ width: 45, height: 45 }}
                >
                  {initial}
                </span>
              )}
            </a>
            <div className="dropdown-menu dropdown-user dropdown-menu-end shadow">
              <a className="dropdown-item gap-2 py-2" href="/dashboard/profile">
                <div className="text-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="rounded-circle shadow mb-3"
                      style={{ width: 90, height: 90, objectFit: "cover" }}
                    />
                  ) : (
                    <span
                      className="rounded-circle p-1 shadow mb-3 d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary fw-bold fs-3"
                      style={{ width: 90, height: 90 }}
                    >
                      {initial}
                    </span>
                  )}
                  <h5 className="user-name mb-0 fw-bold">Hello, {user.name}</h5>
                  <p className="mb-0 text-muted small">{user.email}</p>
                </div>
              </a>
              <hr className="dropdown-divider" />
              <a className="dropdown-item d-flex align-items-center gap-2 py-2" href="/dashboard/profile">
                <i className="material-icons-outlined">person_outline</i>Profile
              </a>
              <a className="dropdown-item d-flex align-items-center gap-2 py-2" href="/dashboard">
                <i className="material-icons-outlined">dashboard</i>Dashboard
              </a>
              <a className="dropdown-item d-flex align-items-center gap-2 py-2" href="/">
                <i className="material-icons-outlined">storefront</i>View Store
              </a>
              <hr className="dropdown-divider" />
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="dropdown-item d-flex align-items-center gap-2 py-2 border-0 bg-transparent w-100 text-start"
                >
                  <i className="material-icons-outlined">power_settings_new</i>Logout
                </button>
              </form>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
