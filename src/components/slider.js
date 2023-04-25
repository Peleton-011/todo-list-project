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
	useSteps,
	steps = [],
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

	if (useSteps && steps.length > 0) {
		const stepsElem = getSteps(steps, id);

        const inputElem = rangeElem.querySelector("input") 

		rangeElem.insertBefore(
			stepsElem,
			inputElem.nextSibling
		);

		inputElem.setAttribute("list", id + "markers");
	}

	rangeElem.classList.add("range-wrap");

	rangeElem.insertBefore(getStyle(), rangeElem.firstChild);

	const bubbleElem = document.createElement("output");
	bubbleElem.classList.add("bubble");

	rangeElem.insertBefore(bubbleElem, rangeElem.querySelector("input"));

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

function getStyle() {
	const styleTag = document.createElement("style");
	styleTag.innerHTML = `

    .range-wrap > * {
        transition: transform 0.5s ease, opacity 0.5s ease-in-out, margin-top 0.2s ease-in-out;
    }

    .bubble, .bubble::after {
        display: none;
    }

    .range-wrap:hover > .bubble {
        display: block;
        background-color: var(--range-thumb-color);
        padding: 4px 12px;
        position: absolute;
        border-radius: 4px;
        left: 50%;
        transform: translateX(-50%);
      }
      .range-wrap:hover > .bubble::after {
        display: block;
        content: "";
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--range-thumb-color);
        bottom: -1px;
        left: 50%;
      }
    .range-wrap:hover > input{
        margin-top: calc(2rem + 8px);
    }
    `;

	return styleTag;
}

function getSteps(steps, id) {
	const datalist = document.createElement("datalist");
	datalist.id = id + "markers";

	steps.forEach((step) => {
		const option = document.createElement("option");
		option.value = step;
        option.label = "ass"
		datalist.appendChild(option);
	});

	return datalist;
}

export default SliderElem;
