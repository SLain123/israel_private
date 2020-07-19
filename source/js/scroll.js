(function () {
  const linkNav = document.querySelectorAll('.main__scroll-link');
  const V = 1; // скорость

  for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].onclick = function () {
      var w = window.pageYOffset;
      var hash = this.href.replace(/[^#]*(.*)/, "$1");
      var t = document.querySelector(hash).getBoundingClientRect().top;
      var start = null;
      requestAnimationFrame(step);
      function step(time) {
        if (start === null) start = time;
        var progress = time - start,
          r =
            t < 0
              ? Math.max(w - progress / V, w + t)
              : Math.min(w + progress / V, w + t);
        window.scrollTo(0, r);
        if (r != w + t) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
      return false;
    };
  }

  window.addEventListener(
    "scroll",
    function (e) {
      var nav = document.querySelectorAll('section[id^="nav"]');
      for (var i = 0; i < nav.length; i++) {
        document.querySelector('a[href="#' + nav[i].id + '"]').className =
          1 >= nav[i].getBoundingClientRect().top &&
          nav[i].getBoundingClientRect().top >= 1 - nav[i].offsetHeight
            ? "red"
            : "";
      }
    },
    false
  );
})();
