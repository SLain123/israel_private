function scroll() {
  const linkNav = document.querySelectorAll(`.main__scroll-link`);
  const V = 1; // скорость

  for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].onclick = function () {
      let w = window.pageYOffset;
      let hash = this.href.replace(/[^#]*(.*)/, `$1`);
      let t = document.querySelector(hash).getBoundingClientRect().top;
      let start = null;
      requestAnimationFrame(step);
      function step(time) {
        if (start === null) {
          start = time;
        }
        let progress = time - start;
        let r =
            t < 0
              ? Math.max(w - progress / V, w + t)
              : Math.min(w + progress / V, w + t);
        window.scrollTo(0, r);
        if (r !== w + t) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
      return false;
    };
  }

  window.addEventListener(
      `scroll`,
      function () {
        let nav = document.querySelectorAll(`section[id^="nav"]`);
        for (let i = 0; i < nav.length; i++) {
          document.querySelector(`a[href="#` + nav[i].id + `"]`).className =
          nav[i].getBoundingClientRect().top <= 1 &&
          nav[i].getBoundingClientRect().top >= 1 - nav[i].offsetHeight
            ? `red`
            : ``;
        }
      },
      false
  );
}

export default scroll;
