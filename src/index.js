

const component = () => {
	const component = document.createElement("div");

	component.textContent = "halo";

	return component;
};

document.body.appendChild(component());
