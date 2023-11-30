function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.innerText);
}

function drop(event, targetId) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");

    if (targetId === 'skillsList') {
        // If dropping into the skills section, create an editable div with a delete button
        var newElement = document.createElement("div");
        newElement.contentEditable = true;
        newElement.className = "editable";
        newElement.innerHTML = `${data} <button class="remove-btn" onclick="removeElement(this)">Remove</button>`;
        document.getElementById(targetId).appendChild(newElement);
    } else {
        // If dropping into work experience or projects section, create a list item with a delete button
        var newElement = document.createElement("li");
        newElement.innerHTML = `${data} <button class="remove-btn" onclick="removeElement(this)">Remove</button>`;
        document.getElementById(targetId).appendChild(newElement);
    }
}

function removeElement(button) {
    var element = button.parentNode;
    element.parentNode.removeChild(element);
}
