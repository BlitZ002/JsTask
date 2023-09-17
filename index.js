let isOriginalValue = true;
const oldValues = ['Internship', 'Pabau', 'Employment', 'Career'];
const newValues = ["Valdrin", "Maloku", "21", "Bachelor"];
let persistentSelection = [];

function updatePersistentSelection(checkbox) {
    if (checkbox.checked) {
        if (!persistentSelection.includes(checkbox.value)) {
            persistentSelection.push(checkbox.value);
        }
    } 
    
    else {
        const index = persistentSelection.indexOf(checkbox.value);
        if (index > -1) {
            persistentSelection.splice(index, 1);
        }
    }
}

// Add change event listeners to checkboxes
document.querySelectorAll('#checkboxForm input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        updatePersistentSelection(this);
    });
});

// Event listener for "Change Values" button
document.getElementById('changeValues').addEventListener('click', function() {
    console.log("Button clicked");
    console.log("Intial isOroginalValue", isOriginalValue);
    console.log("Final isOriginalValue", isOriginalValue);
    const checkboxes = document.querySelectorAll('#checkboxForm input[type="checkbox"]');
    let valuesToUse;

    if(isOriginalValue){
        valuesToUse = newValues;
    }
    else{
        valuesToUse = oldValues;
    }
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = persistentSelection.includes(valuesToUse[index]);
        checkbox.value = valuesToUse[index];
        checkbox.nextSibling.nodeValue = valuesToUse[index]; // This changes the display text next to checkbox
    });

    isOriginalValue = !isOriginalValue;
});

// Event listener for "Show selected values" button
document.getElementById('showSelected').addEventListener('click', function() {
    const output = document.getElementById('output');
    output.textContent = "Selected Values: " + persistentSelection.join(", ");
});


// Event listener for "Clear Selections" button
document.getElementById('clearCheckboxes').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('#checkboxForm input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false; // Uncheck all checkboxes
    });
    persistentSelection = []; // Clear persistent selection array
    const output = document.getElementById('output');
    output.textContent = "Selected Values: None"; // Clear the displayed selected values
});



//Event listener for shuffling checkboxes
    document.getElementById('shuffleButton').addEventListener('click', function() {
    const form = document.getElementById('checkboxForm');
    const containers = Array.from(form.getElementsByClassName('checkbox-container'));
    const buttonGroup = document.querySelector('.button-group');

    //Shuffling using Durstenfeld shuffle
    for (let index = containers.length - 1; index > 0; index--) {
        const j = Math.floor(Math.random() * (index + 1));
        [containers[index], containers[j]] = [containers[j], containers[index]];
    }

    //Re-append the shuffled containers to the form
    containers.forEach(container => {
        form.insertBefore(container, buttonGroup);
    });
});
