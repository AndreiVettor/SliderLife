const simulationStepTime = 500;
const subjectList = document.getElementsByClassName('subjectList')[0];

var subjects = [];
var htmlObjects = [];

subjects.push({
    label: "Needs",
    value: 20,
    focus: 0.5,
    compute: function() {
        this.value = 
            -this.focus 
            - 0.1 * getVal("Health") 
            + 0.1 * getVal("Career") 
            + this.feedback() 
            + getVariance();
    },
    feedback: function() {
        return 0.95 * this.value;
    }
});

subjects.push({
    label: "Health",
    value: 80,
    focus: 0.3,
    compute: function() {
        this.value = 
            this.focus 
            + 0.1 * getVal("Needs") 
            + this.feedback() 
            + getVariance();
    },
    feedback: function() {
        return 0.95 * this.value;
    }
});

subjects.push({
    label: "Career",
    value: 80,
    focus: 0.2,
    compute: function() {
        this.value = 
            this.focus 
            + 0.1 * getVal("Health")
            - 0.1 * getVal("Needs")
            + this.feedback() 
            + getVariance();
    },
    feedback: function() {
        return 0.95 * this.value;
    }
});

function getVal(label) {
    return subjects.find(subject => subject.label == label).value;
}

function getVariance() {
    return Math.random();
}

// Procedurally generate each subjects HTML
for(var i = 0; i < subjects.length; ++i)
{
    htmlObjects[i] = document.createElement('div');
    htmlObjects[i].setAttribute('class', 'subject');

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
    slider.setAttribute('min','0');
    slider.setAttribute('max','1');
    slider.setAttribute('step','0.01');
    slider.value = subjects[i].focus;

    htmlObjects[i].appendChild(slider);
    subjectList.appendChild(htmlObjects[i]);
}

// Start simulation (1s tick)
setInterval(function(){
    simulationStep();
}, simulationStepTime);

// Tick function
function simulationStep()
{   
    // Update focus values
    for (let i = 0; i < subjects.length; i++) {
        subjects[i].focus = parseFloat(htmlObjects[i].getElementsByTagName('input')[0].value);
    }

    // Update subject values and draw
    for (let i = 0; i < subjects.length; i++) {
        subjects[i].compute();
        htmlObjects[i].getElementsByClassName('value')[0].innerText = subjects[i].value.toFixed(2);
    }
}