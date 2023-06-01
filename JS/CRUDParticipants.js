document.addEventListener("DOMContentLoaded", runFetchAllParticipants) // Når siden starter, så runner vi vores hovedmetode i vores script vi har kaldt runFetchAllKandidater.

let tableBodyParticipants = document.querySelector("#tblBodyParticipants")

function runFetchAllParticipants() {
    fetchAllParticipants()
}

function fillRowsInTable(participant) {
    console.log(participant)
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
        <td>${participant.participantId}</td>
        <td>${participant.points}</td>
        <td>${participant.race.raceId}</td>
        <td>${participant.race.date}</td>
        <td>${participant.sailboat.id}</td>
        <td>${participant.sailboat.name}</td>
        `;

    tableBodyParticipants.appendChild(tableRow);
}

function fetchAllParticipants() {
    fetchAny("participants", "GET", null).then(participants => {

        participants.forEach(participant => {
            fillRowsInTable(participant)
        })
    }).catch(error => {
        console.error(error);
    })
}

document.querySelector("#createForm").addEventListener('submit', createParticipant)

async function createParticipant() {

    const form = document.querySelector("#createForm")
    const participantObjekt = preparePlainFormData(form)

    // url + fetchmetode + objekt vi gerne vil update
    fetchAny("participant", "POST", participantObjekt).then(participant => {
        alert("Created participant: " + participantObjekt.navn)
        console.log("Created participant: ", participant)

        window.location.reload()
    }).catch(error => {
        console.error(error)
    })

}

document.querySelector("#updateForm").addEventListener('submit', updateParticipant)

function updateParticipant(event) {

    event.preventDefault();

    const participantId = document.querySelector("#updateID").value

    const form = document.querySelector("#updateForm")
    const participantObjekt = preparePlainFormData(form)
    participantObjekt.id = participantId

    console.log("ID HERE" + participantId)
    console.log("ID HERE" + participantObjekt.id)

    fetchAny("participant", "PUT", participantObjekt).then(participant => {
        alert("Updated participant: " + participantObjekt.name)
        console.log("Updated participant: ", participant)

        window.location.reload()
    }).catch(error => {
        console.error(error)
    })
}

document.querySelector("#deleteForm").addEventListener('submit', deleteParticipant)

function deleteParticipant() {

    const participantId = document.querySelector("#deleteID").value

    const form = document.querySelector("#deleteForm")
    const participantObjekt = preparePlainFormData(form)
    participantObjekt.id = participantId

    fetchAny(`participant/${participantId}`, "DELETE", null).then(participant => {
        alert(`Participant with ID: ${participantId} has been deleted`);

        window.location.reload()
        console.log("Deleted Participant: ", participant)
    }).catch(error => {
        console.error(error)
    })
}

document.querySelector("#deleteSailboatForm").addEventListener('submit', deleteSailboat)

function deleteSailboat(event) {

    event.preventDefault()

    const sailboatId = document.querySelector("#sailboatID").value

    const form = document.querySelector("#deleteSailboatForm")
    const sailboatObjekt = preparePlainFormData(form)
    sailboatObjekt.id = sailboatId

    fetchAny(`participant/sailboatid/${sailboatId}`, "DELETE", null).then(sailboat => {
        alert(`Sailboat with ID: ${sailboatId} has been deleted`);

        window.location.reload()
        console.log("Deleted Participant: ", sailboat)
    }).catch(error => {
        console.error(error)
    })
}

// Denne metode laver et form element om til et javascript objekt vi kalder plainFormData.
function preparePlainFormData(form) {
    console.log("Received the Form:", form)
    const formData = new FormData(form)  // indbygget metode, behøves ikke forstås.
    console.log("Made the form in to FormData:", formData)
    const plainFormData = Object.fromEntries(formData.entries())
    console.log("Changes and returns the FormData as PlainFormData:", plainFormData)
    return plainFormData
}





