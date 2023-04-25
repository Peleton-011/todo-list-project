import "@picocss/pico";

import getTaskForm from "./components/taskForm";
import Task from "./logic/task";
import tasksDisplay from "./components/tasks";

const taskList = [];

import Project from "./logic/project";
import Task from "./logic/task";

let lastId = 0;

function newId() {
	return ++lastId;
}

const component = () => {
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

		taskList.push(
			new Task({
				title: taskTitle,
				description: description,
				priority: priorityLevel,
				dueDate: [dueDate, dueTime],
				id: 1,
			})
		);

		console.log(taskList);
	};
	const component = document.createElement("main");

	component.appendChild(tasksDisplay(taskList));
    
	component.appendChild(getTaskForm(taskOnSubmit));

	return component;
};

document.body.appendChild(component());
