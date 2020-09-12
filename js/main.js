// GLOBAL VARS
var simulationStepTime = 500; // in ms
var errorProportional = 0.05; // Proportional factor for error calculation
var weightProportional = 0.01; // Proportional factor for weighted inputs calculation
var highestValue = 0;
var intervalHandle;

const randomnessFactor = 0.1; // Normal distribution range multiplier, from ~(-3, 3)
const subjectList = document.getElementsByClassName('subjectList')[0];
const stepTimeSlider = document.getElementsByClassName('timeStepSlider')[0];
const stepTimeLabel = document.getElementsByClassName('timeStepLabel')[0];

stepTimeSlider.value = simulationStepTime;
stepTimeLabel.innerText = stepTimeSlider.value;
stepTimeSlider.addEventListener('change', event => {
    setTimeStep(event.target.value);
});

var subjects = [];
var htmlObjects = [];

// Interactivity between subjects:
// Weight of S0 -> S0, S1 -> S0, S2 -> S0 and S3 -> S0
// In this case S0 is Needs
var weights = [
    [  0, -1,  1,  1],
    [ -2,  0, -1,  1],
    [ -1,  1,  0, -1],
    [ -2,  1, -1,  0]
]; 

subjects.push({
    label: "Needs",
    value: 20,
    reference: 0,
    focused: false
});

subjects.push({
    label: "Health",
    value: 40,
    reference: 0,
    focused: false
});

subjects.push({
    label: "Career",
    value: 30,
    reference: 0,
    focused: false
});

subjects.push({
    label: "Family",
    value: 20,
    reference: 0,
    focused: false
});




// FUNCTIONS

function randomPerturbation() {
    return randomBoxMuller() * randomnessFactor;
}

// Standard Normal variate using Box-Muller transform.
function randomBoxMuller() {
    var u = 0, v = 0;
    u = 1- Math.random(); //Converting [0,1) to (0,1)
    v = 1- Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}


function computeFeedback(subject) {
    // Bypass reference if subject not focused on
    if(subject.focused == false) {
        subject.reference = subject.value;
    }
    var error = subject.reference - subject.value;
    subject.value += 
        errorProportional * error
        + randomPerturbation();
}

function computeModel(subject, index) {
    for(var i = 0; i < subjects.length; ++i) {
        subject.value += weights[index][i] * subjects[i].value * weightProportional;
    }
}

function setTimeStep(duration) {
    clearInterval(intervalHandle);
    
    simulationStepTime = duration;
    stepTimeLabel.innerText = simulationStepTime;
    intervalHandle = setInterval(function(){
        simulationStep();
    }, simulationStepTime);
}

function simulationStep()
{   
    sum = 0;
    // Update UI to/from Model values
    for (let i = 0; i < subjects.length; i++) {
        subjects[i].reference = parseFloat(htmlObjects[i].getElementsByTagName('input')[0].value);
        subjects[i].focused = htmlObjects[i].classList.contains('focused');
        htmlObjects[i].getElementsByClassName('value')[0].innerText = subjects[i].value.toFixed(2);
        sum += subjects[i].value;
    }

    document.getElementById('currentValue').innerText = sum.toFixed(0);
    if(sum > highestValue)
    {
        highestValue = sum;
        document.getElementById('highestValue').innerText = highestValue.toFixed(0);
    }

    // Update subjects
    for (let i = 0; i < subjects.length; i++) {
        computeFeedback(subjects[i]);
        computeModel(subjects[i], i);
    }
}




// INITIALIZE

// Procedurally generate each subjects HTML
for(var i = 0; i < subjects.length; ++i)
{
    htmlObjects[i] = document.createElement('div');
    htmlObjects[i].setAttribute('class', 'subject');
    htmlObjects[i].addEventListener('contextmenu', function(event) {
        event.preventDefault();
        
        event.target.classList.toggle('focused');
        event.target.getElementsByClassName('slider')[0].disabled = 
            !event.target.classList.contains('focused')

        return false;
    }, false);

    let labelSpan = document.createElement('span')
    labelSpan.setAttribute('class','label');
    labelSpan.innerText = subjects[i].label;
    htmlObjects[i].appendChild(labelSpan);

    let valueSpan = document.createElement('span');
    valueSpan.setAttribute('class','value')
    valueSpan.innerText = subjects[i].value;
    htmlObjects[i].appendChild(valueSpan);

    let slider = document.createElement('input');
    slider.setAttribute('class','slider');
    slider.setAttribute('type','range');
    slider.setAttribute('disabled','true');
    slider.setAttribute('min','0');
    slider.setAttribute('max','100');
    slider.setAttribute('step','1');
    slider.value = subjects[i].focus;

    htmlObjects[i].appendChild(slider);
    subjectList.appendChild(htmlObjects[i]);
}

setTimeStep(simulationStepTime);