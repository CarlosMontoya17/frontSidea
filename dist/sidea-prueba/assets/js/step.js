var stepper1 = new Stepper(document.querySelector('#stepper1'));
var form = document.querySelector('form');
var validFormFeedback = document.querySelector('#test-l-3 .valid-feedback');
var inValidFormFeedback = document.querySelector('#test-l-3 .invalid-feedback');

form.addEventListener('submit', function(event) {
  form.classList.remove('was-validated');
  inValidFormFeedback.classList.remove('d-block');
  validFormFeedback.classList.remove('d-block');
  
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    inValidFormFeedback.classList.add('d-block');
  } else {
    validFormFeedback.classList.add('d-block');
  }

  form.classList.add('was-validated');
}, false);