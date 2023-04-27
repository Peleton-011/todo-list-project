import "@picocss/pico";

import initializeForm from "./components/Form";
import Task from "./logic/task";
import Project from "./logic/project";

import Header from "./components/Header";

const taskList = [];

function removeTask(id) {
	taskList.filter((currTask) => currTask.id !== id);
	document.getElementById(id).remove();
}

function addTask({ taskTitle, description, dueDate, dueTime, priorityLevel }) {
	const taskInterface = {
		title: taskTitle,
		description: description,
		priority: priorityLevel,
		dueDate: [dueDate, dueTime],
	};
	const newTask = new Task(taskInterface);
	taskList.push(newTask);
	const taskListElem = document.getElementById("taskList");

	taskListElem.appendChild(getTaskElem(newTask.getConfig()));
}
function addProject({
	projectTitle,
	description,
	dueDate,
	dueTime,
	priorityLevel,
}) {
	const projectInterface = {
		title: projectTitle,
		description: description,
		priority: priorityLevel,
		dueDate: [dueDate, dueTime],
	};
	const newProject = new Project(projectInterface);
	taskList.push(newProject);
	const taskListElem = document.getElementById("taskList");

	taskListElem.appendChild(getProjectElem(newProject.getConfig()));
}

function tasksDisplayElem() {
	const taskListElem = document.createElement("section");
	taskListElem.id = "taskList";
	taskListElem.classList.add("container");

	return taskListElem;
}

function getRemoveBtn(id) {
	const removeBtn = document.createElement("button");
	document.createElement("button");
	removeBtn.innerText = "x";
	removeBtn.setAttribute(
		"style",
		`
    width: 1.5rem;
    height: 1.5rem;
    display: inline-block;
    text-align: center;
    margin: 0;
    padding: 0;`
	);
	removeBtn.onclick = (e) => {
		removeTask(id);
	};
	return removeBtn;
}

function getTaskElem({ title, description, id }) {
	const task = document.createElement("details");
	task.id = id;
	const summary = document.createElement("summary");
	const summaryHeader = document.createElement("div");

	summary.setAttribute(
		"style",
		`
    display: flex;
    align-items: center;
`
	);

	summaryHeader.setAttribute(
		"style",
		`
        display: flex;
        justify-content: space-between;
        width: 100%;
    `
	);

	const titleElem = document.createElement("h4");
	titleElem.innerText = title;
	titleElem.setAttribute(
		"style",
		`
    margin-bottom: 0`
	);

	const descriptionElem = document.createElement("p");

	descriptionElem.innerText = description;

	const removeBtn = getRemoveBtn(id);

	summaryHeader.appendChild(titleElem);
	summaryHeader.appendChild(removeBtn);

	summary.appendChild(summaryHeader);

	task.appendChild(summary);
	task.appendChild(descriptionElem);
	return task;
}

function getProjectElem(ProjObj) {
	const { title, description, id } = ProjObj;

	const task = document.createElement("details");
	task.id = id;
	const summary = document.createElement("summary");
	const summaryHeader = document.createElement("div");

	summary.setAttribute(
		"style",
		`
    display: flex;
    align-items: center;
`
	);

	summaryHeader.setAttribute(
		"style",
		`
        display: flex;
        justify-content: space-between;
        width: 100%;
    `
	);

	const titleElem = document.createElement("h4");
	titleElem.innerText = title;
	titleElem.setAttribute(
		"style",
		`
    margin-bottom: 0`
	);

	const descriptionElem = document.createElement("p");

	descriptionElem.innerText = description;

	const removeBtn = getRemoveBtn(id);

	summaryHeader.appendChild(titleElem);
	summaryHeader.appendChild(removeBtn);

	summary.appendChild(summaryHeader);

	task.appendChild(summary);
	task.appendChild(descriptionElem);
	return task;
}

function addTasksTo({ tasks, target }) {
	tasks
		.filter((task) => task.type === "task")
		.map((task) => getTaskElem(task))
		.reduce((acc, task) => {
			acc.appendChild(task);
			return acc;
		}, target);
}

const component = () => {
	const component = document.createElement("main");
	component.classList.add("container");

	//Forms
	const [ taskForm, toggleTaskForm]  = initializeForm({
		type: "task",
		addFunction: addTask,
		titlePlaceholder: "Get eggs for an omelette",
		descriptionPlaceholder:
			"Ask Danny if he has some, or go to the store to get them.",
	});
	const [ projectForm, toggleProjectForm ] = initializeForm({
		type: "project",
		addFunction: addProject,
		titlePlaceholder: "Learn how to cook",
		descriptionPlaceholder:
			"Start by learning at least 5 different recipes to mix and match",
	});

	component.appendChild(taskForm);
	component.appendChild(projectForm);

	//Header (With form activation included)
	component.appendChild(
		Header({ onAddTask: toggleTaskForm, onAddProject: toggleProjectForm })
	);

	const taskListElem = tasksDisplayElem();

	addTasksTo({ tasks: taskList, target: taskListElem });

	component.appendChild(taskListElem);

	return component;
};

document.body.appendChild(component());

//FOR TESTING vvvv

addTask({ taskTitle: "a", description: "b" });
addTask({ taskTitle: "c", description: "d" });

//FOR TESTING ^^^^
