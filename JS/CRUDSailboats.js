document.addEventListener("DOMContentLoaded", runFetchAllSailboats) // Når siden starter, så runner vi vores hovedmetode i vores script vi har kaldt runFetchAllKandidater.

let tableBodySailboats = document.querySelector("#tblBodySailboats")

function runFetchAllSailboats() {
    fetchAllSailboats()
}

function fillRowsInTable(sailboat) {
    console.log(sailboat)
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
        <td>${sailboat.id}</td>
        <td>${sailboat.name}</td>
        <td>${sailboat.type}</td>
        <td>${sailboat.points}</td>
        `;

    tableBodySailboats.appendChild(tableRow);
}

function fetchAllSailboats() {
    fetchAny("sailboats", "GET", null).then(sailboats => {
        console.log(sailboats)

        sailboats.forEach(sailboat => {
            fillRowsInTable(sailboat)
        })
    }).catch(error => {
        console.error(error);
    })
}

document.querySelector("#createForm").addEventListener('submit', createSailboat)

// Function der skaffer vores form data og laver den om til et javascript objekt, og så poster det til backend.
async function createSailboat() {

    const form = document.querySelector("#createForm")
    const sailboatObjekt = preparePlainFormData(form)

    // url + fetchmetode + objekt vi gerne vil update
    fetchAny("sailboat", "POST", sailboatObjekt).then(sailboat => {
        alert("Created sailboat: " + sailboatObjekt.navn)
        console.log("Created sailboat: ", sailboat)

        window.location.reload()
    }).catch(error => {
        console.error(error)
    })

}

document.querySelector("#updateForm").addEventListener('submit', updateSailboat)

function updateSailboat() {

    const sailboatId = document.querySelector("#ID").value

    const form = document.querySelector("#updateForm")
    const sailboatObjekt = preparePlainFormData(form)
    sailboatObjekt.id = sailboatId

    console.log("ID HERE" + sailboatId)
    console.log("ID HERE" + sailboatObjekt.id)

    // Nu har vi de informationer vi skal bruge for at PUT vores båd. Vi indtaster url + fetchmetode + objekt vi gerne vil update.
    fetchAny("sailboat", "PUT", sailboatObjekt).then(sailboat => {
        alert("Updated sailboat: " + sailboatObjekt.name)
        console.log("Updated sailboat: ", sailboat)

        window.location.reload()
    }).catch(error => {
        console.error(error)
    })
}

document.querySelector("#deleteForm").addEventListener('submit', deleteSailboat)

function deleteSailboat() {

    const sailboatId = document.querySelector("#deleteID").value

    const form = document.querySelector("#deleteForm")
    const sailboatObjekt = preparePlainFormData(form)
    sailboatObjekt.id = sailboatId

    console.log("ID HERE" + sailboatId)
    console.log("ID HERE" + sailboatObjekt.id)

    fetchAny(`sailboat/${sailboatId}`, "DELETE", null).then(sailboat => {
        alert(`Sailboat with ID: ${sailboatId} has been deleted`);

        window.location.reload()
        console.log("Deleted sailboat: ", sailboat)
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


