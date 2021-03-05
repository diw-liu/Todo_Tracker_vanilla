'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import ChangingTheTask_Transaction from './transactions/ChangingTheTask_Transaction.js'
import ChangingDueDate_Transaction from "./transactions/ChangingDueDate_Transaction.js"
import ChangingTheStatus_Transaction from "./transactions/ChangingTheStatus_Transaction.js"
import MoveAnItemUp_Transaction from "./transactions/MoveAnItemUp_Transaction.js"
import MoveAnItemDown_Transaction from "./transactions/MoveAnItemDown_Transaction.js"
import DeleteAnItem_Transaction from "./transactions/DeleteAnItem_Transaction.js"
/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.push(itemToAdd);
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }

    //Construction site//



    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.tps.addTransaction(transaction);
        if (this.currentList) {
            this.view.viewList(this.currentList);
        }
    }

    changingTheTaskTransaction(targetId,targetContent){
        var oldDesc=this.currentList.items[this.findIndex(targetId)].description;
        let transaction = new ChangingTheTask_Transaction(this,oldDesc,targetContent,targetId);
        this.tps.addTransaction(transaction);
        if (this.currentList) {
            this.view.viewList(this.currentList);
        }
    }
    changingDueDateTransaction(targetId,targetContent){
        var oldDate=this.currentList.items[this.findIndex(targetId)].dueDate;
        let transaction = new ChangingDueDate_Transaction(this,oldDate,targetContent,targetId);
        this.tps.addTransaction(transaction);
        if (this.currentList) {
            this.view.viewList(this.currentList);
        }
    }
    changingTheStatusTransaction(targetId,targetContent){
        var oldStat=this.currentList.items[this.findIndex(targetId)].status;
        let transaction = new ChangingTheStatus_Transaction(this,oldStat,targetContent,targetId);
        this.tps.addTransaction(transaction);
        if (this.currentList) {
            this.view.viewList(this.currentList);
        }
    }
    moveAnItemUpTransaction(targetId){
        let transaction = new MoveAnItemUp_Transaction(this,targetId);
        this.tps.addTransaction(transaction);
        if (this.currentList) {
            this.view.viewList(this.currentList);
        }
    }
    moveAnItemDownTransaction(targetId){
        let transaction = new MoveAnItemDown_Transaction(this,targetId);
        this.tps.addTransaction(transaction);
        if (this.currentList) {
            this.view.viewList(this.currentList);
        }
    }
    deleteAnItemTransaction(targetId){
        let transaction = new DeleteAnItem_Transaction(this,targetId);
        this.tps.addTransaction(transaction);
        if (this.currentList) {
            this.view.viewList(this.currentList);
        }
    }
    
    
    
    
    
    
    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList);
        return newItem;
    }
    
    /** CONSTRUCTION SITE   */


    /** For change description and save */
    taskChange(targetId,targetContent){
        for(var i=0;i<this.currentList.items.length;i++){
            if(this.currentList.items[i].getId()==targetId){
                this.currentList.items[i].setDescription(targetContent);
            }
        }
    }

    dateChange(targetId,value){
        for(var i=0;i<this.currentList.items.length;i++){
            if(this.currentList.items[i].getId()==targetId){
                this.currentList.items[i].setDueDate(value);
            }
        }
    }

    statusChange(targetId,value){
        for(var i=0;i<this.currentList.items.length;i++){
            if(this.currentList.items[i].getId()==targetId){
                this.currentList.items[i].setStatus(value);
            }
        }
    }  

    moveItemUp(targetId){
        var itemIndex=this.findIndex(targetId);
        if(itemIndex>-1){
            var temp=this.currentList.items[itemIndex-1];
            this.currentList.items[itemIndex-1]=this.currentList.items[itemIndex];
            this.currentList.items[itemIndex]=temp;
        }
    }

    moveItemDown(targetId){
        var itemIndex=this.findIndex(targetId);
        if(itemIndex>-1){
            var temp=this.currentList.items[itemIndex+1];
            this.currentList.items[itemIndex+1]=this.currentList.items[itemIndex];
            this.currentList.items[itemIndex]=temp;
        }
    }
    addItemAtIndex(item,index){
        this.currentList.items.splice(index,0,item);
        this.view.viewList(this.currentList);
    }

    closeList(){
        this.tps.clearAllTransactions();
        this.currentList=null;
        this.view.viewList();
    }

    findIndex(targetId){
        var itemIndex=-1;
        for(var i=0;i<this.currentList.items.length;i++){
            if(this.currentList.items[i].getId()==targetId){
                itemIndex=i;
            }
        }
        return itemIndex;
    }






    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }
    /** reset stack!!!!!!!!!!! current list here */
    /**
     * Load the items for the listId list into the UI.
     */
    loadList(listId) {
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.currentList = listToLoad;
        }
        for(let i=listIndex;i>0;i--){
            this.toDoLists[i]=this.toDoLists[i-1];
        }
        this.tps.clearAllTransactions();
        this.toDoLists[0]=this.currentList;
        this.view.refreshLists(this.toDoLists);
        this.view.viewList(this.currentList);
    }

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
        }
        if (this.currentList) {
            this.view.viewList(this.currentList);
        }
    }   

    /**
     * Remove the itemToRemove from the current list and refresh.
     */
    removeItem(itemToRemove) {
        this.currentList.removeItem(itemToRemove);
        this.nextListItemId--;    /** prevent scenario where new item can't be found */
        this.view.viewList(this.currentList);
    }

    dropBox(){
        this.view.displayDropBox();
    }
    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        let indexOfList = -1;
        for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
            if (this.toDoLists[i].id === this.currentList.id) {
                indexOfList = i;
            }
        }
        this.toDoLists.splice(indexOfList, 1); //remove the list from the todolist
        this.currentList = null;
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
    
    }

    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
        }
        if (this.currentList) {
            this.view.viewList(this.currentList);
        }
    } 
}