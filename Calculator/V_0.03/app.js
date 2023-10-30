    function displayTime()
    {
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var session = document.getElementById('session');

    document.getElementById('hours').innerHTML = hrs;
    document.getElementById('minutes').innerHTML = min;
    document.getElementById('seconds').innerHTML = sec;
    }
    setInterval(displayTime, 10);
    

    
    const history = [];

    let operatorAdded = false;

    function appendOperation(operation) 
    {
    const container = document.getElementById("resultArea");
    
        // If an operator is already added, prevent adding another one.
        if (operatorAdded && /[+\-*/^]/.test(operation)) {
            return;
        }
    
        container.innerHTML += operation;
    
        // Update the flag based on the operation.
        container.innerHtml += operation;
        operatorAdded = /[+\-*/^]/.test(operation);
    }
    
        
    function calculate() {
        const container = document.getElementById("resultArea");
        try {
            const calculation = container.innerHTML;
            let result;
    
            // Check for exponentiation
            if (calculation.includes("^")) {
                const parts = calculation.split('^');
                if (parts.length === 2) {
                    const base = parseFloat(parts[0]);
                    const exponent = parseFloat(parts[1]);
                    if (!isNaN(base) && !isNaN(exponent)) {
                        result = Math.pow(base, exponent);
                    } else {
                        container.innerHTML = 'Invalid input';
                        return;
                    }
                } else {
                    container.innerHTML = 'Invalid input';
                    return;
                }
            } else {
                // If no exponentiation, evaluate using JavaScript's eval
                result = eval(calculation);
            }
    
            container.innerHTML = result;
    
            // Reset the flag after calculating the result.
            operatorAdded = false;
    
            // Store the calculation and result in the history array.
            history.push({ calculation, result });
    
            // Display the history in the history area.
            displayHistory();
        } catch (error) {
            container.innerHTML = 'Error';
        }
    }
    
    
    function displayHistory() {
        const historyArea = document.getElementById("historyArea");
        historyArea.innerHTML = "Calculation History:<br>";
    
        history.forEach((entry, index) => {
            historyArea.innerHTML += `${index + 1}: ${entry.calculation} = ${entry.result}<br>`;
        });
    }

    function ClearHistory () {

        history.length = 0;
        displayHistory();
       
        // Display a message
        let messageArea = document.getElementById("resultArea");
        messageArea.innerHTML = "Calc. History Cleared!";


        // Clear the message after a few seconds (optional)
        setTimeout(function () {
        messageArea.innerHTML = '';
        }, 2000); // Display message for 2 seconds (adjust as needed)

        }

        function theNonFunctionalButton()
        {
        // Display a message
        let messageArea = document.getElementById("resultArea");
        messageArea.innerHTML = "Comes with the v0.05 Update";
        
        // Clear the message after a few seconds (optional)
        setTimeout(function () 
        {
        messageArea.innerHTML = '';
        }, 3000); // Display message for 3 seconds (adjust as needed)
        }

    function deletelast() 
    {
        const container = document.getElementById("resultArea");
        const currentDisplay = container.innerHTML;
        container.innerHTML = currentDisplay.slice(0, -1);
        calculation = calculation.slice(0, -1);
    
    
    }

    function clearDisplay() 
    {
        let container = document.getElementById("resultArea");
        container.innerHTML = ''; // Clear the display
       
        // Display a message
        let messageArea = document.getElementById("resultArea");
        messageArea.innerHTML = "Cleared!";

        // Clear the message after a few seconds (optional)
        setTimeout(function () {
        messageArea.innerHTML = '';
        }, 2000); // Display message for 3 seconds (adjust as needed)

    }


    function calculatePercentage() 
    {
        let container = document.getElementById("resultArea");
        try 
        {
        const expression = container.innerHTML;
        const result = eval(expression);
        const percentageResult = (result / 100).toString();
        container.innerHTML = percentageResult;
        } 
        catch (error) 
        {
        // Handle invalid expressions or errors
        container.innerHTML = 'Error';
        }
    }