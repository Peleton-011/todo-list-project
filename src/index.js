import "@picocss/pico";

import initializeForm from "./components/Form";
import Task from "./logic/task";
import Project from "./logic/project";

import Header from "./components/Header";

function tasksDisplayElem() {
	const taskListElem = document.createElement("section");
	taskListElem.id = "taskList";
	taskListElem.classList.add("container");

	return taskListElem;
}

const component = () => {
	const mainProject = new Project({ title: "main" });

	const component = document.createElement("main");
	component.classList.add("container");

	//Forms
	const [taskForm, toggleTaskForm] = initializeForm({
		type: "task",
		addFunction: mainProject.addTask,
		titlePlaceholder: "Get eggs for an omelette",
		descriptionPlaceholder:
			"Ask Danny if he has some, or go to the store to get them.",
	});
	const [projectForm, toggleProjectForm] = initializeForm({
		type: "project",
		addFunction: mainProject.addProject,
		titlePlaceholder: "Learn how to cook",
		descriptionPlaceholder:
			"Start by learning at least 5 different recipes to mix and match",
	});

	component.appendChild(taskForm);
	component.appendChild(projectForm);

	//Header (With form activation included)
	component.appendChild(
		Header({ onAddTask: toggleTaskForm, onAddProject: toggleProjectForm })
	);

	const taskListElem = tasksDisplayElem();

	// addTasksTo({ tasks: taskList, target: taskListElem });

	taskListElem.appendChild(mainProject.getElem());

	component.appendChild(taskListElem);

	return component;
};

document.body.appendChild(component());
