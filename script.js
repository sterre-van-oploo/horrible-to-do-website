// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const addTodoButton = document.getElementById('add-todo');
    const newTodoInput = document.getElementById('new-todo');
    const todoList = document.getElementById('todo-list');
    const congratsPopup = document.getElementById('congrats-popup');
    const closePopupButton = document.getElementById('close-popup');

    addTodoButton.addEventListener('click', addTask);
    newTodoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    closePopupButton.addEventListener('click', closePopup);

    function addTask() {
        const taskText = newTodoInput.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', handleCheckboxChange);

            const label = document.createElement('label');
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(taskText));

            listItem.appendChild(label);
            todoList.appendChild(listItem);
            newTodoInput.value = '';
        }
    }

    function handleCheckboxChange(event) {
        const listItem = event.target.closest('li');
        if (event.target.checked) {
            listItem.style.opacity = 0; // Start the fade-out effect
            listItem.style.height = 0; // Collapse the height
            listItem.style.margin = 0; // Collapse the margin
            listItem.style.padding = 0; // Collapse the padding
            setTimeout(() => {
                listItem.remove(); // Remove the item after the transition
                checkAllTasksCompleted(); // Check if all tasks are completed
            }, 500); // 500ms matches the CSS transition duration
        }
    }

    function checkAllTasksCompleted() {
        if (todoList.children.length === 0) {
            congratsPopup.classList.add('active'); // Show the pop-up
            closePopupButton.disabled = true; // Disable the close button
            let countdown = 5;
            const countdownInterval = setInterval(() => {
                closePopupButton.textContent = `Wait ${countdown} seconds`;
                countdown--;
                if (countdown < 0) {
                    clearInterval(countdownInterval);
                    closePopupButton.textContent = 'Close'; // Reset the button text
                    closePopupButton.disabled = false; // Enable the close button after countdown
                }
            }, 1000); // Update countdown every second
        }
    }

    function closePopup() {
        congratsPopup.classList.remove('active'); // Hide the pop-up when clicked
    }
    
});
