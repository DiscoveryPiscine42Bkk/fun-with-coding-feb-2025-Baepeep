$(document).ready(function () {
    const ftList = $("#ft_list");
    const newBtn = $("#new-btn");

    function loadTasks() {
        const savedTasks = getCookie("todo_list");
        if (savedTasks) {
            const tasks = JSON.parse(decodeURIComponent(savedTasks));
            $.each(tasks, function (_, task) {
                addTaskToDOM(unescapeSemicolons(task));
            });
        }
    }

    newBtn.click(function () {
        let task = prompt("Enter a new task:");
        if (task) {
            task = $.trim(task);

            if (task !== "") {
                addTaskToDOM(task);
                saveTasksToCookies();
            }
        }
    });

    function addTaskToDOM(task) {
        const taskDiv = $("<div>").addClass("todo-item").text(task);

        taskDiv.click(function () {
            const confirmDelete = confirm("Do you want to delete this task?");
            if (confirmDelete) {
                $(this).remove();
                saveTasksToCookies();
            }
        });

        ftList.prepend(taskDiv);
    }

    function saveTasksToCookies() {
        const tasks = ftList.children().map(function () {
            return escapeSemicolons($(this).text());
        }).get();
        const encodedTasks = encodeURIComponent(JSON.stringify(tasks)); // Encode before saving
        document.cookie = `todo_list=${encodedTasks};path=/;expires=${getCookieExpiry()}`;
    }

    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [key, value] = cookie.split("=");
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
        return task.replace(/;/g, "%3B");
    }

    function unescapeSemicolons(task) {
        return task.replace(/%3B/g, ";");
    }
    loadTasks();
});
