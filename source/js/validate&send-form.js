(function validateAndSendForm() {
  const sendBtn = document.querySelector(".modal-ring__form button");
  const inputName = document.querySelector('.modal-ring__name');
  const inputPhone = document.querySelector('.modal-ring__phone');
  const checkbox = document.querySelector('.modal-ring__checkbox')
  const lable = document.querySelector(".modal-ring__form label");
  const errorMessages = document.querySelectorAll(".modal-ring__error-text");
  const modalAccept = document.querySelector(".modal-accept");

  // localStorage.clear() // раскоментировать чтобы почистить localStorage в случае ошибок связанных с храналищем;

  // Проверяет инпут имя на валидность и меняет классы в случае ошибки;

  const checkName = function () {
    let errorText = errorMessages[0];

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
  };

  // Проверяет инпут телефон на валидность и меняет классы в случае ошибки;

  const checkPhone = function () {
    let errorText = errorMessages[1];

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
  };

  // Проверяет чекбокс на установленную галочку и меняет классы в случае ошибки;

  const checkRuleBox = function () {
    if (checkbox.checked) {
      lable.classList.add("modal-ring__form_right-box");
      lable.classList.remove("modal-ring__form_error-box");
    } else {
      lable.classList.add("modal-ring__form_error-box");
      lable.classList.remove("modal-ring__form_right-box");
    }

    return checkbox.checked;
  };

  // Общая функция проверки валидности всех инпутов в форме, запускает подфункции проверки

  const checkValidateAll = function () {
    let result = true;

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
  };

  // Функция добавляет данные из формы в localStorage

  const addDateToStorage = function () {
    let infoObj = {
      name: inputName.value,
      phone: inputPhone.value,
    };
    let rightFormat = JSON.stringify(infoObj);
    let freeStore = checkFreeKey(0);

    localStorage.setItem(freeStore, rightFormat);
  };

  // Подфункция вычисляет свободную ячейку для записи в localStorage;

  const checkFreeKey = function (num) {
    let result = 0;

    function findNumber(num) {
      if (localStorage.getItem(num) === null) {
        result = num;
      } else {
        findNumber(num + 1);
      }
    }
    findNumber(num);

    return result;
  };

  // Функция отображения модального окна "Заявка принята"

  const displayAcceptModal = function() {
    modalAccept.classList.add("modal-accept_visible");
    modalAccept.classList.remove("modal-accept_hide");
  }

  // Событие на кнопку отправки

  sendBtn.addEventListener("click", function () {
    if (checkValidateAll()) {
      addDateToStorage();
      displayAcceptModal();
    }
  });
})();
