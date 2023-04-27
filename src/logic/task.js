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
}

export default Task;
