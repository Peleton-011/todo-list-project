import Task from "./task";

class Project extends Task {
	type = "project";

	constructor(params) {
		super(params);

		this.taskList = [];
	}

	addTask(taskParams) {
		this.taskList.push(new Task(taskParams));
	}

	getElem({ onDel }) {
		const taskElem = super.getElem({ onDel });

		return taskElem;
	}
}

export default Project;
