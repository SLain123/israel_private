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
