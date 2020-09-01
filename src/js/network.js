var labels = [
    "Needs",
    "Financial",
    "Satisfaction"
]

var weights = [
    [   0, -0.2, -0.2],
    [-0.3,    0, +0.3],
    [   0, +0.2,    0]
];

var focus = [
    0,
    10,
    0
];

var htmlObjects = [];
const subjectList = document.getElementsByClassName('subjectList')[0];

const simulationStepTime = 200;
const act_threshold = 0.5;
const weight_change_rate = 1.10;
const weight_decay_rate = 0.05;

// Zero filled matrices
var activations = Array(focus.length).fill(0);
var newActivations = Array(focus.length).fill(0);

for(var i = 0; i < focus.length; ++i)
{
    htmlObjects[i] = {};
    htmlObjects[i] = document.createElement('div');
    htmlObjects[i].setAttribute('class', 'subject');
    subjectList.appendChild(htmlObjects[i]);
}

// Start simulation (1s tick)
setInterval(function(){
    simulationStep();
}, simulationStepTime);

// Tick function
function simulationStep()
{
    // Update activations
    for(var i = 0; i < focus.length; ++i) {
        // Level starts from focus/bias
        var level = focus[i];

        // Add the weighted previous activations
        for(var j = 0; j < focus.length; ++j) {
            level += weights[j][i] * activations[j];
        }

        // Determine activation
        if(level > act_threshold) {
            newActivations[i] = 1;
        }
        else {
            newActivations[i] = 0;
        }
    }
    // Transfer new activation values for next step
    activations = [...newActivations];

    // Update weights
    for(var i = 0; i < focus.length; ++i) {
        for(var j = 0; j < focus.length; ++j) {
            if(newActivations[i] == 1) {
                weights[i][j] *= weight_change_rate;
            }
            weights[i][j] *= (1 - weight_decay_rate);
        }
    }

    // Update visuals
    for(var i = 0; i < focus.length; ++i)
    {
        htmlObjects[i].innerText = labels[i];
        for(var j = 0; j < focus.length; ++j)
        {
            htmlObjects[i].innerText += " " + weights[i][j].toFixed(3);
        }
    }
}