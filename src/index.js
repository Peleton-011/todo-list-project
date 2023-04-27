import "@picocss/pico";

import getTaskForm from "./components/taskForm";
import Task from "./logic/task";

import Header from "./components/Header";
import PopUp from "./components/PopUp";

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
	taskList.push(new Task(taskInterface));
	const taskListElem = document.getElementById("taskList");

	taskListElem.appendChild(getTaskElem(taskInterface));
}

function tasksDisplay() {
	const taskListElem = document.createElement("section");
	taskListElem.id = "taskList";
	taskListElem.classList.add("container");

	return taskListElem;
}

function getTaskElem({ title, description, id }) {
	const task = document.createElement("details");
	task.id = id;
	const titleElem = document.createElement("summary");
	titleElem.innerText = title;

	const descriptionElem = document.createElement("p");

	descriptionElem.innerText = description;

	const removeBtn = document.createElement("button");
	removeBtn.innerText = "X";
	removeBtn.onclick = (e) => {
		removeTask(id);
	};

	titleElem.appendChild(removeBtn);

	task.appendChild(titleElem);
	task.appendChild(descriptionElem);
	return task;
}

function addTasksTo(tasks, target) {
	tasks
		.filter((task) => task.type === "task")
		.map((task) => getTaskElem(task))
		.reduce((acc, task) => {
			acc.appendChild(task);
			return acc;
		}, target);
}

function parseForm(id) {
	const FD = new FormData(document.getElementById(id));

	const formObj = {};

	for (const [name, value] of FD) {
		formObj[name] = value;
	}
	return formObj;
}

function initializeTaskForm() {
	const taskOnSubmit = (e) => {
		e.preventDefault();

		addTask(parseForm("task-form"));

		toggleTaskForm(e);
	};

	const [taskForm, toggleTaskForm] = PopUp({
		title: "Add Task",
		content: getTaskForm(taskOnSubmit),
		id: "task-form-popup",
	});

	return { taskForm, toggleTaskForm };
}

function initializeProjectForm() {
    const projectOnSubmit = (e) => {
		e.preventDefault();

		addTask(parseForm("project-form"));

		toggleProjectForm(e);
	};

	const [ projectForm, toggleProjectForm ] = PopUp({
		title: "Add Project",
		content: getTaskForm(projectOnSubmit),
		id: "project-form-popup",
	});

	return { projectForm, toggleProjectForm };
}

const component = () => {
	const component = document.createElement("main");
	component.classList.add("container");

    //Forms
	const { taskForm, toggleTaskForm } = initializeTaskForm();
	const { projectForm, toggleProjectForm } = initializeProjectForm();

	component.appendChild(taskForm);
	component.appendChild(projectForm);

    //Header (With form activation included)
	component.appendChild(
		Header({ onAddTask: toggleTaskForm, onAddProject: toggleProjectForm })
	);

	const taskListElem = tasksDisplay();

	addTasksTo(taskList, taskListElem);

	component.appendChild(taskListElem);

	return component;
};

document.body.appendChild(component());

//FOR TESTING vvvv

addTask({ taskTitle: "a", description: "b" });
addTask({ taskTitle: "c", description: "d" });

//FOR TESTING ^^^^
