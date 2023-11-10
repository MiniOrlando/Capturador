$(document).ready(function() {
    console.log('entrando en maxmin-validators.js');

    document.getElementsByName("codigo")[0].addEventListener('input', function() {
        var $_getValidationField = document.getElementsByClassName('validation-text');
        var searchValue = $('#c-codigo').val();
        console.log('codigo: '+searchValue);
        if (searchValue == "") {
            $_getValidationField[0].innerHTML = 'Código no puede estar vacío';
            $_getValidationField[0].style.display = 'block';
        } else {
            $_getValidationField[0].style.display = 'none';
        }
    });

    document.getElementsByName("canasta")[0].addEventListener('change', function() {
        var $_getValidationField = document.getElementsByClassName('validation-text');
        var searchValue = $('#c-canasta').val();
        console.log('canasta: '+searchValue);
        if (searchValue != "") {
            $_getValidationField[1].style.display = 'none';
        }
    });

    document.getElementsByName("catalogo")[0].addEventListener('change', function() {
        var $_getValidationField = document.getElementsByClassName('validation-text');
        var searchValue = $('#c-catalogo').val();
        console.log('catalogo: '+searchValue);
        if (searchValue != "") {
            $_getValidationField[2].style.display = 'none';
        }
    });

    document.getElementsByName("maxCjsC")[0].addEventListener('input', function() {
        var $_getValidationField = document.getElementsByClassName('validation-text');
        var searchValue = $('#c-maxCjsC').val();
        console.log('maxCjsC: '+searchValue);
        if (searchValue == "") {
            $_getValidationField[3].innerHTML = 'Máximo de cajas no puede estar vacío';
            $_getValidationField[3].style.display = 'block';
        } else if (searchValue == "0") {
            $_getValidationField[3].innerHTML = 'Máximo de cajas no puede ser 0';
            $_getValidationField[3].style.display = 'block';
        } else {
            $_getValidationField[3].style.display = 'none';
        }
    });

    document.getElementsByName("minCjsC")[0].addEventListener('input', function() {
        var $_getValidationField = document.getElementsByClassName('validation-text');
        var searchValue = $('#c-minCjsC').val();
        console.log('minCjsC: '+searchValue);
        if (searchValue == "") {
            $_getValidationField[4].innerHTML = 'Mínimo de cajas no puede estar vacío';
            $_getValidationField[4].style.display = 'block';
        } else {
            $_getValidationField[4].style.display = 'none';
        }
    });

    document.getElementsByName("maxCjsM")[0].addEventListener('input', function() {
        var $_getValidationField = document.getElementsByClassName('validation-text');
        var searchValue = $('#c-maxCjsM').val();
        console.log('maxCjsM: '+searchValue);
        if (searchValue == "") {
            $_getValidationField[5].innerHTML = 'Máximo de cajas no puede estar vacío';
            $_getValidationField[5].style.display = 'block';
        } else if (searchValue == "0") {
            $_getValidationField[5].innerHTML = 'Máximo de cajas no puede ser 0';
            $_getValidationField[5].style.display = 'block';
        } else {
            $_getValidationField[5].style.display = 'none';
        }
    });

    document.getElementsByName("minPzsM")[0].addEventListener('input', function() {
        var $_getValidationField = document.getElementsByClassName('validation-text');
        var searchValue = $('#c-minPzsM').val();
        console.log('minPzsM: '+searchValue);
        if (searchValue == "") {
            $_getValidationField[6].innerHTML = 'Mínimo de piezas no puede estar vacío';
            $_getValidationField[6].style.display = 'block';
        } else {
            $_getValidationField[6].style.display = 'none';
        }
    });
});