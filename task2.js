// первое решение
var formElement = document.forms["formElement"];

for (let index = 0; index < formElement.length; index++) {
  const input = formElement[index];
  input.addEventListener("focus", (event) => {
    input.classList.add("focused");
  });
  input.addEventListener("blur", () => {
    input.classList.remove("focused");
  });
}

// второе решение
formElement[0].onfocus = function (evt) {
  var activeElement = formElement.querySelector(".focused");
  if (activeElement) {
    activeElement.classList.remove("focused");
  }
  evt.target.classList.add("focused");
};

formElement[0].onblur = function (evt) {
  var activeElement = formElement.querySelector(".focused");
  if (activeElement) {
    activeElement.classList.remove("focused");
  }
};
formElement[1].onfocus = function (evt) {
  var activeElement = formElement.querySelector(".focused");
  if (activeElement) {
    activeElement.classList.remove("focused");
  }
  evt.target.classList.add("focused");
};

formElement[1].onblur = function (evt) {
  var activeElement = formElement.querySelector(".focused");
  if (activeElement) {
    activeElement.classList.remove("focused");
  }
};

// третье решение (в CSS)
// input:focus {
//     outline: solid 2px red;
// }
