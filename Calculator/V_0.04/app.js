//Hier wird ein leeres Array mit dem Namen 'history' erstellt. 
//Dieses Array dient zur Speicherung der Historie von Berechnungen und der Ergebnisse.
const history = [];

let operatorAdded = false;
let lastInputWasOperator = false;

function appendOperation(operation) {
    const container = document.getElementById("resultArea");

    if (/[+\-*/^]/.test(operation)) {
        if (operatorAdded && operation !== '-') {
            return; // Verhindert aufeinanderfolgende Operatoren, außer für negative Zahlen.
        }
        operatorAdded = true;
    } else {
        operatorAdded = false;
    }

    if (operation === "-" && (container.innerHTML === "" || lastInputWasOperator)) {
        // Wenn das Vorzeichen "-" und der Container leer ist oder der vorherige Eintrag ein Operator ist, handelt es sich um eine negative Zahl.
        container.innerHTML += operation;
    } else if (operation === "-" && lastInputWasOperator) {
        // Wenn das Vorzeichen "-" und der vorherige Eintrag ebenfalls ein Operator ist, wird es ignoriert.
        return;
    } else {
        // Wenn das Vorzeichen "-" nicht direkt auf ein anderes "-" folgt, wird es hinzugefügt.
        container.innerHTML += operation;
    }

    lastInputWasOperator = /[+\-*/^]/.test(operation); //Regex
}



    // Funktion zur Durchführung der Berechnung, wenn auf das Gleichheitszeichen (=) geklickt wird. 
    // Zuerst wird die Eingabe validiert und führt dann die Berechnung durch und zeigt das Ergebnis an.
    // Aber wie?
    // Wenn die Eingabe ungültige Zeichen enthält oder die Berechnung fehlschlägt, wird 'Fehler' angezeigt.

    function calculate() 
    {
    const container = document.getElementById("resultArea");
    const calculation = container.innerHTML;

    // Prüft ob man mathemathisch alles richtig eingegeben hat
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
                    result = Math.pow(base, exponent); //Erklärung des Vorgangs
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
            result = eval(calculation); //Erklärung eval
        }

        if (isNaN(result) || !isFinite(result)) {
            container.innerHTML = 'Fehler';
        } else {
            container.innerHTML = result;

            // Setzt die Flag zurück.
            operatorAdded = false;

            // Speichert die Rechnung und das Ergbnis im Fenster vergangene Rechnungen
            history.push({ calculation, result });

            // Zeigt die vergangenen Rechnungen an
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
        container.innerHTML = ''; 

        history.length = 0;
        displayHistory(); // Löscht die HistoryAnzeige
       
        let messageArea = document.getElementById("historyArea");
        messageArea.innerHTML = "Vergangene Rechnungen gelöscht!";

        setTimeout(function () {
        messageArea.innerHTML = '';
        }, 2000);

    }
     
    // Funktion zum Entfernen des letzten Zeichens aus der aktuellen Berechnung [DEL]
    function deletelast() 
    {
        const container = document.getElementById("resultArea");
        const currentDisplay = container.innerHTML;
        const lastChar = currentDisplay.slice(-1);  // Holt sich das letzte Zeichen zurück
        container.innerHTML = currentDisplay.slice(0, -1);
    
        // Überprüft ob das letzte Zeichen ein Operator war
        if (/[+\-*/^]/.test(lastChar)) {
            operatorAdded = false; // Setzt die Flag zurück wenn es sich um ein Zeichen handelt
        }
    
        calculation = calculation.slice(0, -1);
    }
    

    // Funktion zum Löschen des gesamten Inhalts im Anzeigebereich (resultArea). Es zeigt eine kurze Bestätigung der Löschung an und verschwindet kurz danach wieder. [AC]
    function clearDisplay() 
    {
        let container = document.getElementById("resultArea");
        container.innerHTML = ''; // Löschen Sie die Anzeige
    
        // Wenn alles gelöscht wird, setzt sich die Flag auf seinen Ursprungsstatus zurück
        operatorAdded = false;
    
    
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