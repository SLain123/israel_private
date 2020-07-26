function accord() {
  const allBtn = document.querySelectorAll(`.question__btn`);
  const allAnswer = document.querySelectorAll(`.question__answer`);

  const displayItem = function (evt) {
    let btn = detectActiveBtn(evt);
    let numberItem = btn.getAttribute(`data-btn`);

    allAnswer.forEach(function (elem) {
      if (elem.getAttribute(`data-answer`) === numberItem) {
        elem.classList.add(`question__answer_active`);
        console.log(elem.scrollHeight);
        window.scrollBy(0, elem.scrollHeight);
      }
    });
  };

  const detectActiveBtn = function (evt) {
    let click = evt.target.tagName;
    let btn;
    if (click === `BUTTON`) {
      btn = evt.target;
    } else if (click === `svg`) {
      btn = evt.target.parentElement;
    } else {
      btn = evt.target.parentElement.parentElement;
    }

    return btn;
  };

  const hideAllItems = function () {
    allAnswer.forEach(function (elem) {
      elem.classList.remove(`question__answer_active`);
    });
  };

  allBtn.forEach(function (elem) {
    elem.addEventListener(`click`, function (evt) {
      hideAllItems();
      displayItem(evt);
    });
  });
}

export default accord;
