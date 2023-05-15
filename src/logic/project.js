import Task from "./task";

import initializeForm from "../components/Form";

class Project extends Task {
	type = "project";

	constructor(params) {
		super(params);

		this.getAddFunction = params.getAddFunction;
		this.taskOnSubmit = params.getAddFunction("task", this);
		this.projectOnSubmit = params.getAddFunction("project", this);

		this.toggleTaskForm = params.toggleTaskForm;
		this.toggleProjectForm = params.toggleProjectForm;

		this.onAddTask = (e) => params.toggleTaskForm(e, this.taskOnSubmit);
		this.onAddProject = (e) =>
			params.toggleProjectForm(e, this.projectOnSubmit);
		this.taskList = [];
		this.addTask = this.addTask.bind(this);
		this.addProject = this.addProject;
	}

	handleAdd(config) {
		if (config.type === "project") {
			config.getAddFunction =
				config.getAddFunction || this.getAddFunction;
			config.toggleTaskForm =
				config.toggleTaskForm || this.toggleTaskForm;
			config.toggleProjectForm =
				config.toggleProjectForm || this.toggleProjectForm;
			this.addProject(config);
			console.log("Project added ", config, " to ", this.id);
			return;
		}
		console.log("Task added ", config, " to ", this.id);
		config = this.reformat(config);
		this.addTask(config);
	}

	reformat(config) {
		console.log(config);
		const newConfig = { taskTitle: config.tasklistTitle, ...config };

		console.log(newConfig);

		return newConfig;
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
			parent: this,
		};
		const newTask = new Task(taskInterface);
		this.taskList.push(newTask);
	}

	addProject({
		projectTitle,
		description,
		dueDate,
		dueTime,
		priorityLevel,
		getAddFunction,
		toggleProjectForm,
		toggleTaskForm,
	}) {
		const projectInterface = {
			title: projectTitle,
			description: description,
			priority: priorityLevel,
			dueDate: [dueDate, dueTime],
			getAddFunction,
			toggleProjectForm,
			toggleTaskForm,
		};
		const newProject = new Project(projectInterface);
		this.taskList.push(newProject);
	}

	getContent() {
		const content = this.taskList.map((task) => task.getElem());
		const noContent = document.createElement("p");
		noContent.innerText = "No tasks found.";
		noContent.classList.add("no-content");
		content.push(noContent);

		content.push(this.getButtons());

		const result = document.createElement("p");

		result.id = "tasklist-" + this.id;
		//Inner tasks and such

		content.forEach((elem) => {
			result.appendChild(elem);
		});
		return result;
	}

	getButtons() {
		const btns = document.createElement("div");

		const addTask = btn({ onclick: this.onAddTask, text: "Add Task" });

		const addProject = btn({
			onclick: this.onAddProject,
			text: "Add Project",
		});

		btns.setAttribute(
			"style",
			`
            display: flex;
            justify-content: flex-end;
    
        `
		);

		btns.appendChild(addTask);
		btns.appendChild(addProject);

		return btns;
	}

	addTaskElem(input) {
		if (typeof input === "number") {
			if (input < 0) {
				input += this.taskList.length;
			}
			console.log(input);

			console.log(this.taskList);
			input = this.taskList[input];
			console.log(input);
		}
		const target = this.getDomObject();
		if (!target) {
			console.error("Element " + this.id + " is not in the DOM");
			return;
		}

		const hasChildren = target.querySelector("details");

        console.log(hasChildren);



		if (hasChildren) {
			target.insertBefore(input.getElem(), target.lastChild);
			return;
		}

        const noContent = target.querySelector(".no-content");

        console.log(noContent);

        target.insertBefore(input.getElem(), noContent);
	}

	getDomObject() {
		return document.getElementById("tasklist-" + this.id);
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
