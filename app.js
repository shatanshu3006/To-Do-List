// Get references to HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Add event listener to the button
addTaskButton.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
    const taskText = taskInput.value;
   
    if (taskText.trim() !== '') {
        const taskItem = document.createElement('li');
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;

        // Create the task details elements
        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';

         // Create the label input element
         const labelInput = document.createElement('input');
         labelInput.type = 'text';
         labelInput.placeholder = 'Notes for the task';
         labelInput.className = 'label-input'; 

        // Create the start date input element
        const startDateInput = document.createElement('input');
        startDateInput.type = 'date';
        startDateInput.className = 'start-date-input';

        // Create the end date input element
        const endDateInput = document.createElement('input');
        endDateInput.type = 'date';
        endDateInput.className = 'end-date-input';

        // Create the urgency select element
        const urgencySelect = document.createElement('select');
        urgencySelect.className = 'urgency-select';
        const urgencyOptions = ['Low Urgency', 'Medium Urgency', 'High Urgency'];
        for (let i = 0; i < urgencyOptions.length; i++) {
            const option = document.createElement('option');
            option.value = urgencyOptions[i];
            option.textContent = urgencyOptions[i];
            urgencySelect.appendChild(option);
        }

        // Create the action buttons
        const completeButton = document.createElement('button');
        completeButton.className='complete-button'
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', completeTask);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', deleteTask);

        // Append all elements to the task item
        taskItem.appendChild(taskTextSpan);
        taskDetails.appendChild(labelInput);
        taskDetails.appendChild(startDateInput);
        taskDetails.appendChild(endDateInput);
        taskDetails.appendChild(urgencySelect);
        taskItem.appendChild(taskDetails);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
        taskInput.value = '';

        sortTasks(); // Sort the tasks after adding a new task
    }
}
//function to update the progress bar
function updateProgressBar() {
    const totalTasks = taskList.children.length;
    const completedTasks = document.getElementsByClassName('completed').length;
    const progress = (completedTasks / totalTasks) * 100;
    
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%';

    const progressPercentage=document.getElementById('progressPercentage');
    progressPercentage.textContent=progress.toFixed(2)+'%';
  }

// Function to delete a task
function deleteTask() {
    const taskItem = this.parentNode;
    taskList.removeChild(taskItem);
    updateProgressBar();
}

// Function to mark a task as completed
function completeTask() {
    const taskItem = this.parentNode;
    const taskTextSpan = taskItem.querySelector('span');
    taskTextSpan.classList.toggle('completed');
    updateProgressBar();
  }

// Function to sort tasks by end date and urgency
function sortTasks() {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
        const aEndDate = getEndDateValue(a);
        const bEndDate = getEndDateValue(b);
        if (aEndDate === bEndDate) {
            const aUrgency = getUrgencyValue(a);
            const bUrgency = getUrgencyValue(b);
            return bUrgency - aUrgency;
        }
        return aEndDate - bEndDate;
    });
    tasks.forEach(task => taskList.appendChild(task));
}

// Function to get end date value for a task
function getEndDateValue(taskItem) {
    const endDateInput = taskItem.querySelector('.end-date-input');
    return new Date(endDateInput.value);
}

// Function to get urgency value for a task
function getUrgencyValue(taskItem) {
    const urgencySelect = taskItem.querySelector('.urgency-select');
    return urgencySelect.selectedIndex;
}

