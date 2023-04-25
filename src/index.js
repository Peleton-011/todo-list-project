
import "@picocss/pico";

import getTaskForm from "./components/taskForm";

const component = () => {
	const component = getTaskForm();


    console.log(component)

	return component;
};

document.body.appendChild(component());
