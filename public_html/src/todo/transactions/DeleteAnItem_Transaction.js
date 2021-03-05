// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteAnItem_Transaction extends jsTPS_Transaction {
    constructor(initModel,id) {
        super();
        this.model = initModel;
        this.index = this.model.findIndex(id);
        this.item = this.model.currentList.getItemAtIndex(this.index);
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.removeItem(this.item);
    }

    undoTransaction() {
        this.model.addItemAtIndex(this.item,this.index);
    }
}