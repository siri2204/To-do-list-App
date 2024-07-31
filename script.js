const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = inputBox.value.trim();
    let span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    const tasks = Array.from(listContainer.children).map(li => ({
        text: li.firstChild.textContent,
        checked: li.classList.contains("checked")
    }));
    localStorage.setItem("data", JSON.stringify(tasks));
}

function showTask() {
    const data = JSON.parse(localStorage.getItem("data") || "[]");
    data.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.checked) li.classList.add("checked");
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

showTask();
