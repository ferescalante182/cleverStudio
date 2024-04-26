(function ($) {
  var $window = $(window),
    $body = $("body"),
    $wrapper = $("#page-wrapper"),
    $banner = $("#banner"),
    $header = $("#header");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: [null, "480px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Mobile?
  if (browser.mobile) $body.addClass("is-mobile");
  else {
    breakpoints.on(">medium", function () {
      $body.removeClass("is-mobile");
    });

    breakpoints.on("<=medium", function () {
      $body.addClass("is-mobile");
    });
  }

  // Scrolly.
  $(".scrolly").scrolly({
    speed: 1500,
    offset: $header.outerHeight(),
  });

  // Menu.
  $("#menu")
    .append('<a href="#menu" class="close"></a>')
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: "right",
      target: $body,
      visibleClass: "is-menu-visible",
    });

  // Header.
  if ($banner.length > 0 && $header.hasClass("alt")) {
    $window.on("resize", function () {
      $window.trigger("scroll");
    });

    $banner.scrollex({
      bottom: $header.outerHeight() + 1,
      terminate: function () {
        $header.removeClass("alt");
      },
      enter: function () {
        $header.addClass("alt");
      },
      leave: function () {
        $header.removeClass("alt");
      },
    });
  }

  AOS.init(); // Initialize AOS

  // MODALS
  // Function to open modal
  function openModal(modalId) {
    var modal = document.querySelector(modalId);
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");

    // Disable background interaction
    document.querySelector("body").style.pointerEvents = "none";
    modal.style.pointerEvents = "auto"; // Enable pointer events on the modal
  }

  // Function to close modal
  function closeModal(modalId) {
    var modal = document.querySelector(modalId);
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    // Re-enable background interaction
    document.querySelector("body").style.pointerEvents = "auto";
  }

  // Event listeners for grid items
  document.querySelectorAll(".grid-item").forEach((item) => {
    item.addEventListener("click", function () {
      openModal(this.getAttribute("data-target"));
    });
  });

  // Event listeners for close buttons
  document.querySelectorAll(".modal .close").forEach((item) => {
    item.addEventListener("click", function () {
      closeModal("#" + this.closest(".modal").id);
    });
  });

  // Close modal when clicking outside of the modal content
  window.addEventListener("click", function (event) {
    if (event.target.className === "modal") {
      closeModal("#" + event.target.id);
    }
  });

  /**
  Swiper:
  https://swiperjs.com/
**/
  const swiper = new Swiper(".swiperCarousel", {
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 10,
    keyboard: {
      enabled: true,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const slides = document.getElementsByClassName("swiper-slide");
  for (const slide of slides) {
    slide.addEventListener("click", () => {
      const { className } = slide;
      if (className.includes("swiper-slide-next")) {
        swiper.slideNext();
      } else if (className.includes("swiper-slide-prev")) {
        swiper.slidePrev();
      }
    });
  }

  function resizeTextToFit() {
    const quoteEls = document.getElementsByClassName("quote");
    for (const el of quoteEls) {
      el.style.width = el.offsetWidth;
      el.style.height = el.offsetHeight;
    }
    textFit(quoteEls, { maxFontSize: 14 });
  }
  resizeTextToFit();
  addEventListener("resize", (event) => {
    resizeTextToFit();
  });

  document.addEventListener("DOMContentLoaded", function () {
    var featureList = document.getElementById("featureList");
    var items = Array.prototype.slice.call(featureList.children);

    // Define a set of AOS animations
    var animations = [
      "fade",
      "fade-up",
      "fade-down",
      "fade-left",
      "fade-right",
      "fade-up-right",
      "fade-up-left",
      "fade-down-right",
      "fade-down-left",
      "flip-up",
      "flip-down",
      "flip-left",
      "flip-right",
      "zoom-in",
      "zoom-in-up",
      "zoom-in-down",
      "zoom-in-left",
      "zoom-in-right",
      "zoom-out",
      "zoom-out-up",
      "zoom-out-down",
      "zoom-out-left",
      "zoom-out-right",
    ];

    // Randomly assign an AOS animation to each item
    items.forEach(function (item) {
      var randomAnimation =
        animations[Math.floor(Math.random() * animations.length)];
      item.setAttribute("data-aos", randomAnimation);
    });

    // Shuffle and append items
    shuffleArray(items).forEach(function (item) {
      featureList.appendChild(item);
    });
  });

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
})(jQuery);
