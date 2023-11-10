$(document).ready(function() {
    console.log('Entrando en logout.js')
    $('.logout').on('click', function(event) {
        Swal.fire({
            title: "¿Desea cerrar sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Salir",
            cancelButtonText: "Cancelar",
        })
        .then((value) => {
            console.log('value: '+value.value);
            if (value.value == true) {
                $.ajax({
                    url: '/logout',
                    type: 'POST',
                    success: function(response) {
                        Swal.fire({
                            title: "¡Hasta pronto!",
                            icon: "success",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                        })
                    }
                })
            } 
        });
        
    });
});