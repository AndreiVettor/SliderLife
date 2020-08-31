export default class Subject 
{
    constructor(subjectList, value)
    {
        this.value = value;
        this.label = 'Subject';

        this.htmlObject = document.createElement("li");
        this.htmlObject.setAttribute('class', 'subject');
        this.htmlObject.setAttribute('focus', '0');
        this.htmlObject.innerText = this.label;
        subjectList.appendChild(this.htmlObject);
    }

    update() 
    {
        this.clamp(this.value, 0, 1);
        this.htmlObject.innerText = this.label + ': ' + this.value;
    }

    clamp(val, min, max) {
        return val > max ? max : val < min ? min : val;
    }
}

