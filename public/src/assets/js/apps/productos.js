$(document).ready(function() {
    console.log('entró en productos.js');
    
    checkall('contact-check-all', 'contact-chkbox');
  
    $('#input-search').on('keyup', function() {
      var rex = new RegExp($(this).val(), 'i');
        $('.searchable-items .items:not(.items-header-section)').hide();
        $('.searchable-items .items:not(.items-header-section)').filter(function() {
            return rex.test($(this).text());
        }).show();
    });
  
    $('.view-grid').on('click', function(event) {
      event.preventDefault();
  
      $(this).parents('.switch').find('.view-list').removeClass('active-view');
      $(this).addClass('active-view');
  
      $(this).parents('.searchable-container').removeClass('list');
      $(this).parents('.searchable-container').addClass('grid');
  
      $(this).parents('.searchable-container').find('.searchable-items').removeClass('list');
      $(this).parents('.searchable-container').find('.searchable-items').addClass('grid');
  
    });
  
    $('.view-list').on('click', function(event) {
      event.preventDefault();
      $(this).parents('.switch').find('.view-grid').removeClass('active-view');
      $(this).addClass('active-view');
  
      $(this).parents('.searchable-container').removeClass('grid');
      $(this).parents('.searchable-container').addClass('list');
  
      $(this).parents('.searchable-container').find('.searchable-items').removeClass('grid');
      $(this).parents('.searchable-container').find('.searchable-items').addClass('list');
    });
  
    function deleteContact() {
      $(".delete").on('click', function(event) {
        //event.preventDefault();
        console.log("Click en eliminar");
        //$(this).parents('.items').remove();
        var content = $(this).parents('.items');
        console.log(content);
        var codeContent = content.text().trimLeft();
        //text = text.replace(/ /gi, '');
        console.log(codeContent);
        var cCode = codeContent.split(' ')[0];
        var regex = /^[0-9]*$/; // a regex that matches only numbers
        var str = "abc123def"; // a string to test
        var cCode = cCode.replace(/[^0-9]/g, ""); // a string that contains only numbers and delete
        //console.log(result); // 123

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
    }
  
    function addMaxMin() {
      $("#btn-add-maxmin").click(function() {
        var getParent = $(this).parents('.modal-content');
  
        var $_codigo = getParent.find('#c-codigo');
        var $_canasta = getParent.find('#c-canasta');
        var $_catalogo = getParent.find('#c-catalogo');
        var $_maxCjsC = getParent.find('#c-maxCjsC');
        var $_minCjsC = getParent.find('#c-minCjsC');
        var $_maxCjsM = getParent.find('#c-maxCjsM');
        var $_minPzsM = getParent.find('#c-minPzsM');
        
        var $_getValidationField = document.getElementsByClassName('validation-text');
        
        var $_codigoValue = $_codigo.val();
        var $_canastaValue = $_canasta.val();
        var $_catalogoValue = $_catalogo.val();
        var $_maxCjsCValue = $_maxCjsC.val();
        var $_minCjsCValue = $_minCjsC.val();
        var $_maxCjsMValue = $_maxCjsM.val();
        var $_minPzsMValue = $_minPzsM.val();

        console.log("canasta value: "+$_canastaValue);
        console.log("catalogo value: "+$_catalogoValue);
        console.log("_maxCjsCValue: "+$_maxCjsCValue);
        console.log("_minCjsCValue: "+$_minCjsCValue);
        console.log("_maxCjsMValue: "+$_maxCjsMValue);
        console.log("_minPzsMValue: "+$_minPzsMValue);
  
        /*if ($_codigoValue == "") {
          $_getValidationField[0].innerHTML = 'Artículo no puede estar vacío';
          $_getValidationField[0].style.display = 'block';
        } else {
          $_getValidationField[0].style.display = 'none';
        }
  
        if ($_canastaValue == "Selecciona una opción") {
          $_getValidationField[1].innerHTML = 'Debes seleccionar una opción';
          $_getValidationField[1].style.display = 'block';
        } else {
          $_getValidationField[1].style.display = 'none';
        }
  
        if ($_catalogoValue == "Selecciona una opción") {
          $_getValidationField[2].innerHTML = 'Debes seleccionar una opción';
          $_getValidationField[2].style.display = 'block';
        } else {
          $_getValidationField[2].style.display = 'none';
        }
  
        if ($_maxCjsCValue == "") {
          $_getValidationField[3].innerHTML = 'Máximo de cajas no puede estar vacío';
          $_getValidationField[3].style.display = 'block';
        } else {
          $_getValidationField[3].style.display = 'none';
        }
  
        if ($_minCjsCValue == "") {
          $_getValidationField[4].innerHTML = 'Mínimo de cajas no puede estar vacío';
          $_getValidationField[4].style.display = 'block';
        } else {
          $_getValidationField[4].style.display = 'none';
        }
  
        if ($_maxCjsMValue == "") {
          $_getValidationField[5].innerHTML = 'Máximo de cajas no puede estar vacío';
          $_getValidationField[5].style.display = 'block';
        } else {
          $_getValidationField[5].style.display = 'none';
        }
  
        if ($_minPzsMValue == "") {
          $_getValidationField[6].innerHTML = 'Mínimo de cajas no puede estar vacío';
          $_getValidationField[6].style.display = 'block';
        } else {
          $_getValidationField[6].style.display = 'none';
        }*/
  
        /*if ($_codigoValue =="" || $_canastaValue == "" || $_catalogoValue == "" || $_maxCjsCValue == "" || $_minCjsCValue == "" || $_maxCjsMValue == "" || $_minPzsMValue == "") {
          return false;
        }*/

        /*$html = '<div class="items">' +
                  '<div class="item-content">' +
                    '<div class="user-profile">' +
                      '<div class="n-chk align-self-center text-center">' +
                        '<div class="form-check form-check-primary me-0 mb-0">' +
                          '<input class="form-check-input inbox-chkbox contact-chkbox" type="checkbox">' +
                        '</div>' +
                      '</div>' +
                      '<div class="user-meta-info text-center">' +
                        '<p class="mm-codigo" data-codigo='+$_codigoValue+'>'+$_codigoValue+'</p>'+
                      '</div>'+
                    '</div>' +
                    '<div class="mm-canasta">' +
                      '<p class="info-title">Canasta básica: </p>' +
                      '<p class="cta-bca" data-canasta='+$_canastaValue +'>'+ $_canastaValue +'</p>' +
                    '</div>' +
                    '<div class="mm-catalogo">' +
                      '<p class="info-title">Artículo catálogo servicio: </p>' +
                      '<p class="art-cat-serv" data-catalogo='+$_catalogoValue +'>'+ $_catalogoValue +'</p>' +
                    '</div>' +
                    '<div class="mm-max_cajas_c">' +
                      '<p class="info-title">Max Cajas (C): </p>' +
                      '<p class="max-cjs-c" data-max_cajas_c='+ $_maxCjsCValue +'>'+ $_maxCjsCValue +'</p>' +
                    '</div>' +
                    '<div class="mm-min_cajas_c">' +
                      '<p class="info-title">Min Cajas (C): </p>' +
                      '<p class="min-cjs-c" data-min_cajas_c='+ $_minCjsCValue +'>'+ $_minCjsCValue +'</p>' +
                    '</div>' +
                    '<div class="mm-max_cajas_m">' +
                      '<p class="info-title">Max Cajas (M): </p>' +
                      '<p class="max-cjs-m" data-max_cajas_m='+ $_maxCjsMValue +'>'+ $_maxCjsMValue +'</p>' +
                    '</div>' +
                    '<div class="mm-min_pzs_m">' +
                      '<p class="info-title">Min Piezas (M): </p>' +
                      '<p class="min-pzs-m" data-min_pzs_m='+ $_minPzsMValue +'>'+ $_minPzsMValue +'</p>' +
                    '</div>' +
                    '<div class="action-btn">' +
                      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 edit"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>'+
                      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2  delete"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>'
                    '</div>' +
                  '</div>' +
                '</div>';
  
        $(".searchable-items > .items-header-section").after($html);
        $('#addContactModal').modal('hide');*/

        /*var $_setCodigoValueEmpty = $_codigo.val('');
        //var $_setCanastaValueEmpty = $_canasta.val(0);
        //var $_setCatalogoValueEmpty = $_catalogo.val 
        $_canasta.val("Selecciona una opción");
        $_catalogo.val("Selecciona una opción");
        var $_setMaxCjsCValueEmpty = $_maxCjsC.val('');
        var $_setMinCjsCValueEmpty = $_minCjsC.val('');
        var $_setMaxCjsMValueEmpty = $_maxCjsM.val('');
        var $_setMinPzsMValueEmpty = $_minPzsM.val('');*/
  
        deleteContact();
        editMaxMin();
        checkall('contact-check-all', 'contact-chkbox');
      });  
    }
  
    $('#addContactModal').on('hidden.bs.modal', function (e) {
        var $_codigo = document.getElementById('c-codigo');
        var $_canasta = document.getElementById('c-canasta');
        var $_catalogo = document.getElementById('c-catalogo');
        var $_maxCjsC = document.getElementById('c-maxCjsC');
        var $_minCjsC = document.getElementById('c-minCjsC');
        var $_maxCjsM = document.getElementById('c-maxCjsM');
        var $_minPzsM = document.getElementById('c-minPzsM');
        var $_getValidationField = document.getElementsByClassName('validation-text');
  
        var $_setCodigoValueEmpty = $_codigo.value = '';
        var $_setCanastaValueEmpty = $_canasta.value = 'Selecciona una opción';
        var $_setCatalogoValueEmpty = $_catalogo.value = 'Selecciona una opción';
        var $_setMaxCjsCValueEmpty = $_maxCjsC.value = '';
        var $_setMinCjsCValueEmpty = $_minCjsC.value = '';
        var $_setMaxCjsMValueEmpty = $_maxCjsM.value = '';
        var $_setMinPzsMValueEmpty = $_minPzsM.value = '';
  
        for (var i = 0; i < $_getValidationField.length; i++) {
          e.preventDefault();
          $_getValidationField[i].style.display = 'none';
        }
    })
  
    function editMaxMin() {
      $('.edit').on('click', function(event) {
        $('#addContactModal #btn-add').hide();
        $('#addContactModal #btn-edit').show();
  
        // Get Parents
        var getParentItem = $(this).parents('.items');
        var getModal = $('#addContactModal');
  
        // Get List Item Fields
        var $_codigo = getParentItem.find('.mm-codigo');
        var $_canasta = getParentItem.find('.cta-bca');
        var $_catalogo = getParentItem.find('.art-cat-serv');
        var $_maxCjsC = getParentItem.find('.max-cjs-c');
        var $_minCjsC = getParentItem.find('.min-cjs-c');
        var $_maxCjsM = getParentItem.find('.max-cjs-m');
        var $_minPzsM = getParentItem.find('.min-pzs-m');
        
        // Get Attributes
        var $_codigoAttrValue = $_codigo.attr('data-codigo');
        var $_canastaAttrValue = $_canasta.attr('data-canasta');
        var $_catalogoAttrValue = $_catalogo.attr('data-catalogo');
        var $_maxCjsCAttrValue = $_maxCjsC.attr('data-max_cajas_c');
        var $_minCjsCAttrValue = $_minCjsC.attr('data-min_cajas_c');
        var $_maxCjsMAttrValue = $_maxCjsM.attr('data-max_cajas_m');
        var $_minPzsMAttrValue = $_minPzsM.attr('data-min_pzs_m');

        console.log('3. _codigoAttrValue: '+$_codigoAttrValue);
        console.log('3. _canastaAttrValue: '+$_canastaAttrValue);
        console.log('3. _catalogoAttrValue: '+$_catalogoAttrValue);
        console.log('3. _maxCjsCAttrValue: '+$_maxCjsCAttrValue);
        console.log('3. _minCjsCAttrValue: '+$_minCjsCAttrValue);
        console.log('3. _maxCjsMAttrValue: '+$_maxCjsMAttrValue);
        console.log('3. _minPzsMAttrValue: '+$_minPzsMAttrValue);
        console.log('- - - - - - - - - - - - - - - - - - - - - -');
  
        // Get Modal Attributes
        var $_getModalCodigoInput = getModal.find('#c-codigo');
        var $_getModalCanastaInput = getModal.find('#c-canasta');
        var $_getModalCatalogoInput = getModal.find('#c-catalogo');
        var $_getModalMaxCjsCInput = getModal.find('#c-maxCjsC');
        var $_getModalMinCjsCInput = getModal.find('#c-minCjsC');
        var $_getModalMaxCjsMInput = getModal.find('#c-maxCjsM');
        var $_getModalMinPzsMInput = getModal.find('#c-minPzsM');
  
        // Set Modal Field's Value
        var $_setModalCodigoValue = $_getModalCodigoInput.val($_codigoAttrValue);
        var $_setModalCanastaValue = $_getModalCanastaInput.val($_canastaAttrValue);
        var $_setModalCatalogoValue = $_getModalCatalogoInput.val($_catalogoAttrValue);
        var $_setModalMaxCjsCValue = $_getModalMaxCjsCInput.val($_maxCjsCAttrValue);
        var $_setModalMinCjsCValue = $_getModalMinCjsCInput.val($_minCjsCAttrValue);
        var $_setModalMaxCjsMValue = $_getModalMaxCjsMInput.val($_maxCjsMAttrValue);
        var $_setModalMinPzsMValue = $_getModalMinPzsMInput.val($_minPzsMAttrValue);
        
        $('#addContactModal').modal('show');
  
        $("#btn-edit").off('click').click(function(){
  
          var getParent = $(this).parents('.modal-content');
  
          var $_getInputCodigo = getParent.find('#c-codigo');
          var $_getInputCanasta = getParent.find('#c-canasta');
          var $_getInputCatalogo = getParent.find('#c-catalogo');
          var $_getInputMaxCjsC = getParent.find('#c-maxCjsC');
          var $_getInputMinCjsC = getParent.find('#c-minCjsC');
          var $_getInputMaxCjsM = getParent.find('#c-maxCjsM');
          var $_getInputMinPzsM = getParent.find('#c-minPzsM');
  
          var $_codigoValue = $_getInputCodigo.val();
          var $_canastaValue = $_getInputCanasta.val();
          var $_catalogoValue = $_getInputCatalogo.val();
          var $_maxCjsCValue = $_getInputMaxCjsC.val();
          var $_minCjsCValue = $_getInputMinCjsC.val();
          var $_maxCjsMValue = $_getInputMaxCjsM.val();
          var $_minPzsMValue = $_getInputMinPzsM.val();

          console.log('- - - - - - - - - - - - - - - - - - - - - -');
          console.log('5. _codigoValue: '+$_codigoValue);
          console.log('5. _canastaValue: '+$_canastaValue);
          console.log('5. _catalogoValue: '+$_catalogoValue);
          console.log('5. _maxCjsCValue: '+$_maxCjsCValue);
          console.log('5. _minCjsCValue: '+$_minCjsCValue);
          console.log('5. _maxCjsMValue: '+$_maxCjsMValue);
          console.log('5. _minPzsMValue: '+$_minPzsMValue);
          console.log('- - - - - - - - - - - - - - - - - - - - - -');
  
          $.ajax({
            url: '/editarDatosMM',
            type: 'POST',
            data: { 
                cCodigo: $_codigoValue,
                cCanasta: $_canastaValue,
                cCatalogo: $_catalogoValue,
                cMaxCjsC: $_maxCjsCValue,
                cMinCjsC: $_minCjsCValue,
                cMaxCjsM: $_maxCjsMValue,
                cMinPzsM: $_minPzsMValue
            },
            success: function(response) {
                console.log('Se envió la información a editar:D');

                var  setUpdatedCodigoValue = $_codigo.text($_codigoValue);
                var  setUpdatedCanastaValue = $_canasta.text($_canastaValue);
                var  setUpdatedCatalogoValue = $_catalogo.text($_catalogoValue);
                var  setUpdatedMaxCjsCValue = $_maxCjsC.text($_maxCjsCValue);
                var  setUpdatedMinCjsCValue = $_minCjsC.text($_minCjsCValue);
                var  setUpdatedMaxCjsMValue = $_maxCjsM.text($_maxCjsMValue);
                var  setUpdatedMinPzsMValue = $_minPzsM.text($_minPzsMValue);
        
                var  setUpdatedAttrCodigoValue = $_codigo.attr('data-codigo', $_codigoValue);
                var  setUpdatedAttrCanastaValue = $_canasta.attr('data-canasta', $_canastaValue);
                var  setUpdatedAttrCatalogoValue = $_catalogo.attr('data-catalogo', $_catalogoValue);
                var  setUpdatedAttrMaxCjsCValue = $_maxCjsC.attr('data-max_cajas_c', $_maxCjsCValue);
                var  setUpdatedAttrMinCjsCValue = $_minCjsC.attr('data-min_cajas_c', $_minCjsCValue);
                var  setUpdatedAttrMaxCjsMValue = $_maxCjsM.attr('data-max_cajas_m', $_maxCjsMValue);
                var  setUpdatedAttrMinPzsMValue = $_minPzsM.attr('data-min_pzs_m', $_minPzsMValue);
                $('#addContactModal').modal('hide');
                Swal.fire({
                    title: response.data.alertTitle,
                    text: response.data.alertText,
                    icon: response.data.alertIcon
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                Swal.fire({
                    title: textStatus,
                    text: errorThrown,
                    icon: "error"
                });
            }
          });
          var  setUpdatedCodigoValue = $_codigo.text($_codigoValue);
          var  setUpdatedCanastaValue = $_canasta.text($_canastaValue);
          var  setUpdatedCatalogoValue = $_catalogo.text($_catalogoValue);
          var  setUpdatedMaxCjsCValue = $_maxCjsC.text($_maxCjsCValue);
          var  setUpdatedMinCjsCValue = $_minCjsC.text($_minCjsCValue);
          var  setUpdatedMaxCjsMValue = $_maxCjsM.text($_maxCjsMValue);
          var  setUpdatedMinPzsMValue = $_minPzsM.text($_minPzsMValue);
  
          var  setUpdatedAttrCodigoValue = $_codigo.attr('data-codigo', $_codigoValue);
          var  setUpdatedAttrCanastaValue = $_canasta.attr('data-canasta', $_canastaValue);
          var  setUpdatedAttrCatalogoValue = $_catalogo.attr('data-catalogo', $_catalogoValue);
          var  setUpdatedAttrMaxCjsCValue = $_maxCjsC.attr('data-max_cajas_c', $_maxCjsCValue);
          var  setUpdatedAttrMinCjsCValue = $_minCjsC.attr('data-min_cajas_c', $_minCjsCValue);
          var  setUpdatedAttrMaxCjsMValue = $_maxCjsM.attr('data-max_cajas_m', $_maxCjsMValue);
          var  setUpdatedAttrMinPzsMValue = $_minPzsM.attr('data-min_pzs_m', $_minPzsMValue);
          $('#addContactModal').modal('hide');
        });
      })
    }
  
    $(".delete-multiple").on("click", function() {
      var inboxCheckboxParents = $(".contact-chkbox:checked").parents('.items');   
      inboxCheckboxParents.remove();
    });
  
    deleteContact();
    addMaxMin();
    editMaxMin();
  })
