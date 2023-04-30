import Task from "./task";

import initializeForm from "../components/Form";

class Project extends Task {
	type = "project";

	constructor(params) {
		super(params);

		this.taskList = [];
		this.addTask = this.addTask.bind(this);
		this.addProject = this.addProject;
	}

	removeTask(id) {
		this.taskList.filter((currTask) => currTask.id !== id);
		document.getElementById(id).remove();
	}

	addTask({ taskTitle, description, dueDate, dueTime, priorityLevel }) {
		const taskInterface = {
			title: taskTitle,
			description: description,
			priority: priorityLevel,
			dueDate: [dueDate, dueTime],
			removeTask: this.removeTask.bind(this),
		};
		const newTask = new Task(taskInterface);
		this.taskList.push(newTask);
	}

	addProject({ projectTitle, description, dueDate, dueTime, priorityLevel }) {
		const projectInterface = {
			title: projectTitle,
			description: description,
			priority: priorityLevel,
			dueDate: [dueDate, dueTime],
		};
		const newProject = new Project(projectInterface);
		this.taskList.push(newProject);
	}

	getContent() {
		const content = this.taskList.map((task) => task.getElem());
		return content;
	}

	getButtons() {
		const btns = document.createElement("div");

		const onAddTask = (e) => {
			const [taskForm, toggleTaskForm] = initializeForm({
				type: "task",
				addFunction: (args) => {
					this.addTask();
					document.getElementById("temp-form").remove();
				},
				titlePlaceholder: "Get eggs for an omelette",
				descriptionPlaceholder:
					"Ask Danny if he has some, or go to the store to get them.",
				id: "temp-form",
			});
			document.querySelector("main").appendChild(taskForm);
			toggleTaskForm(e);
		};

		const onAddProject = (e) => {
			const [projectForm, toggleProjectForm] = initializeForm({
				type: "project",
				addFunction: (args) => {
					this.addProject();
					document.getElementById("temp-form").remove();
				},
				titlePlaceholder: "Learn how to cook",
				descriptionPlaceholder:
					"Start by learning at least 5 different recipes to mix and match",
				id: "temp-form",
			});
			document.querySelector("main").appendChild(projectForm);
			toggleProjectForm(e);
		};

		const addTask = btn({ onclick: onAddTask, text: "Add Task" });

		const addProject = btn({ onclick: onAddProject, text: "Add Project" });

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

		return btns;
	}

	getElem() {
		const taskElem = super.getElem();


		const content = taskElem.querySelector("p");

		//Inner tasks and such

		console.log(this.getContent());
		this.getContent().reduce((acc, curr) => {
			acc.appendChild(curr);
		}, content);

		const btns = this.getButtons();

		content.appendChild(btns);

		// const btn = document.createElement("button");
		// btn.innerText = "Add Task";
		// btn.addEventListener("click", onClick);
		// btn.setAttribute("role", "button");
		// btn.setAttribute(
		//     "style",
		//     `width: fit-content;
		// height: fit-content;`
		// );

		taskElem.appendChild(content);

		return taskElem;
	}
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

export default Project;
