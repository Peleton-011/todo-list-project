import "@picocss/pico";

import getTaskForm from "./components/taskForm";
import Task from "./logic/task";

const taskList = [];
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
	const component = getTaskForm(taskOnSubmit);

	console.log(component);

	return component;
};

document.body.appendChild(component());
