const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new-btn');

window.onload = () => {
    const savedTasks = getCookie('todo_list');
    if (savedTasks) {
        const tasks = JSON.parse(decodeURIComponent(savedTasks));
        tasks.forEach(task => addTaskToDOM(unescapeSemicolons(task)));
    }
};

newBtn.addEventListener('click', () => {
    let task = prompt('Enter a new task:');
    if (task) {
        task = task.trim();
        console.log(`Task entered: "${task}"`);

        if (task !== '') {
            addTaskToDOM(task);
            saveTasksToCookies();
        }
    }
});

function addTaskToDOM(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'todo-item';
    taskDiv.textContent = task;

    taskDiv.addEventListener('click', () => {
        const confirmDelete = confirm('Do you want to delete this task?');
        if (confirmDelete) {
            taskDiv.remove();
            saveTasksToCookies();
        }
    });

    ftList.prepend(taskDiv);
}

function saveTasksToCookies() {
    const tasks = Array.from(ftList.children).map(taskDiv => escapeSemicolons(taskDiv.textContent));
    const encodedTasks = encodeURIComponent(JSON.stringify(tasks)); // Encode before saving
    document.cookie = `todo_list=${encodedTasks};path=/;expires=${getCookieExpiry()}`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return value;
    }
    return null;
}

function getCookieExpiry() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toUTCString();
}

function escapeSemicolons(task) {
    return task.replace(/;/g, '%3B');
}

function unescapeSemicolons(task) {
    return task.replace(/%3B/g, ';');
}