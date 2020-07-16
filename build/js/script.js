'use strict';
(function modalWindow() {
  const overlay = document.querySelector(".overlay");
  const modalRing = document.querySelector(".modal-ring");
  const callMeBtn = document.querySelector(".menu__ring-me");
  const closeBtnModalRing = document.querySelector(".modal-ring__cls-btn-link");
  const inputsFormAndCheckbox = document.querySelectorAll(
    ".modal-ring__form input"
  );
  const lable = document.querySelector(".modal-ring__form label");
  const errorMessages = document.querySelectorAll(".modal-ring__error-text");

  // Функции отвечающие за отображение и скрытие модального окна

  const displayModal = function () {
    let body = document.querySelector("body");
    let padding = findPadding();

    overlay.classList.remove("overlay-hide");
    overlay.classList.add("overlay-visible");

    body.style.paddingRight = `${padding}px`;
    body.classList.add("no-scroll");

    inputsFormAndCheckbox[0].focus();
  };

  const hideModal = function () {
    let body = document.querySelector("body");

    overlay.classList.add("overlay-hide");
    overlay.classList.remove("overlay-visible");

    body.style.paddingRight = `0`;
    body.classList.remove("no-scroll");

    cleanForm();
  };

  const checkClickOutOfBorder = function (evt) {
    if (evt.target == overlay) {
      hideModal();
    }
  };

  // Функция высчитывает отступ равный скроллу браузера;

  const findPadding = function () {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  // Функция чистить форму после закрытия или отправки;

  const cleanForm = function () {
    let name = inputsFormAndCheckbox[0];
    let phone = inputsFormAndCheckbox[1];
    let checkbox = inputsFormAndCheckbox[2];

    name.value = "";
    name.classList.remove("modal-ring__form_error");
    name.classList.add("modal-ring__form_right");
    phone.value = "";
    phone.classList.remove("modal-ring__form_error");
    phone.classList.add("modal-ring__form_right");
    inputsFormAndCheckbox[2].checked = false;
    lable.classList.remove("modal-ring__form_error-box");

    for (let mess of errorMessages) {
      mess.classList.remove("modal-ring__error-text_visible");
    }
  };

  // События отвечающие за вызов функций отображения и скрытия модального окна

  callMeBtn.addEventListener("click", displayModal);
  window.addEventListener("keydown", function (evt) {
    if (evt.key == "Escape") {
      hideModal();
    }
  });
  closeBtnModalRing.addEventListener("click", hideModal);
  overlay.addEventListener("click", checkClickOutOfBorder);
})();
 // Скрипт открытия и закрытия модального окна;
(function phoneMask() {

  const inputs = document.querySelectorAll('.modal-ring__form input');
  const phoneInput = inputs[1];


  window.addEventListener("DOMContentLoaded", function() {
    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    }

    function mask(event) {
          var matrix = "+7 (___) ___ __ __",
              i = 0,
              def = matrix.replace(/\D/g, ""),
              val = this.value.replace(/\D/g, "");
          if (def.length >= val.length) val = def;
          this.value = matrix.replace(/./g, function(a) {
              return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
          });
          if (event.type == "blur") {
              if (this.value.length == 2) this.value = ""
          } else setCursorPosition(this.value.length, this)
      };

      phoneInput.addEventListener("input", mask, false);
    });

})();
 // Скрипт для маски в поле ввода телефона;
(function validateAndSendForm() {
  const sendBtn = document.querySelector(".modal-ring__form button");
  const allInputs = document.querySelectorAll(".modal-ring__form input");
  const customerName = allInputs[0];
  const customerPhone = allInputs[1];
  const checkboxRule = allInputs[2];
  const lable = document.querySelector(".modal-ring__form label");
  const errorMessages = document.querySelectorAll(".modal-ring__error-text");

  // localStorage.clear() // раскоментировать чтобы почистить localStorage в случае ошибок связанных с храналищем;

  // Проверяет инпут имя на валидность и меняет классы в случае ошибки;

  const checkName = function () {
    let errorText = errorMessages[0];

    if (customerName.value != "") {
      customerName.classList.add("modal-ring__form_right");
      customerName.classList.remove("modal-ring__form_error");
      errorText.classList.remove("modal-ring__error-text_visible");
      return true;
    } else {
      customerName.classList.remove("modal-ring__form_right");
      customerName.classList.add("modal-ring__form_error");
      errorText.classList.add("modal-ring__error-text_visible");
      return false;
    }
  };

  // Проверяет инпут телефон на валидность и меняет классы в случае ошибки;

  const checkPhone = function () {
    let errorText = errorMessages[1];

    if (customerPhone.value.length == 18) {
      customerPhone.classList.add("modal-ring__form_right");
      customerPhone.classList.remove("modal-ring__form_error");
      errorText.classList.remove("modal-ring__error-text_visible");
      return true;
    } else {
      customerPhone.classList.remove("modal-ring__form_right");
      customerPhone.classList.add("modal-ring__form_error");
      errorText.classList.add("modal-ring__error-text_visible");
      return false;
    }
  };

  // Проверяет чекбокс на установленную галочку и меняет классы в случае ошибки;

  const checkRuleBox = function () {
    if (checkboxRule.checked) {
      lable.classList.add("modal-ring__form_right-box");
      lable.classList.remove("modal-ring__form_error-box");
    } else {
      lable.classList.add("modal-ring__form_error-box");
      lable.classList.remove("modal-ring__form_right-box");
    }

    return checkboxRule.checked;
  };

  // Общая функция проверки валидности всех инпутов в форме, запускает подфункции проверки

  const checkValidateAll = function () {
    let result = true;

    if (checkName() == false) {
      result = false;
    }

    if (checkPhone() == false) {
      result = false;
    }

    if (checkRuleBox() == false) {
      result = false;
    }
    return result;
  };

  // Функция добавляет данные из формы в localStorage

  const addDateToStorage = function () {
    let infoObj = {
      name: customerName.value,
      phone: customerPhone.value,
    };
    let rightFormat = JSON.stringify(infoObj);
    let freeStore = checkFreeKey(0);

    localStorage.setItem(freeStore, rightFormat);
  };

  // Подфункция вычисляет свободную ячейку для записи в localStorage;

  const checkFreeKey = function (num) {
    let result = 0;

    function findNumber(num) {
      if (localStorage.getItem(num) == null) {
        result = num;
      } else {
        findNumber(num + 1);
      }
    }
    findNumber(num);

    return result;
  };

  // Событие на кнопку отправки

  sendBtn.addEventListener("click", function () {
    if (checkValidateAll()) {
      addDateToStorage();
    }
  });
})();
 // Скрипт проверки валидности полей формы и отправки данных в localstorage;
