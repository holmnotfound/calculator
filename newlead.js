const opButtons = document.querySelectorAll(".op");
const clearButton = document.querySelector(".bclear");
const digitButtons = document.querySelectorAll(".b.digit");
const display = document.querySelector("#display");
const result = document.querySelector("#result");

let isDigitTurn = true; // Första omgången aktiverar nummerknappar

function toggleButtons() {
    if (isDigitTurn) {
        // Aktivera digit-knappar
        digitButtons.forEach(button => {
            button.disabled = false;
        });

        // Inaktivera operator-knappar
        opButtons.forEach(button => {
            button.disabled = true;
        });
    } else {
        // Inaktivera digit-knappar
        digitButtons.forEach(button => {
            button.disabled = true;
        });

        // Aktivera operator-knappar
        opButtons.forEach(button => {
            button.disabled = false;
        });
    }
    
    isDigitTurn = !isDigitTurn; // Växla till nästa omgång
}

toggleButtons();

// Lyssna på knapptryck för siffror och operatorer
let lateOperator = "+";

digitButtons.forEach(button => {
    button.addEventListener("click", function() {
        display.value += button.textContent.trim();
        if (lateOperator === "+" ){
            result.value = Number(result.value) + Number(button.textContent.trim());
        } else if (lateOperator === "-"){
            result.value = Number(result.value) - Number(button.textContent.trim());
        } else if (lateOperator === "*"){
            result.value = Number(result.value) * Number(button.textContent.trim());
        } else if (lateOperator === "/"){
            result.value = Number(result.value) / Number(button.textContent.trim());
        }
        toggleButtons();
    });
});


opButtons.forEach(button => {
    button.addEventListener("click", function() {
        display.value += button.textContent.trim();
        lateOperator = button.textContent.trim();
        if (lateOperator === "√x"){
            const sqrtResult = Math.sqrt(result.value)
            result.value = sqrtResult;
            toggleButtons();
        } else if (lateOperator === "x^2"){
            const rotResult = result.value **2;
            result.value = rotResult;
            toggleButtons();
        }
        toggleButtons();
    });
});

// Knapp för att Clear display och result
clearButton.addEventListener("click", function(){
    display.value = "";
    result.value = "";
    lateOperator = "+";
});
