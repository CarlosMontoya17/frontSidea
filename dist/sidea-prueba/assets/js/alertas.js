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

    })

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

function edit() {
    var text_title = "Scrivi qualcosa";
    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();

    img.crossOrigin = "anonymous";

    var img2 = new Image();
    img2.src = 'http://ampark.it/roshelle/logo-dualipa.png';



    window.addEventListener('load', DrawPlaceholder)

    function DrawPlaceholder() {
        img.onload = function () {
            DrawOverlay(img);
            DrawText();
            DynamicText(img)
        };
        img.src = 'https://picsum.photos/500/500/?random';

    }
    function DrawOverlay(img) {
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = "transparent";
        ctx.fillStyle = 'rgba(30, 144, 255, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height); 
 }



    function DrawText() {
        ctx.fillStyle = "white";
        ctx.textBaseline = 'middle';
        ctx.font = "50px 'Montserrat'";
        if (text_title != "Scrivi qualcosa") {
            ctx.strokeText('', 50, 50);
        } else {
            ctx.strokeText(text_title, 50, 50);
       
        }

    }

    function DynamicText(img) {
        document.getElementById('name').addEventListener('keyup', function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            DrawOverlay(img);
            DrawText();
            text_title = this.value;
            if (text_title.length > 25) {
                ctx.font = "20px 'Montserrat'";
            } else if (text_title.length > 19) {
                ctx.font = "30px 'Montserrat'";
            } else if (text_title.length > 15) {
                ctx.font = "40px 'Montserrat'";
            }

            ctx.fillText(text_title, 50, 50);
        });
    }

    function handleImage(e) {
        var reader = new FileReader();
        var img = "";
        var src = "";
        reader.onload = function (event) {
            img = new Image();
            img.onload = function () {
                canvas.width = 500;
                canvas.height = 500;
                ctx.drawImage(img, 0, 0);
                drawImageProp(ctx, this, 0, 0, canvas.width, canvas.height, 0.5, 0.5);
            }
            img.src = event.target.result;
            src = event.target.result;
            canvas.classList.add("show");
            DrawOverlay(img);
            DrawText();
            DynamicText(img);
        } 

        /*
        
        
        */ 

        reader.readAsDataURL(e.target.files[0]);

    }

    function convertToImage() {
        window.open(canvas.toDataURL('png'));
    }
    document.getElementById('download').onclick = function download() {
        convertToImage();
    }


    function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }

        /// default offset is center
        /*   
        textbox.show =  'hola mundo';
        textbox.show = ' helo world';
        txt.settext = '   ';
        
        */
        offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
        offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

        /// keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;

        var iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,   /// new prop. width
            nh = ih * r,   /// new prop. height
            cx, cy, cw, ch, ar = 1;

        /// decide which gap to fill    
        if (nw < w) ar = w / nw;
        if (nh < h) ar = h / nh;
        nw *= ar;
        nh *= ar;

        /// calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        /// make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        /// fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    }
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