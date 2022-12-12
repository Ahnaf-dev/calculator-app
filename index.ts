const buttons = document.querySelectorAll("button");
const prevResultDisplay = document.querySelector(".text-sm");
const currentResultDisplay = document.querySelector(".text-lg");

interface State {
  firstValue: string;
  operation: string;
  lastValue: string;
}

const state: State = {
  firstValue: "",
  operation: "",
  lastValue: "",
};

buttons.forEach(function (button) {
  if (button.dataset.operation === "calculate") {
    button.addEventListener("click", calculateValues);
  } else if (button.dataset.operation === "clear") {
    button.addEventListener("click", clearStateAndDisplay);
  } else {
    button.addEventListener("click", gatherValuesAndDisplay);
  }
});

function gatherValuesAndDisplay() {
  let pressedValue: string = this.innerText;
  let dataType: "num" | "op" = this.dataset.type;

  setState(pressedValue, dataType);
  displayValues("current");
}

function setState(value: string, type: "num" | "op") {
  if (type === "num" && !state.firstValue) {
    state.firstValue = value;
    return;
  }

  if (type === "num" && state.firstValue && !state.operation) {
    state.firstValue += value;
  }

  if (type === "op" && state.firstValue) {
    if (value !== "=") {
      state.operation = " " + value + " ";
    }
  }

  if (type === "num" && state.operation && state.firstValue) {
    state.lastValue += value;
  }
}

function calculateValues() {
  if (!state.operation || !state.lastValue) {
    alert("Please enter a proper operation");
    return;
  }

  displayValues("previous");

  let operation = state.operation.trim();
  let firstValue = Number(state.firstValue);
  let lastValue = Number(state.lastValue);

  switch (operation) {
    case "+":
      state.firstValue = `${firstValue + lastValue}`;
      break;
    case "%":
      state.firstValue = `${firstValue % lastValue}`;
      break;
    case "X":
      state.firstValue = `${firstValue * lastValue}`;
      break;
    case "-":
      state.firstValue = `${firstValue - lastValue}`;
      break;
  }

  displayValues("results");
}

function displayValues(history: "previous" | "current" | "results") {
  let text: string =
    (state.firstValue ? state.firstValue : "") +
    (state.operation ? state.operation : "") +
    (state.lastValue ? state.lastValue : "");

  if (history === "results") {
    state.operation = "";
    state.lastValue = "";
    currentResultDisplay.textContent = state.firstValue;
  } else if (history === "previous") {
    prevResultDisplay.textContent = text;
  } else {
    currentResultDisplay.textContent = text;
  }
}

function clearStateAndDisplay() {
  state.firstValue = "";
  state.operation = "";
  state.lastValue = "";
  prevResultDisplay.textContent = "0";
  currentResultDisplay.textContent = "0";
}
