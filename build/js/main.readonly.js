function modalWindow() {
  const modalMain = document.querySelector(`.modal`);
  const modalRing = document.querySelector(`.modal-ring`);
  const overlay = document.querySelector(`.modal__overlay`);
  const callMeBtn = document.querySelector(`.menu__ring-me`);
  const closeBtnModalRing = document.querySelector(`.modal-ring__cls-btn-link`);
  const closeBtnModalAccept = document.querySelector(
      `.modal-accept__cls-btn-link`
  );
  const inputName = document.querySelector(`.modal-ring__name`);
  const inputPhone = document.querySelector(`.modal-ring__phone`);
  const checkbox = document.querySelector(`.modal-ring__checkbox`);
  const label = document.querySelector(`.modal-ring__lable`);
  const modalAccept = document.querySelector(`.modal-accept`);
  const okBtn = document.querySelector(`.modal-accept__btn-ok`);

  // Функции отвечающие за отображение и скрытие модального окна

  const displayModal = function () {
    let body = document.querySelector(`body`);
    let padding = findPadding();

    modalMain.classList.add(`modal_visible`);

    body.style.paddingRight = `${padding}px`;
    body.classList.add(`no-scroll`);

    inputName.focus();
  };

  const hideModal = function () {
    let body = document.querySelector(`body`);

    modalMain.classList.remove(`modal_visible`);

    setTimeout(function () {
      body.style.paddingRight = `0`;
      body.classList.remove(`no-scroll`);
    }, 400);

    // заменить на автозаполнение
  };

  const checkClickOutOfBorder = function (evt) {
    if (evt.target === overlay) {
      hideAccept();
    }
  };

  // Функция высчитывает отступ равный скроллу браузера

  const findPadding = function () {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  // Функция заполнит форму из localStorage

  // Функция активации чекбокса

  const activateCheckBox = function () {
    if (checkbox.checked) {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }
  };

  // Функции скрытия модального окна "Заявка принята"

  const hideAccept = function () {
    modalAccept.classList.add(`modal-accept_hide`);
    setTimeout(function () {
      modalRing.classList.remove(`modal-ring_hide`);
    }, 400);
    hideModal();
  };

  // Функция добавляет данные из localStorage в форму

  const fillForm = function () {
    let dataMain = JSON.parse(localStorage.getItem(`data`));
    if (dataMain !== null) {
      let {name, phone} = dataMain;

      inputName.value = name;
      inputPhone.value = phone;
    }
  };

  // События отвечающие за вызов функций отображения и скрытия модального окна

  callMeBtn.addEventListener(`click`, function () {
    fillForm();
    displayModal();
  });
  window.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      hideModal();
    }
  });
  closeBtnModalRing.addEventListener(`click`, hideModal);
  closeBtnModalAccept.addEventListener(`click`, hideAccept);
  overlay.addEventListener(`mousedown`, checkClickOutOfBorder);
  label.addEventListener(`click`, activateCheckBox);
  okBtn.addEventListener(`click`, hideAccept);
}

function phoneMask() {
  const phoneInput = document.querySelector(`.modal-ring__phone`);

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

    phoneInput.addEventListener(`input`, mask, false);
  });
}

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


function validateAndSendForm() {
  const sendBtn = document.querySelector(`.modal-ring__form button`);
  const inputName = document.querySelector(`.modal-ring__name`);
  const inputPhone = document.querySelector(`.modal-ring__phone`);
  const checkbox = document.querySelector(`.modal-ring__checkbox`);
  const lable = document.querySelector(`.modal-ring__lable`);
  const errorMessages = document.querySelectorAll(`.modal-ring__error-text`);
  const modalRing = document.querySelector(`.modal-ring`);
  const modalAccept = document.querySelector(`.modal-accept`);

  // localStorage.clear() // раскоментировать чтобы почистить localStorage в случае ошибок связанных с храналищем

  // Проверяет инпут имя на валидность и меняет классы в случае ошибки

  const checkName = function () {
    let errorText = errorMessages[0];

    if (inputName.value) {
      inputName.classList.add(`modal-ring__form_right`);
      inputName.classList.remove(`modal-ring__form_error`);
      errorText.classList.remove(`modal-ring__error-text_visible`);
      return true;
    } else {
      inputName.classList.remove(`modal-ring__form_right`);
      inputName.classList.add(`modal-ring__form_error`);
      errorText.classList.add(`modal-ring__error-text_visible`);
      return false;
    }
  };

  // Проверяет инпут телефон на валидность и меняет классы в случае ошибки

  const checkPhone = function () {
    let errorText = errorMessages[1];

    if (inputPhone.value.length === 18) {
      inputPhone.classList.add(`modal-ring__form_right`);
      inputPhone.classList.remove(`modal-ring__form_error`);
      errorText.classList.remove(`modal-ring__error-text_visible`);
      return true;
    } else {
      inputPhone.classList.remove(`modal-ring__form_right`);
      inputPhone.classList.add(`modal-ring__form_error`);
      errorText.classList.add(`modal-ring__error-text_visible`);
      return false;
    }
  };

  // Проверяет чекбокс на установленную галочку и меняет классы в случае ошибки

  const checkRuleBox = function () {
    if (checkbox.checked) {
      lable.classList.add(`modal-ring__form_right-box`);
      lable.classList.remove(`modal-ring__form_error-box`);
    } else {
      lable.classList.add(`modal-ring__form_error-box`);
      lable.classList.remove(`modal-ring__form_right-box`);
    }

    return checkbox.checked;
  };

  // Общая функция проверки валидности всех инпутов в форме, запускает подфункции проверки

  const checkValidateAll = function () {
    let result = true;

    if (!checkName()) {
      result = false;
    }

    if (!checkPhone()) {
      result = false;
    }

    if (!checkRuleBox()) {
      result = false;
    }
    return result;
  };

  // Функция добавляет данные из формы в localStorage

  const addDateToStorage = function () {
    let infoObj = {
      name: inputName.value,
      phone: inputPhone.value,
    };
    let rightFormat = JSON.stringify(infoObj);

    localStorage.setItem(`data`, rightFormat);
  };

  // Функция отображения модального окна "Заявка принята"

  const displayAcceptModal = function () {
    modalAccept.classList.remove(`modal-accept_hide`);
    modalRing.classList.add(`modal-ring_hide`);
  };

  // Событие на кнопку отправки

  sendBtn.addEventListener(`click`, function () {
    if (checkValidateAll()) {
      addDateToStorage();
      displayAcceptModal();
    }
  });
}

modalWindow();
phoneMask();
validateAndSendForm();
scroll();
setServicesSlider();
tabs();
