

function loader() {
    let timerInterval
    Swal.fire({
        title: 'Cargando',
        text: 'Espere porfavor',
        timeProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {

    })

}


function closeAlert(){
    Swal.close();

}