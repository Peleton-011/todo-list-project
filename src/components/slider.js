import InputElem from "./formGen";

function SliderElem({
	id,
	label,
	name,
	value,
	description,
	required,
	disabled,
	min,
	max,
	displayValue,
	attrs = [],
}) {
	const rangeElem = InputElem({
		id,
		type: "range",
		label,
		name,
		value,
		description,
		required,
		disabled,
		attrs: [...attrs, ["min", min], ["max", max], ["class", "range"]],
	});

    if (!displayValue) {
        return rangeElem;
    }

	rangeElem.classList.add("range-wrap");

	const bubbleElem = document.createElement("output");
	bubbleElem.classList.add("bubble");

	rangeElem.appendChild(bubbleElem);

	const range = rangeElem.querySelector(".range");
	const bubble = rangeElem.querySelector(".bubble");

	range.addEventListener("input", () => {
		setBubble(range, bubble);
	});
	setBubble(range, bubble);

	function setBubble(range, bubble) {
		const val = range.value;
		const min = range.min ? range.min : 0;
		const max = range.max ? range.max : 100;
		const newVal = Number(((val - min) * 100) / (max - min));
		bubble.innerHTML = val;

		// Sorta magic numbers based on size of the native UI thumb
		bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
	}

    return rangeElem;
}

export default SliderElem;
