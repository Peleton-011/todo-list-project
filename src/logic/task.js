let lastId = 0;

function newId() {
	return ++lastId;
}
class Task {
	type = "task";

	constructor({ title, description, priority, dueDate, id }) {
		this.title = title || "Unnamed Task";
		this.description = description || "No description available";
		this.priority = priority || 5;
		this.dueDate = dueDate || null;
		this.id = newId();
	}

	getConfig() {
		return {
			title: this.title,
			description: this.description,
			priority: this.priority,
			dueDate: this.dueDate,
			id: this.id,
		};
	}
	getRemoveBtn({onDel}) {
		const removeBtn = document.createElement("button");
		document.createElement("button");
		removeBtn.innerText = "x";
		removeBtn.setAttribute(
			"style",
			`
        width: 1.5rem;
        height: 1.5rem;
        display: inline-block;
        text-align: center;
        margin: 0;
        padding: 0;`
		);
		removeBtn.onclick = (e) => {
			onDel(this.id);
		};
		return removeBtn;
	}

	getElem({onDel}) {
		const task = document.createElement("details");
		task.id = this.id;
		const summary = document.createElement("summary");
		const summaryHeader = document.createElement("div");

		summary.setAttribute(
			"style",
			`
        display: flex;
        align-items: center;
    `
		);

		summaryHeader.setAttribute(
			"style",
			`
            display: flex;
            justify-content: space-between;
            width: 100%;
        `
		);

		const titleElem = document.createElement("h4");
		titleElem.innerText = this.title;
		titleElem.setAttribute(
			"style",
			`
        margin-bottom: 0`
		);

		const descriptionElem = document.createElement("p");

		descriptionElem.innerText = this.description;

		const removeBtn = this.getRemoveBtn({onDel});

		summaryHeader.appendChild(titleElem);
		summaryHeader.appendChild(removeBtn);

		summary.appendChild(summaryHeader);

		task.appendChild(summary);
		task.appendChild(descriptionElem);
		return task;
	}
}

export default Task;
