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

	const wrapper = [];

	content.childNodes.forEach((elem) => wrapper.push(elem));

	return wrapper;
}

function updateMainContent(mainProject, taskListElem) {
	taskListElem.childNodes.forEach((n) => n.remove());
	console.warn(getMainContent(mainProject));
	getMainContent(mainProject).forEach((element) => {
		taskListElem.appendChild(element);
	});
}

function form({ type, targetProject, taskListElem }) {
	const [titlePlaceholder, descriptionPlaceholder] =
		type === "project"
			? //For projects
			  [
					"Learn how to cook",
					"Start by learning at least 5 different recipes to mix and match",
			  ]
			: //For tasks
			  [
					"Get eggs for an omelette",
					"Ask Danny if he has some, or go to the store to get them.",
			  ];
	const config = {
		type,
		titlePlaceholder,
		descriptionPlaceholder,
		addFunction: (args) => {
			targetProject.handleAdd(args);
			updateMainContent(targetProject, taskListElem);
		},
	};
	return initializeForm(config);
}

const component = () => {
	const mainProject = new Project({ title: "main" });

	mainProject.addTask({ taskTitle: "Test1" });
	mainProject.addProject({ projectTitle: "Test2" });

	const component = document.createElement("main");
	component.classList.add("container");

	const taskListElem = tasksDisplayElem();

	//Forms

	const formConfig = {
		targetProject: mainProject,
		taskListElem: taskListElem,
	};

	const [taskForm, toggleTaskForm] = form({
		type: "taskList",
		...formConfig,
	});
	const [projectForm, toggleProjectForm] = form({
		type: "project",
		...formConfig,
	});

	component.appendChild(taskForm);
	component.appendChild(projectForm);

	//Header (With form activation included)
	component.appendChild(
		Header({ onAddTask: toggleTaskForm, onAddProject: toggleProjectForm })
	);

	// addTasksTo({ tasks: taskList, target: taskListElem });

	component.appendChild(taskListElem);

	updateMainContent(mainProject, taskListElem);

	return component;
};

document.body.appendChild(component());
