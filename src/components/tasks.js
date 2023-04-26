function tasksDisplay(tasks, removeTask) {
	const taskListElem = document.createElement("section");
	taskListElem.id = "taskList";
	taskListElem.classList.add("container");

	tasks
		.map((task) => {
			return getTaskElem(task, removeTask);
		})
		.reduce((prev, curr) => taskListElem.appendChild(curr), taskListElem);

	return taskListElem;
}

function getTaskElem({ title, description, id }, removeTask) {
	const task = document.createElement("details");
	task.id = id;
	const titleElem = document.createElement("summary");
	titleElem.innerText = title;

	const descriptionElem = document.createElement("p");

	descriptionElem.innerText = description;

	const removeBtn = document.createElement("button");
	removeBtn.innerText = "X";
	removeBtn.onclick = (e) => {
		//DOM
		const thisTask = document.getElementById(id);
		thisTask.parentElement.removeChild(thisTask);
		//Task list
        removeTask(id);
		
	};

	titleElem.appendChild(removeBtn);

	task.appendChild(titleElem);
	task.appendChild(descriptionElem);
	return task;
}

export default tasksDisplay;
