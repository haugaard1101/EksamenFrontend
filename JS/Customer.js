document.addEventListener("DOMContentLoaded", runFetchAllAlbumCustomers)

let tableBodyAlbumCustomers = document.querySelector("#tblBodyAlbumCustomers")

function runFetchAllAlbumCustomers() {
    fetchAllAlbumCustomers()
}

function fillRowsInTable(albumCustomer) {
    console.log(albumCustomer)
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
        <td>${albumCustomer.albumCustomerId}</td>
        <td>${albumCustomer.album.albumId}</td>
        <td>${albumCustomer.customer.customerId}</td>
        `;

    tableBodyAlbumCustomers.appendChild(tableRow);
}

function fetchAllAlbumCustomers() {
    fetchAny("albumcustomers", "GET", null).then(albumCustomers => {
        console.log(albumCustomers)

        albumCustomers.forEach(albumCustomer => {
            fillRowsInTable(albumCustomer)
        })
    }).catch(error => {
        console.error(error);
    })
}

document.querySelector("#createForm").addEventListener('submit', createAlbumCustomer)

// Function der skaffer vores form data og laver den om til et javascript objekt, og så poster det til backend.
async function createAlbumCustomer() {

    const form = document.querySelector("#createForm")
    const albumCustomerObjekt = preparePlainFormData(form)

    // url + fetchmetode + objekt vi gerne vil update
    fetchAny("albumcustomer", "POST", albumCustomerObjekt).then(albumCustomer => {
        alert("Created albumCustomer: " + albumCustomerObjekt.title)
        console.log("Created albumCustomer: ", albumCustomer)

        window.location.reload()
    }).catch(error => {
        console.error(error)
    })

}

document.querySelector("#deleteForm").addEventListener('submit', deleteAlbumCustomer)

function deleteAlbumCustomer() {
    const albumCustomerId = document.querySelector("#deleteID").value

    const form = document.querySelector("#deleteForm")
    const albumCustomerObjekt = preparePlainFormData(form)
    albumCustomerObjekt.albumCustomerId = albumCustomerId

    console.log("ID HERE" + albumCustomerId)
    console.log("ID HERE" + albumCustomerObjekt.albumCustomerId)

    fetchAny(`albumcustomer/${albumCustomerId}`, "DELETE", null).then(albumCustomer => {
        alert(`AlbumCustomer with ID: ${albumCustomerId} has been deleted`);

        window.location.reload()
        console.log("Deleted albumCustomer: ", albumCustomer)
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


