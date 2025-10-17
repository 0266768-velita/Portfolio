
  @param {number} n 
  @returns {number|string} 
 
function calculateFibonacci(n) {
   
    if (n < 0) {
        return "The Fibonacci index must be non-negative.";
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

   
    let a = 0; 
    let b = 1; 
    let temp;

    for (let i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }

    return b;
}


function handleCalculation() {
  
    const inputElement = document.getElementById('num');
    const labelElement = document.getElementById('fibonacciLbl');

    if (!inputElement || !labelElement) {
        labelElement.textContent = "Error: HTML elements not found.";
        return;
    }

    const nString = inputElement.value;
    const n = parseInt(nString);

    if (isNaN(n) || nString.trim() === "") {
        labelElement.textContent = "Please enter an integer number.";
        labelElement.style.color = 'red';
        return;
    }

    // Calculate 
    const result = calculateFibonacci(n);

    //  result
    if (typeof result === 'string') {
       
        labelElement.textContent = result;
        labelElement.style.color = 'red';
    } else {
     
        labelElement.textContent = `F(${n}) = ${result}`;
        labelElement.style.color = '#28a745'; 
    }
}



document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('btn');
    
    if (button) {
       
        button.addEventListener('click', handleCalculation);
    }
});