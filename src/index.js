import "@picocss/pico";

import initializeForm from "./components/Form";
import Task from "./logic/task";
import Project from "./logic/project";

import "./style.css";

import Header from "./components/Header";

const getAddFunction = (type, target, toggleTaskForm, toggleProjectForm) => {
	function parseForm(form) {
		const FD = new FormData(form);
		const description = form.querySelector("textarea");
		const formObj = {};
		if (description) formObj.description = description.value;

		console.log(FD);

		for (const [name, value] of FD) {
			formObj[name] = formObj[name] || value;
		}
		return formObj;
	}

	return (e) => {
		const form = e.target;
		const formData = parseForm(form);
		target.handleAdd({
			...formData,
			type,
			getAddFunction,
			toggleTaskForm,
			toggleProjectForm,
		});
		target.addTaskElem(-1);
	};
};

function tasksDisplayElem() {
	const taskListElem = document.createElement("section");
	taskListElem.id = "taskList";
	taskListElem.classList.add("container");

	const config = { childList: true, subtree: true };
	/*
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
    */

	return taskListElem;
}

function form({ type }) {
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
	};
	return initializeForm(config);
}

const component = () => {
	const mainProject = new Project({
		title: "main",
		getAddFunction: getAddFunction,
	});

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

	const taskOnSubmit = getAddFunction(
		"task",
		mainProject,
		toggleTaskForm,
		toggleProjectForm
	);
	const projectOnSubmit = getAddFunction(
		"project",
		mainProject,
		toggleTaskForm,
		toggleProjectForm
	);

	component.appendChild(
		Header({
			onAddTask: (e) => toggleTaskForm(e, taskOnSubmit),
			onAddProject: (e) => toggleProjectForm(e, projectOnSubmit),
		})
	);

	// addTasksTo({ tasks: taskList, target: taskListElem });

	const content = mainProject.getContent();

	const contentBtns = content.querySelector("div");

	console.log(contentBtns.outerHTML);
	if (contentBtns) content.removeChild(contentBtns);

	// component.appendChild(taskListElem);

	component.appendChild(content);

	return component;
};

document.body.appendChild(component());
