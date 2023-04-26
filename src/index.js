import "@picocss/pico";

import getTaskForm from "./components/taskForm";
import Task from "./logic/task";
import tasksDisplay from "./components/tasks";

const taskList = [new Task({title: "a", description: "b"}), new Task({title: "c", description: "d"})];




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

			})
		);

        showTasks(component, taskList);
		console.log(taskList);
	};
	const component = document.createElement("main");

	showTasks(component, taskList);
    
	component.appendChild(getTaskForm(taskOnSubmit));

	return component;
};

function showTasks(parent, taskList) {
    const taskListElem = document.getElementById("taskList");
    if (taskListElem) parent.removeChild(taskListElem);
    parent.appendChild(tasksDisplay(taskList))
}

document.body.appendChild(component());
