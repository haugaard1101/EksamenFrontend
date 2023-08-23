document.addEventListener("DOMContentLoaded", runFetchAllAlbums)

let tableBodyAlbums = document.querySelector("#tblBodyAlbums")

function runFetchAllAlbums() {
    fetchAllAlbums()
}

function fillRowsInTable(album) {
    console.log(album)
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
        <td>${album.albumId}</td>
        <td>${album.title}</td>
        <td>${album.artist}</td>
        <td>${album.genre}</td>
        <td>${album.availability}</td>
        <td>${album.store.storeId}</td>
        `;

    tableBodyAlbums.appendChild(tableRow);
}

function fetchAllAlbums() {
    fetchAny("albums", "GET", null).then(albums => {
        console.log(albums)

        albums.forEach(album => {
            fillRowsInTable(album)
        })
    }).catch(error => {
        console.error(error);
    })
}

document.querySelector("#createForm").addEventListener('submit', createAlbum)

// Function der skaffer vores form data og laver den om til et javascript objekt, og så poster det til backend.
async function createAlbum() {

    const form = document.querySelector("#createForm")
    const albumObjekt = preparePlainFormData(form)

    // url + fetchmetode + objekt vi gerne vil update
    fetchAny("album", "POST", albumObjekt).then(album => {
        alert("Created album: " + albumObjekt.title)
        console.log("Created album: ", album)

        window.location.reload()
    }).catch(error => {
        console.error(error)
    })

}

document.querySelector("#updateForm").addEventListener('submit', updateAlbum)

function updateAlbum() {

    const albumId = document.querySelector("#ID").value

    const form = document.querySelector("#updateForm")
    const albumObjekt = preparePlainFormData(form)
    albumObjekt.id = albumId

    console.log("ID HERE" + albumId)
    console.log("ID HERE" + albumObjekt.id)

    // Nu har vi de informationer vi skal bruge for at PUT vores båd. Vi indtaster url + fetchmetode + objekt vi gerne vil update.
    fetchAny("album", "PUT", albumObjekt).then(album => {
        alert("Updated album: " + albumObjekt.name)
        console.log("Updated album: ", album)

        window.location.reload()
    }).catch(error => {
        console.error(error)
    })
}

document.querySelector("#deleteForm").addEventListener('submit', deleteAlbum)

function deleteAlbum() {

    const albumId = document.querySelector("#deleteID").value

    const form = document.querySelector("#deleteForm")
    const albumObjekt = preparePlainFormData(form)
    albumObjekt.id = albumId

    console.log("ID HERE" + albumId)
    console.log("ID HERE" + albumObjekt.id)

    fetchAny(`album/${albumId}`, "DELETE", null).then(album => {
        alert(`Album with ID: ${albumId} has been deleted`);

        window.location.reload()
        console.log("Deleted albumboat: ", album)
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


