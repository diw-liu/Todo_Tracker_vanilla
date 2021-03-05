'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function(e) {
            if(!(e.target.style.color=="black")){
                appModel.addNewList();
            }
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onmousedown = function(e) {
            if(!(e.target.style.color=="black")){
                appModel.dropBox();
            }
        }
        document.getElementById("add-item-button").onmousedown = function(e) {
            if(!(e.target.style.color=="black")){
                appModel.addNewItemTransaction();
            }
        }  
        document.getElementById("close-list-button").onmousedown = function (e) {
            if(!(e.target.style.color=="black")){
                appModel.closeList();
            }
        }
    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }
    
    handleRemoveCurrentList(){
        this.model.removeCurrentList();
    }

    handleTaskChange(id,content){
        this.model.changingTheTaskTransaction(id,content);
    }

    handleDateChange(id,value){
        this.model.changingDueDateTransaction(id,value);
    }

    handleStatusChange(id,value){
        this.model.changingTheStatusTransaction(id,value);
    }

    handleMoveUp(id){
        this.model.moveAnItemUpTransaction(id);
    }
    
    handleMoveDown(id){
        this.model.moveAnItemDownTransaction(id);
    }

    handleDeleteAnItem(id){
        this.model.deleteAnItemTransaction(id);
    }

}