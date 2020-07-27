function accord() {
  const allItems = document.querySelectorAll(`.question__item`);
  const allAnswer = document.querySelectorAll(`.question__answer`);

  const detectRightItem = function (evt) {
    let currentArr = evt.path;
    let currentItem;
    currentArr.forEach(function (elem) {
      if (elem.tagName === `LI`) {
        currentItem = elem;
      }
    });

    let answerBlock = currentItem.nextElementSibling;

    return answerBlock;
  };

  const displayAnswer = function () {
    allAnswer.forEach(function (elem) {
      if (
        elem.getAttribute(`data-answer`) === `true` &&
        !elem.classList.contains(`question__answer_active`)
      ) {
        elem.classList.add(`question__answer_active`);
      } else {
        elem.classList.remove(`question__answer_active`);
      }
    });
  };

  const selectActiveAnswer = function (block) {
    allAnswer.forEach(function (elem) {
      elem.setAttribute(`data-answer`, `false`);
    });

    block.setAttribute(`data-answer`, `true`);
  };

  const displayRightArrow = function (block) {
    let rightQuestionBlock = block.previousElementSibling;
    let rightUseTag = rightQuestionBlock.querySelector(`use`);

    allItems.forEach(function (elem) {
      let useTag = elem.querySelector(`use`);

      useTag.setAttribute(`xlink:href`, `#arrow_down`);
    });

    if (
      block.getAttribute(`data-answer`) === `true` &&
      block.classList.contains(`question__answer_active`)
    ) {
      rightUseTag.setAttribute(`xlink:href`, `#arrow_up`);
    }
  };

  allItems.forEach(function (elem) {
    elem.addEventListener(`click`, function (evt) {
      selectActiveAnswer(detectRightItem(evt));
      displayAnswer();
      displayRightArrow(detectRightItem(evt));
    });
  });
}

export default accord;
