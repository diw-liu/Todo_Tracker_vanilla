// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangingTheStatus_Transaction extends jsTPS_Transaction {
    constructor(initModel,oldStat,newStat,id) {
        super();
        this.model = initModel;
        this.oldStat = oldStat;
        this.newStat = newStat;
        this.id = id;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.statusChange(this.id,this.newStat);
    }

    undoTransaction() {
        this.model.statusChange(this.id,this.oldStat);
    }
}