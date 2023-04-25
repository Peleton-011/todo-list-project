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
}) {
	const elem = document.createElement("div");

	const labelElem = document.createElement("label");

	labelElem.setAttribute("for", id);
	labelElem.innerText = label;

	const inputElem = document.createElement("input");

	if (disabled) {
		placeholder = "Disabled";
		inputElem.setAttribute("disabled", "");
	}
	if (required) {
		inputElem.setAttribute("required", "");
	}

	setAttrs(inputElem, [
		["type", type],
		["name", name],
		["value", value],
		["placeholder", placeholder],
	]);

	const descriptionElem = document.createElement("small");
	descriptionElem.innerText = description;

	elem.appendChild(label);

	return elem;
}

export default InputElem;
