let mySwiper = new Swiper(".swiper-container", {
  direction: "horizontal",
  slidesPerView: 1.8,
  spaceBetween: 10,
  freeMode: true,
  breakpoints: {
    769: {
      direction: "vertical",
    },
  },
});

if (window.innerWidth > 769) {
  mySwiper.destroy();
}

function tabs() {
  const allTabBtn = document.querySelectorAll(".programs__swiper-slide");
  const allInfoBlocks = document.querySelectorAll(".programs__info-container");

  // Функции добавления или удаления классов отвечающих за ховер иконок и текста кнопок

  const addHover = function () {
    let icon = this.querySelector(".programs__swiper-icon");
    let header = this.querySelector("span");

    if (!this.classList.contains("programs__swiper-slide_active")) {
      icon.classList.add("programs__swiper-icon_hover-style");
      header.classList.add("programs__swiper-text_hover-style");
    }
  };

  const removeHover = function () {
    let icon = this.querySelector(".programs__swiper-icon");
    let header = this.querySelector("span");

    icon.classList.remove("programs__swiper-icon_hover-style");
    header.classList.remove("programs__swiper-text_hover-style");
  };

  // Функции отвечающие за добавление или удаление классов отвечающих за активацию кнопок;

  const addActive = function (elem) {
    let icon = elem.querySelector(".programs__swiper-icon");
    let header = elem.querySelector("span");

    removeActive();

    elem.classList.add("programs__swiper-slide_active");
    icon.classList.add("programs__swiper-icon_active-style");
    header.classList.remove("programs__swiper-text_hover-style");
  };

  const removeActive = function () {
    for (let btn of allTabBtn) {
      let icon = btn.querySelector(".programs__swiper-icon");

      btn.classList.remove("programs__swiper-slide_active");
      icon.classList.remove("programs__swiper-icon_active-style");
    }
  };

  // Функция отображения и скрытия информационного окна

  const displayTab = function (num) {
    hideAllTabs();

    allInfoBlocks[num].classList.remove("programs__info-container_hide");
  };

  const hideAllTabs = function () {
    for (let tab of allInfoBlocks) {
      tab.classList.add("programs__info-container_hide");
    }
  };

  // События различных ивентов с кнопками

  for (let btn of allTabBtn) {
    btn.addEventListener("mouseenter", addHover);
  }

  for (let btn of allTabBtn) {
    btn.addEventListener("mouseleave", removeHover);
  }

  for (let i = 0; i < allTabBtn.length; i++) {
    allTabBtn[i].addEventListener("click", function () {
      addActive(allTabBtn[i]);
      displayTab(i);
    });
  }
}

export { mySwiper, tabs };
