import "@picocss/pico";

import initializeForm from "./components/Form";
import Task from "./logic/task";
import Project from "./logic/project";

import Header from "./components/Header";

function tasksDisplayElem() {
	const taskListElem = document.createElement("section");
	taskListElem.id = "taskList";
	taskListElem.classList.add("container");

	const config = { childList: true, subtree: true };

	const callback = (mutationList, observer) => {
		for (const mutation of mutationList) {
			if (
				taskListElem.childNodes.length > 2 &&
				taskListElem.innerText !== ""
			) {
				taskListElem.innerText = "";
			} else if (
				!(taskListElem.childNodes.length > 2) &&
				taskListElem.innerText !== "No tasks or projects found"
			) {
				taskListElem.innerText = "No tasks or projects found";
			}
		}
	};

	// Create an observer instance linked to the callback function
	const observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	observer.observe(taskListElem, config);

	return taskListElem;
}

function getMainContent(mainProject) {
	const mainProjectElement = mainProject.getElem();

	const content = mainProjectElement.querySelector("details > p");

	content.innerText = "";

	const wrapper = document.createElement("div");

	content.childNodes.forEach((elem) => wrapper.appendChild(elem));

	return wrapper;
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
	getMainContent(mainProject).childNodes.forEach((elem) => {
		taskListElem.appendChild(elem);
	});

	console.log(getMainContent(mainProject));

	component.appendChild(taskListElem);

	return component;
};

document.body.appendChild(component());
