//  track number of skills dragged into each box
let skillsCount = 0;
let skills2Count = 0;
let skills3Count = 0;

// Arrays for good and bad skills
const goodSkills1 = ["node.js", "python", "javascript", "html & css", "REACT", "SQL", "Database design", "Express.js", "Apache", "AWS", "Docker"];
const badSkills1 = ["Microsoft Excel", "C#", "Data Entry", "Customer Service", "MASM", "MATLAB"];

const goodSkills2 = ["Project Lead for E-commerce Overhaul", "Software Engineering Intern at ABC Innovations", "IT Project Manager at Global Solutions", "Back-End Developer at DataMinds Co.", "Front-End Developer at TechCraft Studios"];
const badSkills2 = ["Data Entry Intern at FedEx", "Office Assistant at Mary's Coding Camp", "Quality Insurance Intern at Intel", "Cybersecurity Lead at Ebay"];

const goodSkills3 = ["Secure Blogging Platform with Multi-Factor Authentication", "AI-Powered Personal Portfolio Optimization", "Blockchain-Based Task Management Application"];
const badSkills3 = ["Portfolio Website", "To Do List App", "Social Media Metrics Dashboard"];

function allowDrop(event) {
    event.preventDefault();
}

function drag(event, data) {
    event.dataTransfer.setData("text", data);
}

function drop(event, targetId) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");

    // Check the targetId to determine the destination box
    if (targetId === "otherSkillsList" && skillsCount < 5) {
        addToBox(data, targetId);
        skillsCount++;
    } else if (targetId === "workExperienceList" && skills2Count < 5) {
        addToBox(data, targetId);
        skills2Count++;
    } else if (targetId === "projectsList" && skills3Count < 3) {
        addToBox(data, targetId);
        skills3Count++;
    }
}

function addToBox(data, targetId) {
    var newElement = document.createElement("li");
    newElement.innerText = data;

    // Add remove button to the new element
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";
    removeButton.onclick = function () {
        newElement.remove();

        // Update the count when a skill is removed
        if (targetId === "otherSkillsList") {
            skillsCount--;
        } else if (targetId === "workExperienceList") {
            skills2Count--;
        } else if (targetId === "projectsList") {
            skills3Count--;
        }
    };
    newElement.appendChild(removeButton);

    document.getElementById(targetId).appendChild(newElement);
}

function checkInterviewOffer() {
    const workExperienceSkills = getSkillsFromList("workExperienceList");
    const otherSkills = getSkillsFromList("otherSkillsList");
    const projectsSkills = getSkillsFromList("projectsList");

    // Check if the user meets the criteria for an interview offer
    if (
        hasEnoughSkills(goodSkills2, workExperienceSkills, 3) &&
        hasEnoughSkills(badSkills2, workExperienceSkills, 2) &&
        hasEnoughSkills(goodSkills1, otherSkills, 3) &&
        hasEnoughSkills(badSkills1, otherSkills, 2) &&
        hasEnoughSkills(goodSkills3, projectsSkills, 2) &&
        hasEnoughSkills(badSkills3, projectsSkills, 1)
    ) {
        alert("Congratulations! You got an interview offer!");
    } else {
        alert("Sorry, you did not qualify for an interview offer.");
    }
}

function getSkillsFromList(listId) {
    const skillsList = document.getElementById(listId).getElementsByTagName("li");
    return Array.from(skillsList).map(skill => skill.innerText);
}

function hasEnoughSkills(requiredSkills, userSkills, count) {
    const matchingSkills = userSkills.filter(skill => requiredSkills.includes(skill));
    return matchingSkills.length >= count;
}


function initializeApplyButton() {
    const applyButton = document.getElementById("applyButton");
    applyButton.addEventListener("click", checkInterviewOffer);
}

window.onload = function () {
    initializeApplyButton();
};
