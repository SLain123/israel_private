(function modalWindow() {
  const overlay = document.querySelector(".overlay");
  const callMeBtn = document.querySelector(".menu__ring-me");
  const closeBtnModalRing = document.querySelector(".modal-ring__cls-btn-link");
  const closeBtnModalAccept = document.querySelector(".modal-accept__cls-btn-link");
  const inputName = document.querySelector(".modal-ring__name");
  const inputPhone = document.querySelector(".modal-ring__phone");
  const checkbox = document.querySelector(".modal-ring__checkbox");
  const label = document.querySelector(".modal-ring__form label");
  const errorMessages = document.querySelectorAll(".modal-ring__error-text");
  const modalAccept = document.querySelector(".modal-accept");
  const okBtn = document.querySelector('.modal-accept__btn-ok');

  // Функции отвечающие за отображение и скрытие модального окна

  const displayModal = function () {
    let body = document.querySelector("body");
    let padding = findPadding();

    overlay.classList.remove("overlay-hide");
    overlay.classList.add("overlay-visible");

    body.style.paddingRight = `${padding}px`;
    body.classList.add("no-scroll");

    inputName.focus();
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
    if (evt.target === overlay) {
      hideAccept();
    }
  };

  // Функция высчитывает отступ равный скроллу браузера;

  const findPadding = function () {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  // Функция чистить форму после закрытия или отправки;

  const cleanForm = function () {
    inputName.value = "";
    inputName.classList.remove("modal-ring__form_error");
    inputName.classList.add("modal-ring__form_right");
    inputPhone.value = "";
    inputPhone.classList.remove("modal-ring__form_error");
    inputPhone.classList.add("modal-ring__form_right");
    checkbox.checked = false;
    label.classList.remove("modal-ring__form_error-box");

    for (let mess of errorMessages) {
      mess.classList.remove("modal-ring__error-text_visible");
    }
  };

  // Функция активации чекбокса

  const activateCheckBox = function () {
    if (checkbox.checked) {
      checkbox.checked = false;
    } else checkbox.checked = true;
  };

  // Функции скрытия модального окна "Заявка принята"

  const hideAccept = function() {
    modalAccept.classList.remove("modal-accept_visible");
    modalAccept.classList.add("modal-accept_hide");
    hideModal();
  }

  // События отвечающие за вызов функций отображения и скрытия модального окна

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
})();
