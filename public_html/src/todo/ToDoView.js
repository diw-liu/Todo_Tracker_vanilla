'use strict'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();

        if(list!=null){
            for (let i = 0; i < list.items.length; i++) {
                // NOW BUILD ALL THE LIST ITEMS
                let listItem = list.items[i];

                let status = (listItem.status=="incomplete") ? "<div class='status-col yellow'>"+listItem.status+"</div>"
                                                               : "<div class='status-col blue'>"+listItem.status+"</div>"
                let listItemElement = "<div id='" + listItem.id + "' class='list-item-card'>"
                                        + "<div class='task-col'>" + listItem.description + "</div>"
                                        + "<div class='due-date-col'>"+listItem.dueDate+"</div>"
                                        + status
                                        + "<div class='list-controls-col'>"
                                        + " <div class='list-item-control material-icons'>keyboard_arrow_up</div>"
                                        + " <div class='list-item-control material-icons'>keyboard_arrow_down</div>"
                                        + " <div class='list-item-control material-icons'>close</div>"
                                        + " <div class='list-item-control'></div>"
                                        + " <div class='list-item-control'></div>"
                                    + "</div>";
                itemsListDiv.innerHTML += listItemElement;
                   
            }
            let listitems = document.getElementsByClassName("list-item-card");
            let thisController = this.controller;
            for (var i = 1; i < listitems.length; i++) {
                var des = listitems[i].getElementsByClassName('task-col')[0];
                des.onclick = function(e){
                    var div=document.createElement("Input");
                    div.className="task-col";
                    div.setAttribute("type", "text");
                    div.value=e.target.innerHTML;

                    div.onblur=function(e){
                        thisController.handleTaskChange(e.target.parentNode.id,e.target.value);
                    }

                    e.target.replaceWith(div);
                }

                var dat = listitems[i].getElementsByClassName('due-date-col')[0];
                dat.onclick = function(e){
                    var div=document.createElement("Input");
                    div.className="due-date-col";
                    div.setAttribute("type", "date");
                    div.value=e.target.innerHTML;
                    
                    div.onblur=function (e) {
                        thisController.handleDateChange(e.target.parentNode.id,e.target.value);
                    }

                    e.target.replaceWith(div);
                }

                var stat = listitems[i].getElementsByClassName('status-col')[0];
                stat.onclick = function(e){
                    var div=document.createElement("select");
                    div.className="status-col";
                    let status = (e.target.innerHTML=="incomplete") ? "<option value='incomplete' selected>incomplete</option>"
                                                                +"<option value='complete'>complete</option>" :
                                                                "<option value='incomplete'>incomplete</option>"
                                                                +"<option value='complete' selected>complete</option>";
                    div.innerHTML+=status;
                    
                    div.onblur=function (e) {
                        thisController.handleStatusChange(e.target.parentNode.id,e.target.value);
                    }
                    
                    e.target.replaceWith(div);
                   
                }

                if(i>1){
                    var up = listitems[i].getElementsByClassName('list-item-control')[0];
                    up.onclick = function(e){
                        thisController.handleMoveUp(e.target.parentNode.parentNode.id);
                    }
                }

                if(i<listitems.length-1){
                    var down = listitems[i].getElementsByClassName('list-item-control')[1];
                    down.onclick = function(e){
                        thisController.handleMoveDown(e.target.parentNode.parentNode.id);
                    }
                }

                var del = listitems[i].getElementsByClassName('list-item-control')[2];
                del.onclick = function(e){
                    thisController.handleDeleteAnItem(e.target.parentNode.parentNode.id);
                }
            }
            this.greyOutAdded();
            document.getElementById("todo-lists-list").firstChild.style.color="yellow";
        }else{
            this.returnColorAdded();
            document.getElementById("todo-lists-list").firstChild.style.color="rgb(233,237,240)";;
        }
        this.undoRedo();
    }

    displayDropBox(){
        var content=document.getElementById("dialog");
        content.style.display="block";

        var span=document.getElementById("dialog-content").getElementsByClassName("close")[0];
        span.onclick=function(){
            content.style.display="none";
        }

        let thisController = this.controller;

        var yes=document.getElementById("Yes");
        yes.onclick=function(){
            thisController.handleRemoveCurrentList();
            content.style.display="none";
        }

        var no=document.getElementById("No");
        no.onclick=function() {
            content.style.display="none";
        }
    }
    greyOutAdded(){
        document.getElementById("add-list-button").style.color="black";
        document.getElementById("add-item-button").style.color="grey";
        document.getElementById("delete-list-button").style.color="grey";
        document.getElementById("close-list-button").style.color="grey";

    }
    returnColorAdded(){
        document.getElementById("add-list-button").style.color="grey";
        document.getElementById("add-item-button").style.color="black";
        document.getElementById("delete-list-button").style.color="black";
        document.getElementById("close-list-button").style.color="black";
        
    }
    undoRedo(){
        let redo=document.getElementById("redo-button");
        let undo=document.getElementById("undo-button");
        if(this.controller.model.tps.hasTransactionToRedo()){ 
            redo.style.color="grey";
        }else{  
            redo.style.color="black";
        }

        if(this.controller.model.tps.hasTransactionToUndo()){
            undo.style.color="grey";
        }else{
            undo.style.color="black";
        }
    }
    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }
}