const setServicesSlider = () => {
  const breakpoint = window.matchMedia(`(min-width:768px)`);
  let servicesSlider;
  const breakpointChecker = function () {
    if (breakpoint.matches === true) {
      if (servicesSlider) {
        servicesSlider.destroy(true, true);
      }
      return;
    } else if (breakpoint.matches === false) {
      return enableSwiper();
    }
  };
  const enableSwiper = function () {
    servicesSlider = new Swiper(`.swiper-container`, {
      spaceBetween: 10,
      slidesPerView: 1.8,
    });
  };
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

function tabs() {
  const allTabBtn = document.querySelectorAll(`.programs__swiper-slide`);
  const allInfoBlocks = document.querySelectorAll(`.programs__info-container`);

  // Функции отвечающие за добавление или удаление классов отвечающих за активацию кнопок;

  const addActive = function (elem) {
    let icon = elem.querySelector(`.programs__swiper-icon`);
    let header = elem.querySelector(`span`);

    removeActive();

    elem.classList.add(`programs__swiper-slide_active`);
    icon.classList.add(`programs__swiper-icon_active-style`);
    header.classList.remove(`programs__swiper-text_hover-style`);
  };

  const removeActive = function () {
    for (let btn of allTabBtn) {
      let icon = btn.querySelector(`.programs__swiper-icon`);

      btn.classList.remove(`programs__swiper-slide_active`);
      icon.classList.remove(`programs__swiper-icon_active-style`);
    }
  };

  // Функция отображения и скрытия информационного окна

  const displayTab = function (num) {
    hideAllTabs();

    allInfoBlocks[num].classList.remove(`programs__info-container_hide`);
  };

  const hideAllTabs = function () {
    for (let tab of allInfoBlocks) {
      tab.classList.add(`programs__info-container_hide`);
    }
  };

  // События ивентов с кнопками

  for (let i = 0; i < allTabBtn.length; i++) {
    allTabBtn[i].addEventListener(`click`, function () {
      addActive(allTabBtn[i]);
      displayTab(i);
    });
  }
}

export {setServicesSlider, tabs};
