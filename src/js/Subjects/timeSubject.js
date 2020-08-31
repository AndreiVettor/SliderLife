import Subject from "./Subject.js";

export default class TimeSubject extends Subject{
    constructor(subjectList, value)
    {
        super(subjectList, value);
        this.label = "Time";
    }

    update()
    {
        this.value += 1;
        
        super.update();
    }
}