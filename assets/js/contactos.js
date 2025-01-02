
//Codigo do GetBoostrap para inicializar o popover

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

//Código para o toast

$(document).ready(function() {
    $('#formContacto').on('submit', function (data) {
        data.preventDefault();

        const toastElement = document.getElementById('submitToast')

        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastElement)
       
        toastBootstrap.show()
    
    })
})