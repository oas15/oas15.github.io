//Array to hold tasks
let taskList = [];

//Count of tasks created (used for task ids)
let idCount = 0;

//DOM References
let e_name = document.getElementById("taskName");
let e_priority = document.getElementById("priority");
let e_importance = document.getElementById("importance");

let taskForm = document.getElementById("taskForm");
let taskDisplay = document.getElementById("taskmanager");

//Task Object
function Task(name,priority,isImportant) {
    this.id = ++idCount;
    this.name = name;
    this.priority = priority;
    this.isImportant = isImportant;
    this.isCompleted = false;
    this.date = new Date().toLocaleString();
}

//Displays current tasks in the "taskmanager" div
function showTasks() {
    //Reset innerHTML
    taskDisplay.innerHTML = ''; 
    
    //Make a div for every task and add that div to the "taskmanager" div
    taskList.forEach(function(task) {
        //Create div and assign styling classes
        let taskBlock = document.createElement('div');
        taskBlock.className = `task ${task.priority.toLowerCase()} ${task.isImportant ? 'important' : ''} ${task.isCompleted ? 'completed' : ''}`;

        //Add various parts of the task to the innerHTML of the div
        taskBlock.innerHTML += "<input type = 'checkbox' " + (task.isCompleted ? 'checked' : '') + " onchange = 'toggleComplete(" + task.id + ")'>";
        taskBlock.innerHTML += "<span>" + task.name + "</span>";
        taskBlock.innerHTML += "<span>Priority: " + task.priority + "</span>";
        taskBlock.innerHTML += "<span>Added: " + task.date + "</span>"
        taskBlock.innerHTML += '<button onclick="deleteTask(' + task.id + ')">Delete</button>'
        
        //Add the task div into the "taskmanager" div
        taskDisplay.appendChild(taskBlock);
    })
}

//Add a task, check for blanks, and add it to the taskList
function addTask(event){
    //Prevent form defauly behavior
    event.preventDefault()
    
    //Check for blanks
    if (!e_name.value.trim()) {
        alert('Task name cannot be empty');
        return;
    }

    //Instance a new Task
    let task = new Task(e_name.value, e_priority.value, e_importance.checked)

    //Add the task to the taskList, log to console, reset form, and render the tasks
    taskList.push(task);
    console.log(JSON.stringify(taskList));
    taskForm.reset();
    showTasks();
}

//Delete a task from the taskList, log all tasks to console, and render the taskList again
function deleteTask(taskID){
    taskList = taskList.filter(function(task) {return Number(task.id) !== Number(taskID)});
    console.log(JSON.stringify(taskList));
    showTasks();
}

//Toggle the completion status of a task, log all tasks to console, and render tasks
function toggleComplete(taskID){
    taskList = taskList.map(function(task) {
        if (task.id == taskID) {
            task.isCompleted = !task.isCompleted;
        }
        return task;
    })
    console.log(JSON.stringify(taskList));
    showTasks();
}

//Run the addTask function when user clicks the "Add Task" button
taskForm.addEventListener("submit", addTask)
