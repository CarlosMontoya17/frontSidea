

function loader() {
    let timerInterval
    Swal.fire({
        title: 'Cargando',
        text: 'Espere porfavor',
        timeProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {

    })

}


function loadedData(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Datos cargados correctamente'
      })
}


function closeAlert(){
    Swal.close();

}