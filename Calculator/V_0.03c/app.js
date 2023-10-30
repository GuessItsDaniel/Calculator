//Hier wird ein leeres Array mit dem Namen 'history' erstellt. 
//Dieses Array dient zur Speicherung der Historie von Berechnungen und der Ergebnisse.
const history = [];

//Die Variable 'operatorAdded' wird verwendet, um festzuhalten, ob ein Operator (+, -, *, /, ^) zur aktuellen Berechnung hinzugefügt wurde. 
//Sie ist zuerst auf 'false' gesetzt und wird später verwendet, um die Berechnung zu überwachen.
//Arbeitet mit appendOperation zusammen 
let operatorAdded = false;

// Funktion zum Hinzufügen von Zahlen, Operatoren oder anderen Zeichen zur aktuellen Berechnung im Anzeigebereich.
// Überprüft, ob die übergebene Operation ein mathemathischer Operator ist und behandelt die Logik, um das Hinzufügen mehrerer aufeinanderfolgender Operatoren zu verhindern. 
// Wenn die Operation kein Operator ist, wird die 'operatorAdded'-Flagge zurückgesetzt.
    function appendOperation(operation) 
    {
        const container = document.getElementById("resultArea");

        // Checkt ab ob der aktuelle Vorgang ein "operator" ist (+, -, *, /, ^).
        // Um zu verhindern das mehrere "operator" hintereinander hizugefügt werden.
        if (/[+\-*/^]/.test(operation)) 
        {
        // Ein if Statement um zu überpüfen ob schon ein "operator" als letztens in der Rechnung eigegeben wurde.
        // Um Eigabefehler in der Kalkulation zu verhindern 
        if (operatorAdded) 
        {
            return;
        } 
            else 
        {
            // Wenn ein "operator" hinzugefügt wird setzt diese Funktion den Status auf 'true'.
            operatorAdded = true;
        }
        } 
            else 
        {
        // Für Zahlen, wird der Status auf 'false' gestzt
        operatorAdded = false;
        }

        container.innerHTML += operation;
    }

        
    // Funktion zur Durchführung der Berechnung, wenn auf das Gleichheitszeichen (=) geklickt wird. 
    // Zuerst wird die Eingabe validiert und führt dann die Berechnung durch und zeigt das Ergebnis an.
    // Aber wie?
    // Wenn die Eingabe ungültige Zeichen enthält oder die Berechnung fehlschlägt, wird 'Fehler' angezeigt.

    function calculate() 
    {
    const container = document.getElementById("resultArea");
    const calculation = container.innerHTML;

    // Input validation: Check if the input contains only valid characters.
    if (/[^0-9()+\-*\/.^%]/.test(calculation)) {
        container.innerHTML = 'Fehler';
        return;
    }

    try {
        let result;

        // Checkt ob ein Exponent eingegeben wurde
        if (calculation.includes("^")) {
            const parts = calculation.split('^');
            if (parts.length === 2) {
                const base = parseFloat(parts[0]);
                const exponent = parseFloat(parts[1]);
                if (!isNaN(base) && !isNaN(exponent)) {
                    result = Math.pow(base, exponent);
                } else {
                    container.innerHTML = 'Fehler';
                    return;
                }
            } else {
                container.innerHTML = 'Fehler';
                return;
            }
        } else {
            // da es sich um dynamischen Code handelt ist dieser in Sicherheitskritischen Anwedungsbereichen nicht zu empfehlen.
            result = eval(calculation);
        }

        if (isNaN(result) || !isFinite(result)) {
            container.innerHTML = 'Fehler';
        } else {
            container.innerHTML = result;

            // Reset the flag after calculating the result.
            operatorAdded = false;

            // Store the calculation and result in the history array.
            history.push({ calculation, result });

            // Display the history in the history area.
            displayHistory();
        }
    } catch (error) {
        container.innerHTML = 'Fehler';
    }
    }

    
    
    // Funktion zum Anzeigen der Berechnungshistorie. Sie aktualisiert den Bereich 'historyArea' mit den vergangenen Berechnungen und ihren Ergebnissen.
    // spielt im Zusammenhang der Array Funktion mit um die Rechenhistorie aufzuzählen 
    function displayHistory() {
        const historyArea = document.getElementById("historyArea");
        historyArea.innerHTML = "Vergangene Rechnungen:<br>";
    
        history.forEach((entry, index) => {
            historyArea.innerHTML += `${index + 1}: ${entry.calculation} = ${entry.result}<br>`;
        });
    }

    // Funktion zum Löschen der Berechnungshistorie. Sie leert das 'history'-Array und aktualisiert die Anzeige. [  Vergange  ]
    // Diese Funktion bestätigt die Löschung der Historie durch eine eingehende Naricht.                         [Rechnungnen ]
    // Außerdem wird diese Nachricht nach einigen Sekunden wieder gelöscht.                                      [  löschen   ]
    function ClearHistory () 
    {

        let container = document.getElementById("historyArea");
        container.innerHTML = ''; // Löscht die HistoryAnzeige

        history.length = 0;
        displayHistory();
       
        // Display a message
        let messageArea = document.getElementById("historyArea");
        messageArea.innerHTML = "Vergangene Rechnungen gelöscht!";

        // Clear the message after a few seconds (optional)
        setTimeout(function () {
        messageArea.innerHTML = '';
        }, 2000); // Display message for 2 seconds (adjust as needed)

    }
     
    // Funktion zum Entfernen des letzten Zeichens aus der aktuellen Berechnung [DEL]
    function deletelast() 
    {
        const container = document.getElementById("resultArea");
        const currentDisplay = container.innerHTML;
        const lastChar = currentDisplay.slice(-1);  // Holen Sie sich das letzte Zeichen
        container.innerHTML = currentDisplay.slice(0, -1);
    
        // Überprüfen Sie, ob das gelöschte Zeichen ein Operator war und aktualisieren Sie operatorAdded entsprechend
        if (/[+\-*/^]/.test(lastChar)) {
            operatorAdded = false; // Wenn es ein Operator war, setzen Sie den Flag zurück
        }
    
        // Passen Sie die calculation-Variable an (falls Sie sie verwenden)
        calculation = calculation.slice(0, -1);
    }
    

    // Funktion zum Löschen des gesamten Inhalts im Anzeigebereich (resultArea). Es zeigt eine kurze Bestätigung der Löschung an und verschwindet kurz danach wieder. [AC]
    function clearDisplay() 
    {
        let container = document.getElementById("resultArea");
        container.innerHTML = ''; // Löschen Sie die Anzeige
    
        // Wenn alles gelöscht wird, setzt sich die Flag auf die Ursprungsfunktion zurück
        operatorAdded = false;
    
        // Anzeigen einer Löschnachricht (wenn erforderlich)
        let messageArea = document.getElementById("resultArea");
        messageArea.innerHTML = "Gelöscht!";
    
        // Löschen der Nachricht nach einigen Sekunden
        setTimeout(function () {
            messageArea.innerHTML = '';
        }, 2000); // Anzeige der Nachricht für 2 Sekunden 
    }
    

    // Funktion zur Berechnung des Prozentsatzes ändert die aktuelle Zahl im Anzeigebereich zum Equivalent einer Prozentzahl.[%] 
    // Es teilt das Ergebnis durch 100 und zeigt den Prozentsatz an. Bei Fehlern wird der Benutzer darüber benachrichtigt.   [%]
    function calculatePercentage() {
        let container = document.getElementById("resultArea");
    
        try {
            const expression = container.innerHTML;
            if (!expression) {
                // Wenn die Berechnung leer ist, zeige "Fehler" an
                container.innerHTML = 'Fehler';
                return;
            }
    
            const result = eval(expression);
            const percentageResult = (result / 100).toString();
            container.innerHTML = percentageResult;
        } catch (error) {
            // Bei ungültigen Angaben wird "Fehler" angezeigt
            container.innerHTML = 'Fehler';
        }
    }
    


        // Eine Schaltfläche der nichts zugewiesen wurde, die den Benutzer beim anklicken darüber informiert.
        // Diesen Eingefürht als eine Art Platzhalter für mögliche neue Funktionen
        // Lässt sich nicht in der Version 0.03c widerfinden
        function theNonFunctionalButton()
        {

        let messageArea = document.getElementById("resultArea");
        messageArea.innerHTML = "irgendwann";
        
        setTimeout(function () 
        {
        messageArea.innerHTML = '';
        }, 3000);

        }