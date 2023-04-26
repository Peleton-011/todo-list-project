function tasksDisplay(tasks) {
	const taskListElem = document.createElement("section");
    taskListElem.id = "taskList";

	tasks.map((task) => {
		return getTaskElem(task);
	}).reduce((prev, curr) => taskListElem.appendChild(curr), taskListElem)

	return taskListElem;
}

function getTaskElem({ title, description }) {
	const task = document.createElement("article");
	const titleElem = document.createElement("h3");
	titleElem.innerText = title;

	const descriptionElem = document.createElement("p");

	descriptionElem.innerText = description;

	task.appendChild(titleElem);
	task.appendChild(descriptionElem);
	return task;
}

export default tasksDisplay;
