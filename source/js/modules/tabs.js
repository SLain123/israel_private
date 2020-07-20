let mySwiper = new Swiper(".swiper-container", {

  breakpoints: {
    // when window width is >= 768px
      320: {
        direction: "horizontal",
        slidesPerView: 1.8,
        spaceBetween: 10,
        freeMode: true,
      },
      769: {
        direction: "vertical",
      }

    }
});

const allTabBtn = document.querySelectorAll(".programs__swiper-slide");

const getHover = function() {
  let elem = this;
  let img = elem.querySelector('picture');
  console.log(img);
}

for(let btn of allTabBtn) {
  btn.addEventListener('click', getHover);
}


export {
  mySwiper
};

