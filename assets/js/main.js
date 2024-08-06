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

 function openModal(imageIndex) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    // Clear previous content
    modalContent.innerHTML = '';

    // Add related images based on clicked image index
    let relatedImages = [];

    switch(imageIndex) {
      case 1:
        relatedImages = [
          'images/GRID/Banca Ale Jazo/baj1.jpg',
          'images/GRID/Banca Ale Jazo/baj3.jpg',
          'images/GRID/Banca Ale Jazo/baj5.jpg',
          'images/GRID/Banca Ale Jazo/baj7.jpg',
          'images/GRID/Banca Ale Jazo/baj10.jpg',
        ];
        break;
      case 2:
        relatedImages = [
          'images/grid/librero navajo/ln-1.jpg',
          'images/grid/librero navajo/ln-3.jpg',
          'images/grid/librero navajo/ln-5.jpg',
          'images/grid/librero navajo/ln-7.jpg',
          'images/grid/librero navajo/ln-2.jpg'
        ];
        break;
      case 3:
        relatedImages = [
          'images/grid/mesa de media luna/mml-1.jpg',
          'images/grid/mesa de media luna/mml-2.jpg',
          'images/grid/mesa de media luna/mml-3.jpg',
          'images/grid/mesa de media luna/mml-5.jpg',
          'images/grid/mesa de media luna/mml-6.jpg'
        ];
        break;
      case 4:
        relatedImages = [
          'images/GRID/Sillas Jusely/sj-12.jpg',
          'images/GRID/Sillas Jusely/sj-2.jpg',
          'images/GRID/Sillas Jusely/sj-4.jpg',
          'images/GRID/Sillas Jusely/sj-7.jpg',
          'images/GRID/Sillas Jusely/sj-9.jpg'
        ];
        break;
      case 5:
        relatedImages = [
          'images/GRID/Pardo Cafe/pardo-1.jpg',
          'images/GRID/Pardo Cafe/pardo-2.jpg',
          'images/GRID/Pardo Cafe/pardo-3.jpg',
          'images/GRID/Pardo Cafe/pardo-4.jpg',
          'images/GRID/Pardo Cafe/pardo-5.jpg'
        ];
        break;
      case 6:
        relatedImages = [
          'images/GRID/SALA MIAU/sm-1.jpg',
          'images/GRID/SALA MIAU/sm-2.jpg',
          'images/GRID/SALA MIAU/sm-3.jpg',
          'images/GRID/SALA MIAU/sm-4.jpg',
          'images/GRID/SALA MIAU/sm-5.jpg',
        ];
        break;
      case 7:
        relatedImages = [
          'images/GRID/Sofá Cama Azul/sca-1.jpg',
          'images/GRID/Sofá Cama Azul/sca-2.jpg',
          'images/GRID/Sofá Cama Azul/sca-3.jpg',
          'images/GRID/Sofá Cama Azul/sca-4.jpg',
          'images/GRID/Sofá Cama Azul/sca-5.jpg',
        ];
        break;
      case 8:
        relatedImages = [
          'images/GRID/Silla Ale Jazo/saj-1.jpg',
          'images/GRID/Silla Ale Jazo/saj-2.jpg',
          'images/GRID/Silla Ale Jazo/saj-3.jpg',
          'images/GRID/Silla Ale Jazo/saj-4.jpg',
          'images/GRID/Silla Ale Jazo/saj-5.jpg',
        ];
        break;
      case 9:
        relatedImages = [
          'images/GRID/Booth Amarillo/ba-1.jpg',
          'images/GRID/Booth Amarillo/ba-2.jpg',
          'images/GRID/Booth Amarillo/ba-3.jpg',
          'images/GRID/Booth Amarillo/ba-4.jpg',
          'images/GRID/Booth Amarillo/ba-5.jpg',
        ];
        break;
    }

    relatedImages.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Related Image';
      modalContent.appendChild(img);
    });

    modal.style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('modal').style.display = 'none';
  }

  window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
})(jQuery);
