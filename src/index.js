import "@picocss/pico";

import getTaskForm from "./components/taskForm";

const component = () => {

    const taskOnSubmit = (e) => {
        e.preventDefault();
        console.log("test")
    }
	const component = getTaskForm(taskOnSubmit);

	console.log(component);

	return component;
};

document.body.appendChild(component());
