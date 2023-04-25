import InputElem from "./formGen";

import SliderElem from "./slider";

function getTaskForm() {
	const form = document.createElement("form");
    form.classList.add("container")

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

	// const priority = new customSlider();

	const priority = SliderElem({
		id: "priority",
		label: "Priority Level",
		name: "priorityLevel",
		value: "0",
		description: "Priority level from 0 to 100",
		min: "0",
		max: "100",
		displayValue: true,
        useSteps: true,
        steps: [
            10, 20, 30, 40, 50, 60, 70, 80, 90
        ]
	});

	form.appendChild(title);
	form.appendChild(description);
	form.appendChild(dueDate);
	form.appendChild(dueTime);
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
