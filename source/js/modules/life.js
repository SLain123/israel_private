const setServicesSecondSlider = () => {
  const breakpoint = window.matchMedia(`(min-width:769px)`);
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
    servicesSlider = new Swiper(`.life__slider-container`, {
      pagination: {
        el: `.swiper-pagination`,
        type: `bullets`,
        slidesPerView: 1,
      },
    });
  };
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

export {setServicesSecondSlider};
