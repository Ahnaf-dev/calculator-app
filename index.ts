const buttons = document.querySelectorAll("button");
const prevResultDisplay = document.querySelector(".text-sm");
const currentResultDisplay = document.querySelector(".text-lg");
const dayBtn = document.querySelector(".day");
const nightBtn = document.querySelector(".night");

// calculator functionality

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
  } else if (button.dataset.operation === "previous") {
    button.addEventListener("click", resetPrevious);
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
      state.firstValue = `${firstValue / lastValue}`;
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

function resetPrevious() {
  if (state.lastValue) {
    state.lastValue = "";
  } else if (state.operation) {
    state.operation = "";
  } else if (state.firstValue) {
    state.firstValue = "";
  }

  displayValues("current");
}

// theme toggle functionality

interface themeVars {
  bg: string;
  primary: string;
  secondary: string;
}

nightBtn.addEventListener("click", () => {
  changeCSSVars({
    bg: "black",
    primary: "white",
    secondary: "black",
  });
});

dayBtn.addEventListener("click", () => {
  changeCSSVars({
    bg: "white",
    primary: "#22252d",
    secondary: "#2a2d37",
  });
});

function changeCSSVars(options: themeVars) {
  let root = document.querySelector(":root") as HTMLElement;
  root.style.setProperty("--bg", options.bg);
  root.style.setProperty("--primary", options.primary);
  root.style.setProperty("--secondary", options.secondary);
}
