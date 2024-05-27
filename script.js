'use strict'

const display = document.querySelector('.display');
const temp = document.querySelector('h1');
const buttonContainer = document.querySelector('.button-container');

let firstNumber = 0;
let secondNumber = null;
let operator = null;
let displayText = 0;
let isEqualsPressed = false;

buttonContainer.addEventListener('click', event => {
  const value = event.target.value;

  switch (value) {
    case 'c':
      reset();
      break;
    case '=':
      calculate(value);
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      updateOperator(value);
      break;
    case '.':
      addDecimal();
      break;
    default:
      updateNumbers(value);
      break;
  };
  updateDisplay();
  console.log(`${firstNumber} ${operator} ${secondNumber} ${isEqualsPressed}`);
});

function updateDisplay() {
  display.textContent = displayText;
}

function reset() {
  firstNumber = 0;
  secondNumber = null;
  operator = null;
  displayText = 0
}

function updateNumbers(value) {
  if (!operator) {
    if (firstNumber == 0) {
      firstNumber = value;    
    } else {
      firstNumber = `${firstNumber}${value}`;
    }
    displayText = firstNumber;
  } else {
    if (secondNumber === null) {
      secondNumber = value;
    } else {
      secondNumber = `${secondNumber}${value}`;
    }
    displayText = secondNumber;
  }
}

function updateOperator(value) {
  const hasOperatorAlready = (operator !== null)
  if (hasOperatorAlready && !isEqualsPressed) {
    displayText = operate();
    firstNumber = displayText;
  }
  operator = value;
  isEqualsPressed = false;
  secondNumber = null;
}

function calculate(value) {
  if (operator) {
    displayText = operate();
    firstNumber = displayText;
    isEqualsPressed = true;
  }
}

function operate() {
  if (operator == null) { return firstNumber; }
  if (!secondNumber) { secondNumber = firstNumber };
  
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);
 
  let result;
  switch(operator) {
    case '+': 
      result = add(num1, num2);
      break;
    case '-': 
      result = subtract(num1, num2);
      break;
    case '*': 
      result = multiply(num1, num2);
      break;
    case '/': 
      result = divide(num1, num2);
      break;
    default: 
      result = parseFloat(firstNumber);
      break;
  }
  return result;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}


// Test Code //
console.groupCollapsed('Variables');
console.log(`firstNumber: ${firstNumber}`);
console.log(`secondNumber: ${secondNumber}`);
console.log(`operator: ${operator}`);
console.groupEnd('Variables');

console.groupCollapsed('Tests');
console.groupCollapsed('Operations');
testFunc(8, add, 6, 2);
testFunc(4, subtract, 6, 2);
testFunc(12, multiply, 6, 2);
testFunc(3, divide, 6, 2);
console.groupEnd('Operations');
console.groupEnd('Tests');

function testFunc(expected, func, ...args) {
  const name = arguments[1].toString().slice(9).split('(')[0];
  const recieved = func(...args);
  const isExpected = recieved == expected;
  const testCase = `${name}(${args.join(', ')}) = ${expected}`;
  
  isExpected ?  
    console.log(`✅ - ${testCase}`) :
    console.error(`❌ - ${testCase}\n\n\t\tExpected: ${expected}\n\t\tRecieved: ${recieved}`);
}

