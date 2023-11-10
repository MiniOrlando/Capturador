$(document).ready(function() {
    console.log("Entrando en delete-maxmin.js");

    $(".delete").on('click', function(event) {
        event.preventDefault();

        var content = $(this).parents('.items');
        console.log(content);
        var codeContent = content.text().trimLeft();
        //text = text.replace(/ /gi, '');
        var cCode = codeContent.split(' ')[0];
        console.log(cCode);

        Swal.fire({
            title: "¿Eliminar registro?",
            text: "No podrás recuperarlo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        })
        .then((value) => {
            console.log('value: '+value.value);
            if (value.value == true) {
                $.ajax({
                    url: '/eliminarDatosMM',
                    type: 'POST',
                    data: {
                        cCodigo: cCode
                    },
                    success: function(response) {
                        console.log('Se envió la info a eliminar :D');

                        Swal.fire({
                            title: response.data.alertTitle,
                            text: response.data.alertText,
                            icon: response.data.alertIcon,
                            timer: 1500
                        });

                        content.remove();
                    }
                });
            } 
        });
    });
});