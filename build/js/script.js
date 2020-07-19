'use strict';

(function modalWindow() {
  var modalMain = document.querySelector(".modal");
  var modalRing = document.querySelector(".modal-ring");
  var overlay = document.querySelector(".modal__overlay");
  var callMeBtn = document.querySelector(".menu__ring-me");
  var closeBtnModalRing = document.querySelector(".modal-ring__cls-btn-link");
  var closeBtnModalAccept = document.querySelector(".modal-accept__cls-btn-link");
  var inputName = document.querySelector(".modal-ring__name");
  var inputPhone = document.querySelector(".modal-ring__phone");
  var checkbox = document.querySelector(".modal-ring__checkbox");
  var label = document.querySelector(".modal-ring__lable");
  var modalAccept = document.querySelector(".modal-accept");
  var okBtn = document.querySelector(".modal-accept__btn-ok"); // Функции отвечающие за отображение и скрытие модального окна

  var displayModal = function displayModal() {
    var body = document.querySelector("body");
    var padding = findPadding();
    modalMain.classList.add("modal_visible");
    body.style.paddingRight = "".concat(padding, "px");
    body.classList.add("no-scroll");
    inputName.focus();
  };

  var hideModal = function hideModal() {
    var body = document.querySelector("body");
    modalMain.classList.remove("modal_visible");
    setTimeout(function () {
      body.style.paddingRight = "0";
      body.classList.remove("no-scroll");
    }, 400); // заменить на автозаполнение
  };

  var checkClickOutOfBorder = function checkClickOutOfBorder(evt) {
    if (evt.target === overlay) {
      hideAccept();
    }
  }; // Функция высчитывает отступ равный скроллу браузера


  var findPadding = function findPadding() {
    return window.innerWidth - document.documentElement.clientWidth;
  }; // Функция заполнит форму из localStorage
  // Функция активации чекбокса


  var activateCheckBox = function activateCheckBox() {
    if (checkbox.checked) {
      checkbox.checked = false;
    } else checkbox.checked = true;
  }; // Функции скрытия модального окна "Заявка принята"


  var hideAccept = function hideAccept() {
    modalAccept.classList.add("modal-accept_hide");
    setTimeout(function () {
      modalRing.classList.remove("modal-ring_hide");
    }, 400);
    hideModal();
  }; // Функция добавляет данные из localStorage в форму


  var fillForm = function fillForm() {
    var dataMain = JSON.parse(localStorage.getItem('data'));

    if (dataMain !== null) {
      var name = dataMain.name,
          phone = dataMain.phone;
      inputName.value = name;
      inputPhone.value = phone;
    }
  }; // События отвечающие за вызов функций отображения и скрытия модального окна


  callMeBtn.addEventListener("click", function () {
    fillForm();
    displayModal();
  });
  window.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      hideModal();
    }
  });
  closeBtnModalRing.addEventListener("click", hideModal);
  closeBtnModalAccept.addEventListener("click", hideAccept);
  overlay.addEventListener("mousedown", checkClickOutOfBorder);
  label.addEventListener("click", activateCheckBox);
  okBtn.addEventListener("click", hideAccept);
})(); // Скрипт открытия и закрытия модального окна;


(function phoneMask() {
  var phoneInput = document.querySelector('.modal-ring__phone');
  window.addEventListener("DOMContentLoaded", function () {
    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    }

    function mask(event) {
      var matrix = "+7 (___) ___ __ __",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, "");
      if (def.length >= val.length) val = def;
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
      });

      if (event.type == "blur") {
        if (this.value.length === 2) this.value = "";
      } else setCursorPosition(this.value.length, this);
    }

    ;
    phoneInput.addEventListener("input", mask, false);
  });
})(); // Скрипт для маски в поле ввода телефона;


(function validateAndSendForm() {
  var sendBtn = document.querySelector(".modal-ring__form button");
  var inputName = document.querySelector('.modal-ring__name');
  var inputPhone = document.querySelector('.modal-ring__phone');
  var checkbox = document.querySelector('.modal-ring__checkbox');
  var lable = document.querySelector(".modal-ring__lable");
  var errorMessages = document.querySelectorAll(".modal-ring__error-text");
  var modalRing = document.querySelector(".modal-ring");
  var modalAccept = document.querySelector(".modal-accept"); // localStorage.clear() // раскоментировать чтобы почистить localStorage в случае ошибок связанных с храналищем
  // Проверяет инпут имя на валидность и меняет классы в случае ошибки

  var checkName = function checkName() {
    var errorText = errorMessages[0];

    if (inputName.value) {
      inputName.classList.add("modal-ring__form_right");
      inputName.classList.remove("modal-ring__form_error");
      errorText.classList.remove("modal-ring__error-text_visible");
      return true;
    } else {
      inputName.classList.remove("modal-ring__form_right");
      inputName.classList.add("modal-ring__form_error");
      errorText.classList.add("modal-ring__error-text_visible");
      return false;
    }
  }; // Проверяет инпут телефон на валидность и меняет классы в случае ошибки


  var checkPhone = function checkPhone() {
    var errorText = errorMessages[1];

    if (inputPhone.value.length === 18) {
      inputPhone.classList.add("modal-ring__form_right");
      inputPhone.classList.remove("modal-ring__form_error");
      errorText.classList.remove("modal-ring__error-text_visible");
      return true;
    } else {
      inputPhone.classList.remove("modal-ring__form_right");
      inputPhone.classList.add("modal-ring__form_error");
      errorText.classList.add("modal-ring__error-text_visible");
      return false;
    }
  }; // Проверяет чекбокс на установленную галочку и меняет классы в случае ошибки


  var checkRuleBox = function checkRuleBox() {
    if (checkbox.checked) {
      lable.classList.add("modal-ring__form_right-box");
      lable.classList.remove("modal-ring__form_error-box");
    } else {
      lable.classList.add("modal-ring__form_error-box");
      lable.classList.remove("modal-ring__form_right-box");
    }

    return checkbox.checked;
  }; // Общая функция проверки валидности всех инпутов в форме, запускает подфункции проверки


  var checkValidateAll = function checkValidateAll() {
    var result = true;

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
  }; // Функция добавляет данные из формы в localStorage


  var addDateToStorage = function addDateToStorage() {
    var infoObj = {
      name: inputName.value,
      phone: inputPhone.value
    };
    var rightFormat = JSON.stringify(infoObj);
    localStorage.setItem('data', rightFormat);
  }; // Функция отображения модального окна "Заявка принята"


  var displayAcceptModal = function displayAcceptModal() {
    modalAccept.classList.remove("modal-accept_hide");
    modalRing.classList.add("modal-ring_hide");
  }; // Событие на кнопку отправки


  sendBtn.addEventListener("click", function () {
    if (checkValidateAll()) {
      addDateToStorage();
      displayAcceptModal();
    }
  });
})(); // Скрипт проверки валидности полей формы и отправки данных в localstorage;


(function () {
  var linkNav = document.querySelectorAll('.main__scroll-link');
  var V = 1; // скорость

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
            r = t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t);
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

  window.addEventListener("scroll", function (e) {
    var nav = document.querySelectorAll('section[id^="nav"]');

    for (var i = 0; i < nav.length; i++) {
      document.querySelector('a[href="#' + nav[i].id + '"]').className = 1 >= nav[i].getBoundingClientRect().top && nav[i].getBoundingClientRect().top >= 1 - nav[i].offsetHeight ? "red" : "";
    }
  }, false);
})(); // Скрипт нижнего скролла для кнопки на главной странице;