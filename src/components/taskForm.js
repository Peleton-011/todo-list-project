import InputElem from "./formGen";

import {customSlider, style as sliderStyle} from "./slider";

function getTaskForm() {
	const form = document.createElement("form");

	const title = InputElem({
		id: "title",
		type: "text",
		label: "Task title",
		name: "taskTitle",
		placeholder: "Get eggs for an omelette",
		required: true,
	});

	const description = InputElem({
		id: "desc",
		type: "textarea",
		label: "Description",
		name: "description",
		placeholder:
			"Ask Danny if he has some, or go to the store to get them.",
	});

	const dueDate = InputElem({
		id: "dueDate",
		type: "date",
		label: "Due Date",
		name: "dueDate",
		description: "This field is optional",
	});

	const dueTime = InputElem({
		id: "dueTime",
		type: "time",
		label: "Due Time",
		name: "dueTime",
		description: "This field is optional",
	});


    const priority = new customSlider();

	// const priority = InputElem({
	// 	id: "priority",
	// 	type: "range",
	// 	label: "Priority Level",
	// 	name: "priorityLevel",
	// 	value: "0",
	// 	description: "Priority level from 0 to 100",
	// 	attrs: [
	// 		["min", "0"],
	// 		["max", "100"],
	// 	],
	// });

    // const priorityInput = priority.querySelector("input");

    // priorityInput.addEventListener("change", (event) => {
    //     priority.setAttribute("data-tooltip", event.target.value.trim());
    // })


    form.appendChild(title);
    form.appendChild(description);
    form.appendChild(dueDate);
    form.appendChild(dueTime);
    form.appendChild(sliderStyle);
    form.appendChild(priority);

    return form;

	/*
    Config: 
{
	id,
	type,
	label,
	name,
	value,
	placeholder,
	description,
	required,
	disabled,
}
    */
}

export default getTaskForm;
