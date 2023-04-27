import InputElem from "./InputElem";

import SliderElem from "./slider";

//To-Do: make a general form element instead of two separate ones

function addChildren(target, source) {
	const children = [...source.childNodes];
	children.forEach((child) => target.appendChild(child));
}

function getProjectForm(onSubmitFunc) {
	const form = document.createElement("form");
	form.classList.add("container");

	form.id = "project-form";

	const title = InputElem({
		id: "title",
		type: "text",
		label: "Project title",
		name: "projectTitle",
		placeholder: "Learn to cook",
		required: true,
	});

	const description = InputElem({
		id: "desc",
		type: "textarea",
		label: "Description",
		name: "description",
		placeholder:
			"Start by learning at least 5 different recipes to mix and match",
		attrs: [
			["rows", 4],
			["form", "project-form"],
		],
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
		steps: [10, 20, 30, 40, 50, 60, 70, 80, 90],
	});

	const submit = InputElem({ type: "submit", value: "Add Project" });

	addChildren(form, title);
	addChildren(form, description);
	addChildren(form, dueDate);
	addChildren(form, dueTime);
	addChildren(form, priority);
	addChildren(form, submit);

	form.onsubmit = onSubmitFunc;

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

export default getProjectForm;
