$(document).ready(function() {
    console.log('entrando en storeMaxMin.js');

    $('#btn-add-maxmin').click(function() {
        //var cCodigo = $('#c-codigo').val();
        var cDescripcion = document.getElementById('c-descripcion').textContent;
        var cCodigo = document.getElementById('c-content-info-cod').textContent.split(" ")[3];
        var cPromedio = document.getElementById('c-content-info-prom').textContent.split(" ")[3];
        var cSubAlm = document.getElementById('c-content-info-sub').textContent.split(" ")[2];
        var cBarcode = document.getElementById('c-content-info-bar').textContent.split(" ")[3];
        //var cPromedio = document.getElementById('c-content-info').textContent.split(" ")[3];
        //var cProm = newContent[3];
        //var cCodigo = content[3];
        //console.log(content);
        console.log("cPromedio: "+cPromedio);
        //console.log("prom: "+prom);
        console.log("cCodigo: "+cCodigo);
        console.log("cSubAlm: "+cSubAlm);
        console.log("cBarcode: "+cBarcode);
        var cCanasta = $('#c-canasta').val();
        var cCatalogo = $('#c-catalogo').val();
        var cMaxCjsC = $('#c-maxCjsC').val();
        var cMinCjsC = $('#c-minCjsC').val();
        var cMaxCjsM = $('#c-maxCjsM').val();
        var cMinPzsM = $('#c-minPzsM').val();

        var getParent = $(this).parents('.modal-content');
  
        var $_codigo = getParent.find('#c-codigo');
        var $_canasta = getParent.find('#c-canasta');
        var $_catalogo = getParent.find('#c-catalogo');
        var $_maxCjsC = getParent.find('#c-maxCjsC');
        var $_minCjsC = getParent.find('#c-minCjsC');
        var $_maxCjsM = getParent.find('#c-maxCjsM');
        var $_minPzsM = getParent.find('#c-minPzsM');

        var $_getValidationField = document.getElementsByClassName('validation-text');

        if (cCodigo == "") {
            $_getValidationField[0].innerHTML = 'Artículo no puede estar vacío';
            $_getValidationField[0].style.display = 'block';
        } else {
            $_getValidationField[0].style.display = 'none';
        }
    
        if (cCanasta == "Selecciona una opción") {
            $_getValidationField[1].innerHTML = 'Debes seleccionar una opción';
            $_getValidationField[1].style.display = 'block';
        } else {
            $_getValidationField[1].style.display = 'none';
        }
    
        if (cCatalogo == "Selecciona una opción") {
            $_getValidationField[2].innerHTML = 'Debes seleccionar una opción';
            $_getValidationField[2].style.display = 'block';
        } else {
            $_getValidationField[2].style.display = 'none';
        }
    
        if (cMaxCjsC == "") {
            $_getValidationField[3].innerHTML = 'Máximo de cajas no puede estar vacío';
            $_getValidationField[3].style.display = 'block';
        } else {
            $_getValidationField[3].style.display = 'none';
        }
    
        if (cMinCjsC == "") {
            $_getValidationField[4].innerHTML = 'Mínimo de cajas no puede estar vacío';
            $_getValidationField[4].style.display = 'block';
        } else {
            $_getValidationField[4].style.display = 'none';
        }
    
        if (cMaxCjsM == "") {
            $_getValidationField[5].innerHTML = 'Máximo de cajas no puede estar vacío';
            $_getValidationField[5].style.display = 'block';
        } else {
            $_getValidationField[5].style.display = 'none';
        }

        if (cMinPzsM == "") {
            $_getValidationField[6].innerHTML = 'Mínimo de cajas no puede estar vacío';
            $_getValidationField[6].style.display = 'block';
        } else {
            $_getValidationField[6].style.display = 'none';
        }

        if (cCodigo =="" || cCanasta == "" || cCatalogo == "" || cMaxCjsC == "" || cMinCjsC == "" || cMaxCjsM == "" || cMinPzsM == "") {
            return false;
        }

        if (cMaxCjsC == "0" || cMaxCjsM == "0") {
            Swal.fire({
                title: "¡ERROR!",
                text: "Valores incorrectos",
                icon: "error"
            });
            return false;
        }

        $.ajax({
            url: '/guardarDatosMM',
            type: 'POST',
            data: { 
                cCodigo: cCodigo,
                cDescripcion: cDescripcion,
                cPromedio: cPromedio,
                cCanasta: cCanasta,
                cCatalogo: cCatalogo,
                cMaxCjsC: cMaxCjsC,
                cMinCjsC: cMinCjsC,
                cMaxCjsM: cMaxCjsM,
                cMinPzsM: cMinPzsM,
                cSubAlm: cSubAlm
            },
            success: function(response) {
                console.log('Se envió la información :D');
                var cardInfo = document.getElementsByClassName('info-box-3');
                cardInfo[0].style.display = 'none';

                $html = '<div class="items">' +
                            '<div class="item-content">' +
                                '<div class="user-profile">' +
                                    '<div class="n-chk align-self-center text-center">' +
                                        '<div class="form-check form-check-primary me-0 mb-0">' +
                                            '<input class="form-check-input inbox-chkbox contact-chkbox" type="checkbox">' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="user-meta-info">' +
                                        '<p class="mm-codigo" data-codigo= "'+cCodigo+' " >'+cCodigo+'</p>'+
                                    '</div>'+
                                '</div>' +
                                '<div class="mm-canasta">' +
                                    '<p class="info-title">Canasta básica: </p>' +
                                    '<p class="cta-bca" data-canasta='+cCanasta +'>'+cCanasta+'</p>' +
                                '</div>' +
                                '<div class="mm-catalogo">' +
                                    '<p class="info-title">Artículo catálogo servicio: </p>' +
                                    '<p class="art-cat-serv" data-catalogo='+cCatalogo+'>'+cCatalogo+'</p>' +
                                '</div>' +
                                '<div class="mm-max_cajas_c">' +
                                    '<p class="info-title">Max Cajas (C): </p>' +
                                    '<p class="max-cjs-c" data-max_cajas_c='+cMaxCjsC+'>'+cMaxCjsC+'</p>' +
                                '</div>' +
                                '<div class="mm-min_cajas_c">' +
                                    '<p class="info-title">Min Cajas (C): </p>' +
                                    '<p class="min-cjs-c" data-min_cajas_c='+cMinCjsC+'>'+cMinCjsC+'</p>' +
                                '</div>' +
                                '<div class="mm-max_cajas_m">' +
                                    '<p class="info-title">Max Cajas (M): </p>' +
                                    '<p class="max-cjs-m" data-max_cajas_m='+cMaxCjsM+'>'+cMaxCjsM+'</p>' +
                                '</div>' +
                                '<div class="mm-min_pzs_m">' +
                                    '<p class="info-title">Min Piezas (M): </p>' +
                                    '<p class="min-pzs-m" data-min_pzs_m='+cMinPzsM+'>'+cMinPzsM+'</p>' +
                                '</div>' +
                                '<div class="action-btn">' +
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 edit"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>'+
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2  delete"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>'
                                '</div>' +
                            '</div>' +
                        '</div>';
            
                if (response.data.addToList == true) {
                    $(".searchable-items > .items-header-section").after($html);
                }

                /*cCodigo.innerHTML = '';
                cCanasta.innerHTML = "Selecciona una opción";
                cCatalogo.innerHTML = "Selecciona una opción";
                cMaxCjsC.innerHTML = '';
                cMinCjsC.innerHTML = '';
                cMaxCjsM.innerHTML = '';
                cMinPzsM.innerHTML = '';*/
                var $_setCodigoValueEmpty = $_codigo.val('');
                $_canasta.val("Selecciona una opción");
                $_catalogo.val("Selecciona una opción");
                var $_setMaxCjsCValueEmpty = $_maxCjsC.val('');
                var $_setMinCjsCValueEmpty = $_minCjsC.val('');
                var $_setMaxCjsMValueEmpty = $_maxCjsM.val('');
                var $_setMinPzsMValueEmpty = $_minPzsM.val('');
                
                Swal.fire({
                    title: response.data.alertTitle,
                    text: response.data.alertText,
                    icon: response.data.alertIcon,
                    timer: 1500
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });
});
    