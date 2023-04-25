import InputElem from "./formGen";

function getTaskForm() {
	const form = document.createElement("form");

	const title = InputElem({
		id: "title",
		type: "text",
		label: "Task title",
		name: "taskTitle",
		placeholder: "Task title",
		required: true,
	});
}
