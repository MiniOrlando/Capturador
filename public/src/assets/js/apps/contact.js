$(document).ready(function() {
  console.log('entró en contact.js')

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
    /* Act on the event */

    $(this).parents('.switch').find('.view-list').removeClass('active-view');
    $(this).addClass('active-view');

    $(this).parents('.searchable-container').removeClass('list');
    $(this).parents('.searchable-container').addClass('grid');

    $(this).parents('.searchable-container').find('.searchable-items').removeClass('list');
    $(this).parents('.searchable-container').find('.searchable-items').addClass('grid');

  });

  $('.view-list').on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    $(this).parents('.switch').find('.view-grid').removeClass('active-view');
    $(this).addClass('active-view');

    $(this).parents('.searchable-container').removeClass('grid');
    $(this).parents('.searchable-container').addClass('list');

    $(this).parents('.searchable-container').find('.searchable-items').removeClass('grid');
    $(this).parents('.searchable-container').find('.searchable-items').addClass('list');
  });

  function deleteContact() {
    $(".delete").on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      $(this).parents('.items').remove();
    });
  }

  function addMaxMin() {
    $("#btn-add-maxmin").click(function() {

      var getParent = $(this).parents('.modal-content');

      var $_codigo = getParent.find('#c-codigo');
      var $_venta = getParent.find('#c-vta-prom');
      var $_canasta = getParent.find('#c-canasta');
      var $_catalogo = getParent.find('#c-catalogo');
      var $_maxCjsC = getParent.find('#c-maxCjsC');
      var $_minCjsC = getParent.find('#c-minCjsC');
      var $_maxCjsM = getParent.find('#c-maxCjsM');
      var $_minPzsM = getParent.find('#c-minPzsM');
      
      var $_getValidationField = document.getElementsByClassName('validation-text');
      var reg = /^.+@[^\.].*\.[a-z]{2,}$/;
      var phoneReg = /^\d*\.?\d*$/;

      var $_codigoValue = $_codigo.val();
      var $_ventaValue = $_venta.val();
      var $_canastaValue = $_canasta.val();
      var $_catalogoValue = $_catalogo.val();
      var $_maxCjsCValue = $_maxCjsC.val();
      var $_minCjsCValue = $_minCjsC.val();
      var $_maxCjsMValue = $_maxCjsM.val();
      var $_minPzsMValue = $_minPzsM.val();

      if ($_codigoValue == "") {
        $_getValidationField[0].innerHTML = 'Artículo no puede estar vacío';
        $_getValidationField[0].style.display = 'block';
      } else {
        $_getValidationField[0].style.display = 'none';
      }

      /*if ($_ventaValue == "Venta promedio en cajas") {
        $_getValidationField[1].innerHTML = 'Debes validar el artículo';
        $_getValidationField[1].style.display = 'block';
      } else {
        $_getValidationField[1].style.display = 'none';
      }*/

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
      }

      // VALIDACIONES POR VALOR
      if ($_maxCjsCValue == "0") {
        $_getValidationField[3].innerHTML = 'Máximo de cajas no puede ser 0';
        $_getValidationField[3].style.display = 'block';
      } else {
        $_getValidationField[3].style.display = 'none';
      }

      if ($_codigoValue =="" || $_canastaValue == "" || $_catalogoValue == "" || $_maxCjsCValue == "" || $_maxCjsCValue == "0" || $_minCjsCValue == "" || $_maxCjsMValue == "" || $_minPzsMValue == "") {
        return false;
      }

      /*if ($_nameValue == "") {
        $_getValidationField[0].innerHTML = 'Name must be filled out';
        $_getValidationField[0].style.display = 'block';
      } else {
        $_getValidationField[0].style.display = 'none';
      }

      if ($_emailValue == "") {
        $_getValidationField[1].innerHTML = 'Email Id must be filled out';
        $_getValidationField[1].style.display = 'block';
      } else if((reg.test($_emailValue) == false)) {
        $_getValidationField[1].innerHTML = 'Invalid Email';
        $_getValidationField[1].style.display = 'block';
      } else {
        $_getValidationField[1].style.display = 'none';
      }

      if ($_phoneValue == "") {
        $_getValidationField[2].innerHTML = 'Invalid (Enter 10 Digits)';
        $_getValidationField[2].style.display = 'block';
      } else if((phoneReg.test($_phoneValue) == false)) {
        $_getValidationField[2].innerHTML = 'Please Enter A numeric value';
        $_getValidationField[2].style.display = 'block';
      } else {
        $_getValidationField[2].style.display = 'none';
      }

      if ($_nameValue == "" || $_emailValue == "" || (reg.test($_emailValue) == false) || $_phoneValue == "" || (phoneReg.test($_phoneValue) == false)) {
        return false;
      }*/

      $html = '<div class="items">' +
                '<div class="item-content">' +
                  '<div class="user-profile">' +
                    '<div class="n-chk align-self-center text-center">' +
                      '<div class="form-check form-check-primary me-0 mb-0">' +
                        '<input class="form-check-input inbox-chkbox contact-chkbox" type="checkbox">' +
                      '</div>' +
                    '</div>' +
                    '<div class="user-meta-info text-center">' +
                      '<p class="mm-codigo" data-name='+$_codigoValue+'>'+$_codigoValue+'</p>'+
                    '</div>'+
                  '</div>' +
                  '<div class="mm-canasta">' +
                    '<p class="info-title">Canasta básica: </p>' +
                    '<p class="usr-email-addr" data-email='+ $_canastaValue +'>'+ $_canastaValue +'</p>' +
                  '</div>' +
                  '<div class="mm-catalogo">' +
                    '<p class="info-title">Artículo catálogo servicio: </p>' +
                    '<p class="usr-location" data-location='+ $_catalogoValue +'>'+ $_catalogoValue +'</p>' +
                  '</div>' +
                  '<div class="user-phone">' +
                    '<p class="info-title">Max Cajas (C): </p>' +
                    '<p class="usr-ph-no" data-phone='+ $_maxCjsCValue +'>'+ $_maxCjsCValue +'</p>' +
                  '</div>' +
                  '<div class="user-phone">' +
                    '<p class="info-title">Min Cajas (C): </p>' +
                    '<p class="usr-ph-no" data-phone='+ $_minCjsCValue +'>'+ $_minCjsCValue +'</p>' +
                  '</div>' +
                  '<div class="user-phone">' +
                    '<p class="info-title">Max Cajas (M): </p>' +
                    '<p class="usr-ph-no" data-phone='+ $_maxCjsMValue +'>'+ $_maxCjsMValue +'</p>' +
                  '</div>' +
                  '<div class="user-phone">' +
                    '<p class="info-title">Min Piezas (M): </p>' +
                    '<p class="usr-ph-no" data-phone='+ $_minPzsMValue +'>'+ $_minPzsMValue +'</p>' +
                  '</div>' +
                  '<div class="action-btn">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 edit"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>'+
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2  delete"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>'
                  '</div>' +
                '</div>' +
              '</div>';

        $(".searchable-items > .items-header-section").after($html);
        $('#addContactModal').modal('hide');

        var $_setCodigoValueEmpty = $_codigo.val('');
        var $_setCanastaValueEmpty = $_canasta.val('Seleccione una opción');
        var $_setCatalogoValueEmpty = $_catalogo.val('Seleccione una opción');
        var $_setMaxCjsCValueEmpty = $_maxCjsC.val('');
        var $_setMinCjsCValueEmpty = $_minCjsC.val('');
        var $_setMaxCjsMValueEmpty = $_maxCjsM.val('');
        var $_setMinPzsMValueEmpty = $_minPzsM.val('');

      deleteContact();
      editContact();
      checkall('contact-check-all', 'contact-chkbox');
    });  
  }

  $('#addContactModal').on('hidden.bs.modal', function (e) {
      var $_name = document.getElementById('c-name');
      var $_email = document.getElementById('c-email');
      var $_occupation = document.getElementById('c-occupation');
      var $_phone = document.getElementById('c-phone');
      var $_location = document.getElementById('c-location');
      var $_getValidationField = document.getElementsByClassName('validation-text');

      var $_setNameValueEmpty = $_name.value = '';
      var $_setEmailValueEmpty = $_email.value = '';
      var $_setOccupationValueEmpty = $_occupation.value = '';
      var $_setPhoneValueEmpty = $_phone.value = '';
      var $_setLocationValueEmpty = $_location.value = '';

      for (var i = 0; i < $_getValidationField.length; i++) {
        e.preventDefault();
        $_getValidationField[i].style.display = 'none';
      }
  })

  function editContact() {
    $('.edit').on('click', function(event) {
      $('#addContactModal #btn-add').hide();
      $('#addContactModal #btn-edit').show();

      // Get Parents
      var getParentItem = $(this).parents('.items');
      var getModal = $('#addContactModal');

      // Get List Item Fields
      var $_name = getParentItem.find('.user-name');
      var $_email = getParentItem.find('.usr-email-addr');
      var $_occupation = getParentItem.find('.user-work');
      var $_phone = getParentItem.find('.usr-ph-no');
      var $_location = getParentItem.find('.usr-location');

      // Get Attributes
      var $_nameAttrValue = $_name.attr('data-name');
      var $_emailAttrValue = $_email.attr('data-email');
      var $_occupationAttrValue = $_occupation.attr('data-occupation');
      var $_phoneAttrValue = $_phone.attr('data-phone');
      var $_locationAttrValue = $_location.attr('data-location');

      // Get Modal Attributes
      var $_getModalNameInput = getModal.find('#c-name');
      var $_getModalEmailInput = getModal.find('#c-email');
      var $_getModalOccupationInput = getModal.find('#c-occupation');
      var $_getModalPhoneInput = getModal.find('#c-phone');
      var $_getModalLocationInput = getModal.find('#c-location');

      // Set Modal Field's Value
      var $_setModalNameValue = $_getModalNameInput.val($_nameAttrValue);
      var $_setModalEmailValue = $_getModalEmailInput.val($_emailAttrValue);
      var $_setModalOccupationValue = $_getModalOccupationInput.val($_occupationAttrValue);
      var $_setModalPhoneValue = $_getModalPhoneInput.val($_phoneAttrValue);
      var $_setModalLocationValue = $_getModalLocationInput.val($_locationAttrValue);

      $('#addContactModal').modal('show');

      $("#btn-edit").off('click').click(function(){

        var getParent = $(this).parents('.modal-content');

        var $_getInputName = getParent.find('#c-name');
        var $_getInputNmail = getParent.find('#c-email');
        var $_getInputNccupation = getParent.find('#c-occupation');
        var $_getInputNhone = getParent.find('#c-phone');
        var $_getInputNocation = getParent.find('#c-location');


        var $_nameValue = $_getInputName.val();
        var $_emailValue = $_getInputNmail.val();
        var $_occupationValue = $_getInputNccupation.val();
        var $_phoneValue = $_getInputNhone.val();
        var $_locationValue = $_getInputNocation.val();

        var  setUpdatedNameValue = $_name.text($_nameValue);
        var  setUpdatedEmailValue = $_email.text($_emailValue);
        var  setUpdatedOccupationValue = $_occupation.text($_occupationValue);
        var  setUpdatedPhoneValue = $_phone.text($_phoneValue);
        var  setUpdatedLocationValue = $_location.text($_locationValue);

        var  setUpdatedAttrNameValue = $_name.attr('data-name', $_nameValue);
        var  setUpdatedAttrEmailValue = $_email.attr('data-email', $_emailValue);
        var  setUpdatedAttrOccupationValue = $_occupation.attr('data-occupation', $_occupationValue);
        var  setUpdatedAttrPhoneValue = $_phone.attr('data-phone', $_phoneValue);
        var  setUpdatedAttrLocationValue = $_location.attr('data-location', $_locationValue);
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
  editContact();
})


// Validation Process

/*var $_getValidationField = document.getElementsByClassName('validation-text');
var reg = /^.+@[^\.].*\.[a-z]{2,}$/;
var phoneReg = /^\d{10}$/;

getNameInput = document.getElementById('c-name');

getNameInput.addEventListener('input', function() {

  getNameInputValue = this.value;

  if (getNameInputValue == "") {
    $_getValidationField[0].innerHTML = 'Name Required';
    $_getValidationField[0].style.display = 'block';
  } else {
    $_getValidationField[0].style.display = 'none';
  }

})


getEmailInput = document.getElementById('c-email');

getEmailInput.addEventListener('input', function() {

    getEmailInputValue = this.value;

    if (getEmailInputValue == "") {
      $_getValidationField[1].innerHTML = 'Email Required';
      $_getValidationField[1].style.display = 'block';
    } else if((reg.test(getEmailInputValue) == false)) {
      $_getValidationField[1].innerHTML = 'Invalid Email';
      $_getValidationField[1].style.display = 'block';
    } else {
      $_getValidationField[1].style.display = 'none';
    }

})

getPhoneInput = document.getElementById('c-phone');

getPhoneInput.addEventListener('input', function() {

  getPhoneInputValue = this.value;

  if (getPhoneInputValue == "") {
    $_getValidationField[2].innerHTML = 'Phone Number Required';
    $_getValidationField[2].style.display = 'block';
  } else if((phoneReg.test(getPhoneInputValue) == false)) {
    $_getValidationField[2].innerHTML = 'Invalid (Enter 10 Digits)';
    $_getValidationField[2].style.display = 'block';
  } else {
    $_getValidationField[2].style.display = 'none';
  }

})
*/