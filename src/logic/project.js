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
}

export default Project;
