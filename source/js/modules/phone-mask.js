function phoneMask() {
  const firstPhoneInput = document.querySelector(`.modal-ring__phone`);
  const secondPhoneInput = document.querySelector(`.want-way__phone-input`);
  const thirdPhoneInput = document.querySelector(`.detail__phone`);

  window.addEventListener(`DOMContentLoaded`, function () {
    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd(`character`, pos);
        range.moveStart(`character`, pos);
        range.select();
      }
    }

    function mask(event) {
      let that = this;
      let matrix = `+7 (___) ___ __ __`;
      let i = 0;
      let def = matrix.replace(/\D/g, ``);
      let val = that.value.replace(/\D/g, ``);
      if (def.length >= val.length) {
        val = def;
      }
      that.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? `` : a;
      });
      if (event.type === `blur`) {
        if (that.value.length === 2) {
          that.value = ``;
        }
      } else {
        setCursorPosition(that.value.length, that);
      }
    }

    firstPhoneInput.addEventListener(`input`, mask, false);
    secondPhoneInput.addEventListener(`input`, mask, false);
    thirdPhoneInput.addEventListener(`input`, mask, false);
  });
}

export default phoneMask;
