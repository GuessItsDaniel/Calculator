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
    
    function updateAlert()
    {
        alert("Soon™")
    }
    

    function appendOperation(operation) 
        {
            const container = document.getElementById("resultArea");
            container.innerHTML += operation;

        }

        function calculateResult() {
    const container = document.getElementById("resultArea");
    try {
        let calculation = container.innerHTML;

        // Replace instances like 2(2*2) with 2*(2*2)
        calculation = calculation.replace(/(\d+)\(([^)]+)\)/g, "$1*($2)");

        const result = eval(calculation);
        container.innerHTML = result;
    } catch (error) {
        container.innerHTML = 'Error';
    }
}


        function calculatePower() {
    const container = document.getElementById("resultArea");
    try {
        const calculation = container.innerHTML;
        const parts = calculation.split('^');
        if (parts.length === 2) {
            const base = parseFloat(parts[0]);
            const exponent = parseFloat(parts[1]);
            if (!isNaN(base) && !isNaN(exponent)) {
                const result = Math.pow(base, exponent);
                container.innerHTML = result;
            } else {
                container.innerHTML = 'Invalid input';
            }
        } else {
            container.innerHTML = 'Invalid input';
        }
    } catch (error) {
        container.innerHTML = 'Error';
    }
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