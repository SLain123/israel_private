'use strict';

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function modalWindow() {
  var overlay = document.querySelector(".overlay");
  var callMeBtn = document.querySelector(".menu__ring-me");
  var closeBtnModalRing = document.querySelector(".modal-ring__cls-btn-link");
  var closeBtnModalAccept = document.querySelector(".modal-accept__cls-btn-link");
  var inputName = document.querySelector(".modal-ring__name");
  var inputPhone = document.querySelector(".modal-ring__phone");
  var checkbox = document.querySelector(".modal-ring__checkbox");
  var label = document.querySelector(".modal-ring__form label");
  var errorMessages = document.querySelectorAll(".modal-ring__error-text");
  var modalAccept = document.querySelector(".modal-accept");
  var okBtn = document.querySelector('.modal-accept__btn-ok'); // Функции отвечающие за отображение и скрытие модального окна

  var displayModal = function displayModal() {
    var body = document.querySelector("body");
    var padding = findPadding();
    overlay.classList.remove("overlay-hide");
    overlay.classList.add("overlay-visible");
    body.style.paddingRight = "".concat(padding, "px");
    body.classList.add("no-scroll");
    inputName.focus();
  };

  var hideModal = function hideModal() {
    var body = document.querySelector("body");
    overlay.classList.add("overlay-hide");
    overlay.classList.remove("overlay-visible");
    body.style.paddingRight = "0";
    body.classList.remove("no-scroll");
    cleanForm();
  };

  var checkClickOutOfBorder = function checkClickOutOfBorder(evt) {
    if (evt.target === overlay) {
      hideAccept();
    }
  }; // Функция высчитывает отступ равный скроллу браузера;


  var findPadding = function findPadding() {
    return window.innerWidth - document.documentElement.clientWidth;
  }; // Функция чистить форму после закрытия или отправки;


  var cleanForm = function cleanForm() {
    inputName.value = "";
    inputName.classList.remove("modal-ring__form_error");
    inputName.classList.add("modal-ring__form_right");
    inputPhone.value = "";
    inputPhone.classList.remove("modal-ring__form_error");
    inputPhone.classList.add("modal-ring__form_right");
    checkbox.checked = false;
    label.classList.remove("modal-ring__form_error-box");

    var _iterator = _createForOfIteratorHelper(errorMessages),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var mess = _step.value;
        mess.classList.remove("modal-ring__error-text_visible");
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }; // Функция активации чекбокса


  var activateCheckBox = function activateCheckBox() {
    if (checkbox.checked) {
      checkbox.checked = false;
    } else checkbox.checked = true;
  }; // Функции скрытия модального окна "Заявка принята"


  var hideAccept = function hideAccept() {
    modalAccept.classList.remove("modal-accept_visible");
    modalAccept.classList.add("modal-accept_hide");
    hideModal();
  }; // События отвечающие за вызов функций отображения и скрытия модального окна


  callMeBtn.addEventListener("click", displayModal);
  window.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      hideModal();
    }
  });
  closeBtnModalRing.addEventListener("click", hideModal);
  closeBtnModalAccept.addEventListener("click", hideAccept);
  overlay.addEventListener("mousedown", checkClickOutOfBorder);
  label.addEventListener("click", activateCheckBox);
  okBtn.addEventListener('click', hideAccept);
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
  var lable = document.querySelector(".modal-ring__form label");
  var errorMessages = document.querySelectorAll(".modal-ring__error-text");
  var modalAccept = document.querySelector(".modal-accept"); // localStorage.clear() // раскоментировать чтобы почистить localStorage в случае ошибок связанных с храналищем;
  // Проверяет инпут имя на валидность и меняет классы в случае ошибки;

  var checkName = function checkName() {
    var errorText = errorMessages[0];

    if (inputName.value !== "") {
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
  }; // Проверяет инпут телефон на валидность и меняет классы в случае ошибки;


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
  }; // Проверяет чекбокс на установленную галочку и меняет классы в случае ошибки;


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

    if (checkName() === false) {
      result = false;
    }

    if (checkPhone() === false) {
      result = false;
    }

    if (checkRuleBox() === false) {
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
    var freeStore = checkFreeKey(0);
    localStorage.setItem(freeStore, rightFormat);
  }; // Подфункция вычисляет свободную ячейку для записи в localStorage;


  var checkFreeKey = function checkFreeKey(num) {
    var result = 0;

    function findNumber(num) {
      if (localStorage.getItem(num) === null) {
        result = num;
      } else {
        findNumber(num + 1);
      }
    }

    findNumber(num);
    return result;
  }; // Функция отображения модального окна "Заявка принята"


  var displayAcceptModal = function displayAcceptModal() {
    modalAccept.classList.add("modal-accept_visible");
    modalAccept.classList.remove("modal-accept_hide");
  }; // Событие на кнопку отправки


  sendBtn.addEventListener("click", function () {
    if (checkValidateAll()) {
      addDateToStorage();
      displayAcceptModal();
    }
  });
})(); // Скрипт проверки валидности полей формы и отправки данных в localstorage;