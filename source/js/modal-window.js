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
