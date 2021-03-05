import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class ChangingTheTask_Transaction extends jsTPS_Transaction {
    constructor(initModel,oldText,newText,id) {
        super();
        this.model = initModel;
        this.oldText = oldText;
        this.newText = newText;
        this.id = id;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.taskChange(this.id,this.newText);
    }

    undoTransaction() {
        this.model.taskChange(this.id,this.oldText);
    }
}