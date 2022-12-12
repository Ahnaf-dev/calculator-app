var buttons = document.querySelectorAll("button");
var prevResultDisplay = document.querySelector(".text-sm");
var currentResultDisplay = document.querySelector(".text-lg");
var dayBtn = document.querySelector(".day");
var nightBtn = document.querySelector(".night");
var state = {
    firstValue: "",
    operation: "",
    lastValue: "",
};
buttons.forEach(function (button) {
    if (button.dataset.operation === "calculate") {
        button.addEventListener("click", calculateValues);
    }
    else if (button.dataset.operation === "clear") {
        button.addEventListener("click", clearStateAndDisplay);
    }
    else if (button.dataset.operation === "previous") {
        button.addEventListener("click", resetPrevious);
    }
    else {
        button.addEventListener("click", gatherValuesAndDisplay);
    }
});
function gatherValuesAndDisplay() {
    var pressedValue = this.innerText;
    var dataType = this.dataset.type;
    setState(pressedValue, dataType);
    displayValues("current");
}
function setState(value, type) {
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
    var operation = state.operation.trim();
    var firstValue = Number(state.firstValue);
    var lastValue = Number(state.lastValue);
    switch (operation) {
        case "+":
            state.firstValue = "".concat(firstValue + lastValue);
            break;
        case "%":
            state.firstValue = "".concat(firstValue / lastValue);
            break;
        case "X":
            state.firstValue = "".concat(firstValue * lastValue);
            break;
        case "-":
            state.firstValue = "".concat(firstValue - lastValue);
            break;
    }
    displayValues("results");
}
function displayValues(history) {
    var text = (state.firstValue ? state.firstValue : "") +
        (state.operation ? state.operation : "") +
        (state.lastValue ? state.lastValue : "");
    if (history === "results") {
        state.operation = "";
        state.lastValue = "";
        currentResultDisplay.textContent = state.firstValue;
    }
    else if (history === "previous") {
        prevResultDisplay.textContent = text;
    }
    else {
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
    }
    else if (state.operation) {
        state.operation = "";
    }
    else if (state.firstValue) {
        state.firstValue = "";
    }
    displayValues("current");
}
nightBtn.addEventListener("click", function () {
    changeCSSVars({
        bg: "grey",
        primary: "white",
        secondary: "black",
    });
});
dayBtn.addEventListener("click", function () {
    changeCSSVars({
        bg: "white",
        primary: "#22252d",
        secondary: "#2a2d37",
    });
});
function changeCSSVars(options) {
    var root = document.querySelector(":root");
    root.style.setProperty("--bg", options.bg);
    root.style.setProperty("--primary", options.primary);
    root.style.setProperty("--secondary", options.secondary);
}
