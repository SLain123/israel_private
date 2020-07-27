function enableSwiperFeedback() {
  const servicesSlider = new Swiper(`.feedback__container`, {
    slidesPerView: 1,
    navigation: {
      nextEl: `.feedback__control-next`,
      prevEl: `.feedback__control-prev`,
    },
  });

  const blockForNum = document.querySelector(`.feedback__control-current-num`);

  const displayRightSlideNumber = function () {
    blockForNum.innerHTML = `${servicesSlider.activeIndex + 1}`;
  };
  servicesSlider.on(`slideChange`, displayRightSlideNumber);
}

export default enableSwiperFeedback;
