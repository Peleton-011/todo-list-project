import "@picocss/pico";

import getTaskForm from "./components/taskForm";
import Task from "./logic/task";

import Header from "./components/Header";

const taskList = [];

function removeTask(id) {
	taskList.filter((currTask) => currTask.id !== id);
	document.getElementById(id).remove();
}

function addTask(config) {
	taskList.push(new Task(config));
	const taskListElem = document.getElementById("taskList");

	taskListElem.appendChild(getTaskElem(config));
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

const component = () => {
	const component = document.createElement("main");
	component.classList.add("container");

	const taskOnSubmit = (e) => {
		e.preventDefault();
		const FD = new FormData(document.querySelector("form"));
		const [taskTitle, description, dueDate, dueTime, priorityLevel] = [
			FD.get("taskTitle"),
			FD.get("description"),
			FD.get("dueDate"),
			FD.get("dueTime"),
			FD.get("priorityLevel"),
		];

		addTask({
			title: taskTitle,
			description: description,
			priority: priorityLevel,
			dueDate: [dueDate, dueTime],
		});

		console.log(taskList);
	};

	const onAddTask = () => {
		const main = document.querySelector("main");
		main.appendChild(getTaskForm(taskOnSubmit));
	};

	const onAddProject = () => {
		return "cum";
	};

	component.appendChild(Header({ onAddTask, onAddProject }));

	const taskListElem = tasksDisplay();

	taskList
		.filter((task) => task.type === "task")
		.map((task) => getTaskElem(task))
		.reduce((acc, task) => {
			acc.appendChild(task);
			return acc;
		}, taskListElem);

	component.appendChild(taskListElem);

	return component;
};

document.body.appendChild(component());

//FOR TESTING vvvv

addTask({ title: "a", description: "b" });
addTask({ title: "c", description: "d" });

//FOR TESTING ^^^^
