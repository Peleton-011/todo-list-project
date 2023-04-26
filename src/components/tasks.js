function tasksDisplay(tasks) {
	const taskListElem = document.createElement("section");
    taskListElem.id = "taskList";
    taskListElem.classList.add("container");

	tasks.map((task) => {
		return getTaskElem(task);
	}).reduce((prev, curr) => taskListElem.appendChild(curr), taskListElem)

	return taskListElem;
}

function getTaskElem({ title, description }) {
	const task = document.createElement("details");
	const titleElem = document.createElement("summary");
	titleElem.innerText = title;

	const descriptionElem = document.createElement("p");

	descriptionElem.innerText = description;

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "X";
    removeBtn.onclick = (e) => {
        const titleTemp = e.target.parentElement;

        const taskTemp = titleTemp.parentElement;

        const taskList = taskTemp.parentElement;

        taskList.removeChild(taskTemp)
    }

    titleElem.appendChild(removeBtn)

	task.appendChild(titleElem);
	task.appendChild(descriptionElem);
	return task;
}

export default tasksDisplay;
