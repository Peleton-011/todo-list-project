function Header({ onAddTask, onAddProject }) {
	const header = document.createElement("header");

	const title = document.createElement("h1");
	title.innerText = "To-Do";

	const btns = document.createElement("div");

	const addTask = btn({ onclick: (e) => onAddTask(e), text: "Add Task" });

	const addProject = btn({ onclick: (e) => onAddProject(e), text: "Add Project" });

	btns.setAttribute(
		"style",
		`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: end;

    `
	);

	btns.appendChild(addTask);
	btns.appendChild(addProject);

	header.setAttribute(
		"style",
		`
    display: grid;
    grid-template-columns: 1fr 1fr;
    `
	);

	header.appendChild(title);
	header.appendChild(btns);

	return header;
}

function btn({ onclick, text }) {
	const btn = document.createElement("button");
	btn.innerText = text;
	btn.addEventListener("click", onclick);
	btn.setAttribute("role", "button");
	btn.setAttribute(
		"style",
		`width: fit-content;
    height: fit-content;`
	);
	return btn;
}

export default Header;
