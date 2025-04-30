
function addTasks(){
    let inputtask = document.getElementById("inputtask");
    let taskvalue = inputtask.value;
    if(taskvalue === "") {
        alert ("Please enter your task!")
        return
    }
    let li = document.createElement("li");
    li.innerHTML = `${taskvalue} <button onclick="removeTask(this)" id="removebtn">Cancel</button>`;
    
    document.getElementById("tasklist").appendChild(li);
    inputtask.value = "";
}
function removeTask(elmenet){
    elmenet.parentElement.remove();
}
