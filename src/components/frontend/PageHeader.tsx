export function PageHeader({ title }: { title: string }) {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1 className="title">{title}</h1>
          <h4 className="sub-title">
            <span className="home">
              <a href="/">
                <span>Home</span>
              </a>
            </span>
            <span className="icon">
              <i className="fa-solid fa-angle-right" />
            </span>
            <span className="inner">
              <span>{title}</span>
            </span>
          </h4>
        </div>
      </div>
    </section>
  );
}
