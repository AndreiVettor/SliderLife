import Subject from "./Subject.js";

export default class HealthSubject extends Subject{
    constructor(subjectList, value)
    {
        super(subjectList, value);
        this.label = "Health";
    }

    update(needs)
    {
        this.value += 
        -0.001 
        + (0.01 * parseFloat(this.htmlObject.getAttribute('focus'))) 
        + (0.01 * -needs);
        
        super.update();
    }
}