import "@picocss/pico";

import getTaskForm from "./components/taskForm";

import Project from "./logic/project";
import Task from "./logic/task";

let lastId = 0;

function newId() {
	return ++lastId;
}

const component = () => {
	// const Data = new Project({ title: "main", id: newId() });

	const taskOnSubmit = async (e) => {
		e.preventDefault();
		// const FD = new FormData(document.querySelector("form"));

	};
	const component = getTaskForm(taskOnSubmit);

	console.log(component);

	return component;
};

document.body.appendChild(component());
