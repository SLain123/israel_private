function modalWindow() {
  const modalMain = document.querySelector(`.modal`);
  const modalRing = document.querySelector(`.modal-ring`);
  const overlay = document.querySelector(`.modal__overlay`);
  const callMeBtn = document.querySelector(`.menu__ring-me`);
  const closeBtnModalRing = document.querySelector(`.modal-ring__cls-btn-link`);
  const closeBtnModalAccept = document.querySelector(`.modal-accept__cls-btn-link`);
  const inputName = document.querySelector(`.modal-ring__name`);
  const inputPhone = document.querySelector(`.modal-ring__phone`);
  const modalAccept = document.querySelector(`.modal-accept`);
  const okBtn = document.querySelector(`.modal-accept__btn-ok`);
  const secondSendBtn = document.querySelector(`.want-way__phone-btn`);
  const secondPhoneInput = document.querySelector(`.want-way__phone-input`);
  const errorText = document.querySelector(`.want-way__error`);
  const sendBtn = document.querySelector(`.modal-ring__form button`);
  const checkbox = document.querySelector(`.modal-ring__checkbox`);
  const lable = document.querySelector(`.modal-ring__lable`);
  const errorMessages = document.querySelectorAll(`.modal-ring__error`);
  const thirdSendBtn = document.querySelector(`.detail__send-btn`);
  const thirdInputName = document.querySelector(`.detail__name`);
  const thirdInputPhone = document.querySelector(`.detail__phone`);
  const thirdErrorMessages = document.querySelectorAll(`.detail__error-text`);

  // localStorage.clear() // раскоментировать чтобы почистить localStorage в случае ошибок связанных с храналищем

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

  // Функции скрытия модального окна "Заявка принята"

  const hideAccept = function () {
    modalAccept.classList.add(`modal-accept_hide`);
    setTimeout(function () {
      modalRing.classList.remove(`modal-ring_hide`);
    }, 600);
    hideModal();
  };

  // Функция добавляет данные из localStorage в форму

  const fillForm = function () {
    let dataMain = JSON.parse(localStorage.getItem(`data`));
    if (dataMain !== null) {
      let { name, phone } = dataMain;

      inputName.value = name;
      inputPhone.value = phone;
    }
  };

  // Дополнительная проверка валидации для телефона во второй форме

  const checkValidateExstraPhone = function () {
    if (secondPhoneInput.value.length === 18) {
      secondPhoneInput.classList.remove(`want-way__phone-input_error`);
      errorText.classList.remove(`want-way__error_display`);
      return true;
    } else {
      secondPhoneInput.classList.add(`want-way__phone-input_error`);
      errorText.classList.add(`want-way__error_display`);
      return false;
    }
  };

  // Проверяет инпут имя на валидность и меняет классы в случае ошибки

  const checkName = function (mainElem, errorTextElem) {
    if (mainElem.value) {
      mainElem.classList.add(`form-right`);
      mainElem.classList.remove(`modal-ring__form_error`);
      errorTextElem.classList.remove(`error-text_visible`);
      return true;
    } else {
      mainElem.classList.remove(`form-right`);
      mainElem.classList.add(`modal-ring__form_error`);
      errorTextElem.classList.add(`error-text_visible`);
      return false;
    }
  };

  // Проверяет инпут телефон на валидность и меняет классы в случае ошибки

  const checkPhone = function (mainElem, errorTextElem) {
    if (mainElem.value.length === 18) {
      mainElem.classList.add(`form-right`);
      mainElem.classList.remove(`modal-ring__form_error`);
      errorTextElem.classList.remove(`error-text_visible`);
      return true;
    } else {
      mainElem.classList.remove(`form-right`);
      mainElem.classList.add(`modal-ring__form_error`);
      errorTextElem.classList.add(`error-text_visible`);
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

    if (!checkName(inputName, errorMessages[0])) {
      result = false;
    }

    if (!checkPhone(inputPhone, errorMessages[1])) {
      result = false;
    }

    if (!checkRuleBox()) {
      result = false;
    }
    return result;
  };

  // Функция проверки валидации для третьей формы в самом конце веб сайта

  const checkThirdValidate = function () {
    let result = true;

    if (!checkName(thirdInputName, thirdErrorMessages[0])) {
      result = false;
    }

    if (!checkPhone(thirdInputPhone, thirdErrorMessages[1])) {
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

  thirdSendBtn.addEventListener(`click`, function () {
    if (checkThirdValidate()) {
      displayModal();
      modalAccept.classList.remove(`modal-accept_hide`);
      modalRing.classList.add(`modal-ring_hide`);
    }
  });

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
  okBtn.addEventListener(`click`, hideAccept);

  secondSendBtn.addEventListener(`click`, function () {
    if (checkValidateExstraPhone()) {
      displayModal();
      modalAccept.classList.remove(`modal-accept_hide`);
      modalRing.classList.add(`modal-ring_hide`);
    }
  });
}

export default modalWindow;
