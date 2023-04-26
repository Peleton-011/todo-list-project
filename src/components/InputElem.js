// This recieves an array of field objects, each describing a form field
// With that it creates a form html element (2 cols for wide screens and 1 otherwise)

const setAttr = (elem, name, value) => {
	if (value) {
		elem.setAttribute(name, value);
		return;
	}
	return;
};

const setAttrs = (elem, attrs) => {
	attrs.forEach((attr) => {
		setAttr(elem, attr[0], attr[1]);
	});
};

function InputElem({
	id,
	type,
	label,
	name,
	value,
	placeholder,
	description,
	required,
	disabled,
	attrs = [],
}) {
	const elem = document.createElement("div");

	const isTextArea = type === "textarea";
	const inputElem = document.createElement(isTextArea ? "textarea" : "input");

	if (disabled) {
		placeholder = "Disabled";
		inputElem.setAttribute("disabled", "");
	}
	if (required) {
		inputElem.setAttribute("required", "");
	}

	setAttrs(inputElem, [
		...attrs,
		["type", type],
		["name", name],
		["value", value],
		["placeholder", placeholder],
	]);

	elem.appendChild(inputElem);

	if (label) {
		const labelElem = document.createElement("label");

		labelElem.setAttribute("for", id);
		labelElem.innerText = label;

		elem.insertBefore(labelElem, elem.firstChild);
	}

	if (!description) {
		return elem;
	}

	const descriptionElem = document.createElement("small");
	descriptionElem.innerText = description;

	elem.appendChild(descriptionElem);

	return elem;
}

export default InputElem;
