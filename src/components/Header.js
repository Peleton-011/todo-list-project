
function Header ({onAddTask, onAddProject}) {
    const header = document.createElement("header");

    const title = document.createElement("h1");
    title.innerText = "To-Do"

    const btns = document.createElement("div");
    const addTask = document.createElement("button");
    addTask.innerText = "Add Task";
    addTask.addEventListener("click", onAddTask);
    const addProject =  document.createElement("button");
    addProject.innerText = "Add Project";
    addProject.addEventListener("click", onAddProject);

    btns.appendChild(addTask);
    btns.appendChild(addProject);

    header.appendChild(title);
    header.appendChild(btns);

    return header

}


export default Header;