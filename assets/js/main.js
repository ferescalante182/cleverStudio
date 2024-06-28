(function ($) {
  const $window = $(window),
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
  $window.on("load", () => {
    setTimeout(() => {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Mobile?
  if (browser.mobile) {
    $body.addClass("is-mobile");
  } else {
    breakpoints.on(">medium", () => {
      $body.removeClass("is-mobile");
    });

    breakpoints.on("<=medium", () => {
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
    $window.on("resize", () => {
      $window.trigger("scroll");
    });

    $banner.scrollex({
      bottom: $header.outerHeight() + 1,
      terminate: () => {
        $header.removeClass("alt");
      },
      enter: () => {
        $header.addClass("alt");
      },
      leave: () => {
        $header.removeClass("alt");
      },
    });
  }

  AOS.init(); // Initialize AOS

  // MODALS
  document.addEventListener("DOMContentLoaded", () => {
    // Open modal function
    document.querySelectorAll(".modal-open").forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const modal = document.querySelector(item.getAttribute("href"));
        modal.style.display = "block";
      });
    });

    // Close modal function
    document.querySelectorAll(".close").forEach((button) => {
      button.addEventListener("click", function () {
        this.closest(".modal").style.display = "none";
      });
    });

    // Close modal on outside click
    window.addEventListener("click", (event) => {
      const modal = document.querySelector(".modal");
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  function closeModal(modalId) {
    const modal = document.querySelector(modalId);
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.querySelector("body").style.pointerEvents = "auto";
  }

  // Swiper initialization
  const swiper = new Swiper(".swiperCarousel", {
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 10,
    keyboard: { enabled: true },
    loop: true,
    pagination: { el: ".swiper-pagination" },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const slides = document.getElementsByClassName("swiper-slide");
  for (const slide of slides) {
    slide.addEventListener("click", () => {
      if (slide.className.includes("swiper-slide-next")) {
        swiper.slideNext();
      } else if (slide.className.includes("swiper-slide-prev")) {
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
  addEventListener("resize", resizeTextToFit);

  // Get the modal elements
  var modals = document.querySelectorAll('.modal');

  // Get the button that opens the modal
  var modalBtns = document.querySelectorAll('.modal-open');

  // Get the <span> element that closes the modal
  var spans = document.getElementsByClassName("close");

  // When the user clicks on the button, open the modal
  modalBtns.forEach(function(btn, index) {
    btn.onclick = function() {
      modals[index].style.display = "block";
    }
  });

  // When the user clicks on <span> (x), close the modal
  Array.from(spans).forEach(function(span, index) {
    span.onclick = function() {
      modals[index].style.display = "none";
    }
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = "none";
    }
  }


  document.addEventListener("DOMContentLoaded", function() {
    var featureList = document.getElementById('featureList');
    var items = Array.prototype.slice.call(featureList.children);

    // Define a set of AOS animations
    var animations = [
      'fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right', 
      'fade-up-right', 'fade-up-left', 'fade-down-right', 'fade-down-left',
      'flip-up', 'flip-down', 'flip-left', 'flip-right',
      'zoom-in', 'zoom-in-up', 'zoom-in-down', 'zoom-in-left', 'zoom-in-right',
      'zoom-out', 'zoom-out-up', 'zoom-out-down', 'zoom-out-left', 'zoom-out-right'
    ];

    // Randomly assign an AOS animation to each item
    items.forEach(function(item) {
      var randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      item.setAttribute('data-aos', randomAnimation);
    });

    // Shuffle and append items
    shuffleArray(items).forEach(function(item) {
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
