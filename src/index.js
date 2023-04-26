import "@picocss/pico";

import getTaskForm from "./components/taskForm";
import Task from "./logic/task";
import tasksDisplay from "./components/tasks";

import Header from "./components/Header";

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
    component.classList.add("container")

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

	const onAddTask = () => {
		const main = document.querySelector("main");
		main.appendChild(getTaskForm(taskOnSubmit));
	};

    const onAddProject = () => {
        return "cum"
    }

	component.appendChild(Header({ onAddTask, onAddProject }));

	showTasks(component, taskList);

	return component;
};

document.body.appendChild(component());
