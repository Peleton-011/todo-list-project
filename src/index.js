
import "@picocss/pico";

const component = () => {
	const component = document.createElement("div");

	component.textContent = "poop";

	return component;
};

document.body.appendChild(component());
