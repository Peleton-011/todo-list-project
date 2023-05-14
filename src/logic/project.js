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

	handleAdd(config) {
		if (config.type === "project") {
			this.addProject(config);
			console.log("Project added ", config, " to ", this.id);
			return;
		}
		console.log("Task added ", config, " to ", this.id);
		this.addTask(config);
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
            parent: this
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
		if (content.length < 1) {
			const noContent = document.createElement("p");
			noContent.innerText = "No tasks found.";
			content.push(noContent);
		}
		content.push(this.getButtons());

		const result = document.createElement("p");
		//Inner tasks and such

		content.forEach((elem) => {
			result.appendChild(elem);
		});
		return result;
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

		const content = this.getContent();

		// const oldContent = taskElem.querySelector("p");

		taskElem.appendChild(content);
		// taskElem.removeChild(oldContent);

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
