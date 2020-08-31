import Subject from "./Subject.js";

export default class NeedsSubject extends Subject{
    constructor(subjectList, value)
    {
        super(subjectList, value);
        this.label = "Needs";
    }

    update()
    {
        
        
        super.update();
    }
}