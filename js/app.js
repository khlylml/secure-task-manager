const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const loadSamplesBtn = document.getElementById("loadSamplesBtn");
const taskList = document.getElementById("taskList");
const taskMessage = document.getElementById("taskMessage");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");


let taskNumber = 1;


function createTaskElement(taskText, taskId) {

    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    taskItem.dataset.taskId = taskId;
    taskItem.dataset.state = "pending";


    const textSpan = document.createElement("span");
    textSpan.classList.add("task-text");
    textSpan.textContent = taskText;


    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.textContent = "Complete";
    completeButton.type = "button";


    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit";
    editButton.type = "button";


    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "Remove";
    removeButton.type = "button";


    taskItem.appendChild(textSpan);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(removeButton);


    return taskItem;
}


function addTask(taskText) {

    const cleanText = taskText.trim();

    if (cleanText === "") {

        taskMessage.textContent = "Task cannot be empty";

        return;
    }


    const taskId = "task-" + taskNumber;

    taskNumber++;


    const taskItem =
        createTaskElement(cleanText, taskId);


    taskList.appendChild(taskItem);


    taskInput.value = "";
    taskMessage.textContent = "";

    updateTaskCounts();
}


function toggleTaskComplete(taskItem) {

    taskItem.classList.toggle("completed");


    if (taskItem.classList.contains("completed")) {

        taskItem.dataset.state = "completed";

    } else {

        taskItem.dataset.state = "pending";

    }


    updateTaskCounts();
}


function beginTaskEdit(taskItem) {

    const textSpan =
        taskItem.querySelector(".task-text");

    const editButton =
        taskItem.querySelector(".edit-btn");


    if (!textSpan || !editButton) {
        return;
    }


    const editInput = document.createElement("input");

    editInput.type = "text";
    editInput.classList.add("edit-input");
    editInput.value = textSpan.textContent;


    taskItem.replaceChild(editInput, textSpan);

    editButton.textContent = "Save";

    editInput.focus();
}


function saveTaskEdit(taskItem) {

    const editInput =
        taskItem.querySelector(".edit-input");

    const editButton =
        taskItem.querySelector(".edit-btn");


    if (!editInput || !editButton) {
        return;
    }


    const newText = editInput.value.trim();


    if (newText === "") {

        taskMessage.textContent =
            "Task cannot be empty";

        editInput.focus();

        return;
    }


    const textSpan =
        document.createElement("span");

    textSpan.classList.add("task-text");
    textSpan.textContent = newText;


    taskItem.replaceChild(textSpan, editInput);

    editButton.textContent = "Edit";

    taskMessage.textContent = "";
}


function removeTask(taskItem) {

    taskItem.remove();

    updateTaskCounts();
}


function updateTaskCounts() {

    const taskItems =
        taskList.querySelectorAll(".task-item");


    let pending = 0;
    let completed = 0;


    taskItems.forEach(function (taskItem) {

        if (taskItem.dataset.state === "completed") {

            completed++;

        } else {

            pending++;

        }

    });


    totalCount.textContent = taskItems.length;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}


function handleTaskListClick(event) {

    const clickedButton = event.target;


    if (
        !clickedButton.matches("button")
    ) {
        return;
    }


    const taskItem =
        clickedButton.closest(".task-item");


    if (!taskItem) {
        return;
    }


    if (
        clickedButton.classList.contains("complete-btn")
    ) {

        toggleTaskComplete(taskItem);

        return;
    }


    if (
        clickedButton.classList.contains("edit-btn")
    ) {

        if (clickedButton.textContent === "Edit") {

            beginTaskEdit(taskItem);

        } else {

            saveTaskEdit(taskItem);

        }

        return;
    }


    if (
        clickedButton.classList.contains("remove-btn")
    ) {

        removeTask(taskItem);

    }

}


function loadSampleTasks() {

    const sampleTasks = [
        "Review DOM selectors",
        "Practice createElement",
        "Study event delegation"
    ];


    const fragment =
        document.createDocumentFragment();


    sampleTasks.forEach(function (taskText) {

        const taskId = "task-" + taskNumber;

        taskNumber++;


        const taskItem =
            createTaskElement(taskText, taskId);


        fragment.appendChild(taskItem);

    });


    taskList.appendChild(fragment);

    taskMessage.textContent = "";

    updateTaskCounts();
}


addTaskBtn.addEventListener("click", function () {

    addTask(taskInput.value);

});


loadSamplesBtn.addEventListener("click", function () {

    loadSampleTasks();

});


taskList.addEventListener(
    "click",
    handleTaskListClick
);


taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        addTask(taskInput.value);

    }

});


updateTaskCounts();