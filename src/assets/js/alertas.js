// import 'animate.css';

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

function loaderMsg(msg) {
    let timerInterval
    Swal.fire({
        title: 'Cargando',
        text: msg,
        timeProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
    });
}


function closeAlert() {
    Swal.close();

}


function QuestionAlert(msg, confirmMsg, denyMsg){
    Swal.fire({
        title: msg,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: confirmMsg,
        denyButtonText: denyMsg,
      }).then((result) => {
        if (result.isConfirmed) {
          return true
        } else if (result.isDenied) {
          return false;
        }
      });
}




function showDetailsActas(comments) {
    Swal.fire({
        title: 'DETALLES',
        text: comments,
        showClass: {
            popup: 'animate__animated animate__bounceInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__bounceOutDown'
        }
    })
}
 
function ShowImageAd(id, tipo) {
    Swal.fire({
        imageUrl: 'httpss://actasalinstante.com:3030/api/ads/getImage/' + id,
        imageHeight: '400%',
        text: "Vista previa de: " + '\n' + " • " + tipo + " • ",
        confirmButton: true,
        confirmButtonText: 'Descargar',
        confirmButtonColor: '#14C38E',
        showCancelButton: true,
        cancelButtonText: 'Cerrar'
    }).then((result) => {
        if (result.isConfirmed) {
            download("https://actasalinstante.com:3030/api/ads/getImage/" + id, tipo);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se Descargo La Imagen De: ' + tipo,
                showConfirmButton: false,
                timer: 1500,

            })
        }

    }

    );
    edit();
}



function customAlerts(status, msg){   
    Swal.fire({
        position: 'center',
        icon: status,
        title: msg,
        showConfirmButton: false,
        timer: 1500
      });
}


function download(url, tipo) {
    axios({
        url: url,
        method: 'GET',
        responseType: 'blob'
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', tipo + '.jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}


function Notifications(message, status) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        confirmButton: true,
        confirmButtonText: 'Ok',
    })

    Toast.fire({
        icon: status,
        title: message
    }).then((result) => {
        return result;
    });
}