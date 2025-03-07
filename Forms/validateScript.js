let inputField = document.getElementById("alpha");

//let send = document.getElementById("send");
//send.addEventListener("click", submit);

let form = document.getElementById('form');
form.addEventListener('submit', function(ev) {
    console.log('submit attempt');
    if (!checkNumeric(inputField.value)) {
        ev.preventDefault();
        console.log('Non-numeric input')
        alert('Non-numeric input');
    } else {
        alert('Input valid, form submitting');
        form.submit()
    }
})

function checkNumeric(input) {
    let regExpression = /^[a-zA-Z0-9]*$/;
    return regExpression.test(input);
}