import Script from "next/script";

export function DashboardScripts() {
  return (
    <>
      <Script src="/dashboard/js/jquery.min.js" strategy="afterInteractive" />
      <Script src="/dashboard/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/dashboard/plugins/metismenu/metisMenu.min.js" strategy="afterInteractive" />
      <Script src="/dashboard/plugins/simplebar/js/simplebar.min.js" strategy="afterInteractive" />
      <Script id="dashboard-init" strategy="afterInteractive">
        {`
          (function () {
            function init() {
              if (
                typeof window.jQuery === "undefined" ||
                typeof window.jQuery.fn.metisMenu !== "function"
              ) {
                return setTimeout(init, 30);
              }
              var $ = window.jQuery;
              $("#sidenav").metisMenu();
              $(".btn-toggle").on("click", function (e) {
                e.preventDefault();
                if ($("body").hasClass("toggled")) {
                  $("body").removeClass("toggled");
                  $(".sidebar-wrapper").unbind("hover");
                } else {
                  $("body").addClass("toggled");
                  $(".sidebar-wrapper").hover(
                    function () { $("body").addClass("sidebar-hovered"); },
                    function () { $("body").removeClass("sidebar-hovered"); }
                  );
                }
              });
              $(".sidebar-close").on("click", function (e) {
                e.preventDefault();
                $("body").removeClass("toggled");
              });
            }
            init();
          })();
        `}
      </Script>
    </>
  );
}
