//to enable full window
var lastTarget = null;

window.addEventListener("dragenter", function(e){ // drag start
    // unhide our red overlay
    showWrapper();
    lastTarget = e.target; // cache the last target here
});

window.addEventListener("dragleave", function (e) { // user canceled

    if(e.target === lastTarget || e.target === document)
    {
        hideWrapper();
    }

});

window.addEventListener("dragover", function (e) { //to stop default browser act
    e.preventDefault();
});

window.addEventListener("drop", function(e){

    e.preventDefault();
    hideWrapper();

    // if drop, we pass object file to dropzone
    var myDropzone = Dropzone.forElement(".dropzone");
    myDropzone.handleFiles(e.dataTransfer.files);

});


function hideWrapper() {
    document.querySelector(".wrapper").style.visibility = "hidden";
    document.querySelector(".wrapper").style.opacity = 0;
}

function showWrapper() {
    document.querySelector(".wrapper").style.visibility = "";
    document.querySelector(".wrapper").style.opacity = 0.5;
}


