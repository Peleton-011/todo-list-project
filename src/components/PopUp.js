function PopUp({ title, onClose, content }) {
	const PopUp = document.createElement("dialog");
	const Content = document.createElement("article");

	Content.appendChild(Header({ title: title, onClose: onClose }));

    Content.appendChild(content)

    PopUp.appendChild(Content)
    return PopUp;
}

function Header({ title, onClose }) {
	const header = document.createElement("header");
	header.innerText = title;

	const closeBtn = document.createElement("a");
	closeBtn.classList.add("close");
	closeBtn.addEventListener("click", onClose);

	header.appendChild(closeBtn);

	return header;
}

export default PopUp;
