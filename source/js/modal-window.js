(function modalWindow() {
  const modalMain = document.querySelector(".modal");
  const modalRing = document.querySelector(".modal-ring");
  const overlay = document.querySelector(".modal__overlay");
  const callMeBtn = document.querySelector(".menu__ring-me");
  const closeBtnModalRing = document.querySelector(".modal-ring__cls-btn-link");
  const closeBtnModalAccept = document.querySelector(
    ".modal-accept__cls-btn-link"
  );
  const inputName = document.querySelector(".modal-ring__name");
  const inputPhone = document.querySelector(".modal-ring__phone");
  const checkbox = document.querySelector(".modal-ring__checkbox");
  const label = document.querySelector(".modal-ring__lable");
  const modalAccept = document.querySelector(".modal-accept");
  const okBtn = document.querySelector(".modal-accept__btn-ok");

  // Функции отвечающие за отображение и скрытие модального окна

  const displayModal = function () {
    let body = document.querySelector("body");
    let padding = findPadding();

    modalMain.classList.add("modal_visible");

    body.style.paddingRight = `${padding}px`;
    body.classList.add("no-scroll");

    inputName.focus();
  };

  const hideModal = function () {
    let body = document.querySelector("body");

    modalMain.classList.remove("modal_visible");

    setTimeout(function() {
      body.style.paddingRight = `0`;
    body.classList.remove("no-scroll");

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
    } else checkbox.checked = true;
  };

  // Функции скрытия модального окна "Заявка принята"

  const hideAccept = function () {
    modalAccept.classList.add("modal-accept_hide");
    setTimeout(function() {
      modalRing.classList.remove("modal-ring_hide");
    },400);
    hideModal();
  };

  // Функция добавляет данные из localStorage в форму

  const fillForm = function() {
    let dataMain = JSON.parse(localStorage.getItem('data'));
    if(dataMain !== null) {
      let {name, phone} = dataMain;

      inputName.value = name;
      inputPhone.value = phone;
    }
  }

  // События отвечающие за вызов функций отображения и скрытия модального окна

  callMeBtn.addEventListener("click", function() {
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
})();
