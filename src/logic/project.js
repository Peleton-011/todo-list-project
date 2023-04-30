import Task from "./task";

import initializeForm from "../components/Form";

class Project extends Task {
	type = "project";

	constructor(params) {
		super(params);

		this.taskList = [];
		this.addTask = this.addTask.bind(this);
		this.addProject = this.addProject.bind(this);
	}

	addTask({ taskTitle, description, dueDate, dueTime, priorityLevel }) {
		const taskInterface = {
			title: taskTitle,
			description: description,
			priority: priorityLevel,
			dueDate: [dueDate, dueTime],
		};
		const newTask = new Task(taskInterface);
		this.taskList.push(newTask);
		const taskListElem = document.getElementById("taskList");

		taskListElem.appendChild(newTask.getElem());
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
		const taskListElem = document.getElementById("taskList");

		taskListElem.appendChild(
			newProject.getElem()
		);
	}

	getElem() {
		const taskElem = super.getElem();

		const content = taskElem.querySelector("details > p");

		//Inner tasks and such

		this.taskList
			.map((task) => task.getElem())
			.reduce((acc, task) => {
				acc.appendChild(task);
				return acc;
			}, content);

		//Buttons

		const btns = document.createElement("div");

		const onAddTask = (e) => {
			const [taskForm, toggleTaskForm] = initializeForm({
				type: "task",
				addFunction: this.addTask,
				titlePlaceholder: "Get eggs for an omelette",
				descriptionPlaceholder:
					"Ask Danny if he has some, or go to the store to get them.",
			});
			document.querySelector("main").appendChild(taskForm);
			toggleTaskForm(e);
		};

		const onAddProject = (e) => {
			const [projectForm, toggleProjectForm] = initializeForm({
				type: "project",
				addFunction: this.addProject,
				titlePlaceholder: "Learn how to cook",
				descriptionPlaceholder:
					"Start by learning at least 5 different recipes to mix and match",
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
