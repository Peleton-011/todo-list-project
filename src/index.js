import "@picocss/pico";

import getTaskForm from "./components/taskForm";
import Task from "./logic/task";
import tasksDisplay from "./components/tasks";

const taskList = [];

function removeTask(id) {
	taskList.filter((currTask) => currTask.id !== id);
}

function addTask(config) {
	taskList.push(new Task(config));
}

function showTasks(parent, taskList) {
	const taskListElem = document.getElementById("taskList");
	if (taskListElem) parent.removeChild(taskListElem);
	parent.appendChild(tasksDisplay(taskList, removeTask));
}

//FOR TESTING vvvv

addTask({ title: "a", description: "b" });
addTask({ title: "c", description: "d" });

//FOR TESTING ^^^^


const component = () => {
	const component = document.createElement("main");

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

		showTasks(component, taskList);
		console.log(taskList);
	};




	showTasks(component, taskList);

	component.appendChild(getTaskForm(taskOnSubmit));

	return component;
};


document.body.appendChild(component());
