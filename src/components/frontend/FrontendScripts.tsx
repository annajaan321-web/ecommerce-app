import Script from "next/script";

export function FrontendScripts() {
  return (
    <>
      <Script src="/frontend/js/vendor/jquary-3.6.0.min.js" strategy="afterInteractive" />
      <Script src="/frontend/js/vendor/bootstrap-bundle.js" strategy="afterInteractive" />
      <Script src="/frontend/js/vendor/imagesloaded-pkgd.js" strategy="afterInteractive" />
      <Script src="/frontend/js/vendor/waypoints.min.js" strategy="afterInteractive" />
      <Script src="/frontend/js/vendor/venobox.min.js" strategy="afterInteractive" />
      <Script src="/frontend/js/vendor/nice-select.js" strategy="afterInteractive" />
      <Script src="/frontend/js/vendor/meanmenu.js" strategy="afterInteractive" />
      <Script src="/frontend/js/vendor/jquery.isotope.js" strategy="afterInteractive" />
      <Script src="/frontend/js/vendor/swiper.min.js" strategy="afterInteractive" />
      <Script id="frontend-init" strategy="afterInteractive">
        {`
          (function () {
            function init() {
              if (
                typeof window.jQuery === "undefined" ||
                typeof window.Swiper === "undefined" ||
                typeof window.jQuery.fn.meanmenu !== "function"
              ) {
                return setTimeout(init, 30);
              }
              var $ = window.jQuery;

              $("#preloader").delay(600).fadeOut(500);
              $(".preloader-close").on("click", function () {
                $("#preloader").delay(0).fadeOut(500);
              });

              var header = $(".header"), stickyHeader = $(".primary-header");
              if (header.hasClass("sticky-active")) {
                $(window).on("scroll", function () {
                  var scroll = $(window).scrollTop();
                  if (scroll >= 110) stickyHeader.addClass("fixed");
                  else stickyHeader.removeClass("fixed");
                });
              }

              if ($(".mobile-menu-items").length && !$(".mobile-menu-items").data("meanmenu-inited")) {
                $(".mobile-menu-items").data("meanmenu-inited", true).meanmenu({
                  meanMenuContainer: ".side-menu-wrap",
                  meanScreenWidth: "992",
                  meanMenuCloseSize: "30px",
                  meanRemoveAttrs: true,
                });
              }

              $(".mobile-side-menu-toggle").on("click", function (e) {
                e.preventDefault();
                $(".mobile-side-menu, .mobile-side-menu-overlay").toggleClass("is-open");
              });
              $(".mobile-side-menu-close").on("click", function () {
                $(".mobile-side-menu, .mobile-side-menu-overlay").removeClass("is-open");
              });

              $("#popup-search-box").removeClass("toggled");
              $(".search-close").on("click", function () {
                $("#popup-search-box").removeClass("toggled");
              });

              try {
                if (window.VenoBox && $(".video-popup, .img-popup").length) {
                  new window.VenoBox({ selector: ".video-popup, .img-popup", bgcolor: "transparent", numeration: true, infinigall: true, spinner: "plane" });
                }
              } catch (e) {}

              if (!$("body .mt-cursor").length) {
                $("body").append('<div class="mt-cursor"></div>');
              }
              $(window).on("mousemove", function (e) {
                $(".mt-cursor").css({ transform: "translate(" + (e.clientX - 15) + "px," + (e.clientY - 15) + "px)", visibility: "inherit" });
              });

              if ($(".odometer").length && $.fn.waypoint) {
                $(".odometer").waypoint(function () {
                  $(".odometer").each(function () { $(this).html($(this).attr("data-count")); });
                }, { offset: "80%", triggerOnce: true });
              }

              if ($.fn.niceSelect) { $("select").niceSelect(); }

              if ($(".filter-items").length && $.fn.imagesLoaded) {
                $(".filter-items").imagesLoaded(function () {
                  $(".project-filter li").on("click", function () {
                    $(".project-filter li").removeClass("active");
                    $(this).addClass("active");
                    var selector = $(this).attr("data-filter");
                    $(".filter-items").isotope({ filter: selector });
                    return false;
                  });
                  $(".filter-items").isotope({ itemSelector: ".single-item", layoutMode: "fitRows", fitRows: { gutter: 0 } });
                });
              }

              function safeSwiper(selector, options) {
                try {
                  if ($(selector).length) return new window.Swiper(selector, options);
                } catch (e) {}
                return null;
              }

              safeSwiper(".category-carousel", {
                slidesPerView: 6, spaceBetween: 10, slidesPerGroup: 1, loop: true, speed: 700, grabCursor: true,
                mousewheel: { sensitivity: 1, releaseOnEdges: true },
                pagination: { el: ".swiper-pagination", clickable: true },
                navigation: { nextEl: ".category-section .swiper-prev", prevEl: ".category-section .swiper-next" },
                breakpoints: { 320: { slidesPerView: 1, spaceBetween: 20 }, 450: { slidesPerView: 2, spaceBetween: 20 }, 767: { slidesPerView: 3, spaceBetween: 30 }, 992: { slidesPerView: 4, spaceBetween: 30 }, 1170: { slidesPerView: 6, spaceBetween: 30 } },
              });

              safeSwiper(".shop-carousel", {
                slidesPerView: 4, spaceBetween: 10, slidesPerGroup: 1, loop: true, speed: 700, grabCursor: true,
                mousewheel: { sensitivity: 1, releaseOnEdges: true },
                pagination: { el: ".swiper-pagination", clickable: true },
                navigation: { nextEl: ".fashion-section .swiper-prev", prevEl: ".fashion-section .swiper-next" },
                breakpoints: { 320: { slidesPerView: 1, spaceBetween: 20 }, 767: { slidesPerView: 2, spaceBetween: 30 }, 992: { slidesPerView: 3, spaceBetween: 30 }, 1170: { slidesPerView: 4, spaceBetween: 30 } },
              });

              safeSwiper(".testimonial-carousel", {
                slidesPerView: 3, spaceBetween: 10, slidesPerGroup: 1, loop: true, speed: 700, grabCursor: true,
                pagination: { el: ".swiper-pagination", clickable: true },
                navigation: { nextEl: ".testimonial-section .swiper-prev", prevEl: ".testimonial-section .swiper-next" },
                breakpoints: { 320: { slidesPerView: 1, spaceBetween: 20 }, 767: { slidesPerView: 2, spaceBetween: 30 }, 992: { slidesPerView: 3, spaceBetween: 30 } },
              });

              var thumbSwiper = safeSwiper(".product-gallary-thumb", {
                spaceBetween: 10, slidesPerView: 3, freeMode: true, watchSlidesProgress: true, direction: "vertical",
              });
              if (thumbSwiper) {
                safeSwiper(".product-gallary", {
                  spaceBetween: 10, loop: true,
                  navigation: { nextEl: ".swiper-nav-next", prevEl: ".swiper-nav-prev" },
                  thumbs: { swiper: thumbSwiper },
                });
              }

              var priceRange = $("#price-range"), priceOutput = $("#price-output span");
              if (priceRange.length) {
                priceOutput.html(priceRange.val());
                priceRange.on("change input", function () { priceOutput.html($(this).val()); });
              }

              function scrollPercentage() {
                var scrollTopPos = document.documentElement.scrollTop;
                var calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                var scrollValue = calcHeight > 0 ? Math.round((scrollTopPos / calcHeight) * 100) : 0;
                var el = $("#scroll-percentage");
                el.css("background", "conic-gradient( var(--rr-color-theme-primary) " + scrollValue + "%, var(--rr-color-common-white) " + scrollValue + "%)");
                if (scrollTopPos > 100) el.addClass("active"); else el.removeClass("active");
                if (scrollValue < 96) $("#scroll-percentage-value").text(scrollValue + "%");
                else $("#scroll-percentage-value").html('<i class="fa-sharp fa-regular fa-arrow-up-long"></i>');
              }
              window.onscroll = scrollPercentage;
              scrollPercentage();
              $("#scroll-percentage").on("click", function () {
                document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
              });
            }
            init();
          })();
        `}
      </Script>
    </>
  );
}
