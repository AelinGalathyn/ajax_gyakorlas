const baseURL = "https://retoolapi.dev/w56Vpq/applications"

document.addEventListener("DOMContentLoaded", () => {
    list_applicants();
    const employeeForm = document.getElementById('employeeForm');
    employeeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        new_applicant();
    });
    employeeForm.addEventListener("save", (event) => {
        event.preventDefault();
        manage_applicant();
    });
});

function delete_applicant(id) {
    if (window.confirm('Are you sure you want to delete?')) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            list_applicants();
        };
        xhttp.open("DELETE", `${baseURL}/${id}`);
        xhttp.send();
    }
}

document.getElementById('save').addEventListener('click', () => {
    const xhttp = new XMLHttpRequest();
    const name = document.getElementById('name_input').value;
    const job = document.getElementById('job_input').value;
    const experience = document.getElementById('experience_input').value;
    const based = document.getElementById('based_input').value;
    const applicant = {
        name: name,
        job: job,
        experience: experience,
        based: based
    };
    xhttp.onload = function () {
        list_applicants();
    }
    xhttp.open("PUT", `${baseUrl}/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(applicant));
    employeeForm.reset();
    alert(`${applicant.name}'s data has been changed.`)
});

function manage_applicant(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const { responseText } = xhttp;
        const applicant_list = JSON.parse(responseText);
        const applicant = applicant_list[id];
        document.getElementById('name_input').value(applicant.name);
        document.getElementById('job_input').value(applicant.job);
        document.getElementById('experience_input').value(applicant.experience);
        document.getElementById('based_input').value(applicant.based);

    }
    xhttp.open("GET", `${baseUrl}/${id}`);
    xhttp.send();
}

function new_applicant() {
    const name = document.getElementById('name_input').value;
    const job = document.getElementById('job_input').value;
    const experience = document.getElementById('experience_input').value;
    const based = document.getElementById('based_input').value;
    let name_result = /^[a-zA-Z ]+$/.test(name);
    let job_result = /^[a-zA-Z ]+$/.test(job);
    let experience_result = /^[0-9]+$/.test(experience);
    let based_result = /^[a-zA-Z ]+$/.test(based);
    if (!name_result) {
        alert("Incorrect name input!");
        document.employeeForm.name.focus();
    }
    else if (!job_result) {
        alert("Incorrect job input!");
        document.employeeForm.job.focus();
    }
    else if (!experience_result) {
        alert("Incorrect experience input!");
        document.employeeForm.experience.focus();
    }
    else if (!based_result) {
        alert("Incorrect base location input!");
        document.employeeForm.based.focus();
    }
    else {
        const applicant = {
            name: name,
            job: job,
            experience: experience,
            based: based
        };
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            console.log(xhttp);
            list_applicants();
        };
        xhttp.open("POST", baseURL);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(applicant));
        employeeForm.reset();
        alert(`${applicant.name} added to the list!`);
    };
}


function list_applicants() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const { responseText } = xhttp;
        const applicantList = JSON.parse(responseText);
        console.log(applicantList);
        let html = "";
        for (let i = 0; i < applicantList.length; i++) {
            const person = applicantList[i];
            html += `<tr>
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.job}</td>
            <td>${person.experience}</td>
            <td>${person.based}</td>
            <td><button onClick="manage_applicant(${person.id})">Manage</button></td>
            <td><button onclick="delete_applicant(${person.id})">X</td>
            </tr>`;
        };
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = html;
    };
    xhttp.open("GET", baseURL);
    xhttp.send();
}