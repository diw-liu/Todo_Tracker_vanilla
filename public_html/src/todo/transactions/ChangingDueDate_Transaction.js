// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangingDueDate_Transaction extends jsTPS_Transaction {
    constructor(initModel,oldDate,newDate,id) {
        super();
        this.model = initModel;
        this.oldDate = oldDate;
        this.newDate = newDate;
        this.id = id;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.dateChange(this.id,this.newDate);
    }

    undoTransaction() {
        this.model.dateChange(this.id,this.oldDate);
    }
}