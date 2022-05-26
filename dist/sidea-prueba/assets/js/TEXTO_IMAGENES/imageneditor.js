
function load(canvasId, file) {
  return new Promise((resolve, reject) => {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    var image = new Image();
    var reader = new FileReader();
    reader.onload = e => {
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(image);
      }
      image.src = e.target.result;
    }
    reader.readAsDataURL(file);
  });
}

function show(inputCanvasId, outputCanvasId) {
  let src = cv.imread(inputCanvasId);
  let dst = new cv.Mat();
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
  cv.imshow(outputCanvasId, dst);
  src.delete();
  dst.delete();
}

async function onChange(file) {
  await load('input', file);
  show('input', 'output');
}

let input = document.querySelector('input[type="file"]');
input.addEventListener('change', e => onChange(e.target.files[0]), false);
