const simulationStepTime = 1000;
const subjectList = document.getElementById('subjectList');
var subjects = [
    {"label": "Time", "value": 0, "focus": 0.1, "update": timeUpdate},
    {"label": "Needs", "value": 0.2, "focus": 0.7, "update": needsUpdate},
    {"label": "Health", "value": 0.2, "focus": 0.2, "update": healthUpdate}
];

// Init
subjects.forEach(subject => {
    subject.htmlObject = {};
    subject.htmlObject = document.createElement('li');
    subject.htmlObject.setAttribute('class', 'subject');
    subjectList.appendChild(subject.htmlObject);
});

// Start simulation (1s tick)
setInterval(function(){
    simulationStep();
}, simulationStepTime);

// Tick function
function simulationStep()
{
    subjects.forEach(subject => {
        subject.update();
        subject.htmlObject.innerText = subject.label + ': ' + subject.value;
    });
}

// Utility Methods
function getSub(name) {
    return subjects.find(subject => subject.label == name);
}

function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}


// Subject Methods
function timeUpdate() {
    getSub("Time").value += 1;
}

function needsUpdate() {
    getSub("Needs").value += 0.1 - (0.2 * getSub("Needs").focus);
    getSub("Needs").value = clamp(getSub("Needs").value, 0, 1);
}

function healthUpdate() {
    console.log(getSub("Health"));
    getSub("Health").value +=
        (0.01 * getSub("Health").focus)
        + (0.01 * -(1 - getSub("Needs").value));
        - 0.001
    getSub("Health").value = clamp(getSub("Health").value, 0, 1);
}