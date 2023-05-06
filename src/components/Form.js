import InputElem from "./InputElem";

import SliderElem from "./slider";

import PopUp from "./PopUp";

function addChildren(target, source) {
	const children = [...source.childNodes];
	children.forEach((child) => target.appendChild(child));
}

function getForm({ type, titlePlaceholder, descriptionPlaceholder }) {
	const lowerType = type.toLowerCase();
	const capitalizedType = lowerType[0].toUpperCase() + lowerType.slice(1);

	const form = document.createElement("form");
	form.classList.add("container");

	form.id = `${lowerType}-form`;

	const title = InputElem({
		id: "title",
		type: "text",
		label: `${capitalizedType} Title`,
		name: `${lowerType}Title`,
		placeholder: titlePlaceholder || "Title here",
		required: true,
	});

	const description = InputElem({
		id: "desc",
		type: "textarea",
		label: "Description",
		name: "description",
		placeholder: descriptionPlaceholder || "Description here",
		attrs: [
			["rows", 4],
			["form", "task-form"],
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

	const submit = InputElem({
		type: "submit",
		value: `Add ${capitalizedType}`,
	}); //"Add Project"

	addChildren(form, title);
	addChildren(form, description);
	addChildren(form, dueDate);
	addChildren(form, dueTime);
	addChildren(form, priority);
	addChildren(form, submit);

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

function resetForm(id) {
	const form = document.getElementById(id);
	const elems = [
		...form.querySelectorAll("input"),
		form.querySelector("textarea"),
	];
	elems
		.filter((elem) => elem.type !== "submit")
		.forEach((input) => (input.value = ""));
}

function initializeForm({
	type,
	titlePlaceholder,
	descriptionPlaceholder,
	id,
}) {
	const lowerType = type.toLowerCase();
	const capitalizedType = lowerType[0].toUpperCase() + lowerType.slice(1);

	const getOnSubmitFunc = (onSubmit) => (e) => {
		e.preventDefault();
		onSubmit(e);
		resetForm(`${lowerType}-form`);
		toggleForm(e);
	};

	const [form, toggleForm] = PopUp({
		title: `Add ${capitalizedType}`,
		content: getForm({
			type,
			titlePlaceholder,
			descriptionPlaceholder,
		}),
		id: id || `${lowerType}-form-popup`,
	});

	return [
		form,
		(onSubmit) => {
			const form = document.getElementById(`${lowerType}-form`);

			form.onsubmit = getOnSubmitFunc(onSubmit);

			toggleForm();
		},
	];
}

export default initializeForm;
