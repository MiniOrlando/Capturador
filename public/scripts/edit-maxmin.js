$(document).ready(function() {
    console.log('entrando en edit-maxmin.js')
    $('.edit').on('click', function(event) {
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

        console.log('4. _codigoAttrValue: '+$_codigoAttrValue);
        console.log('4. _canastaAttrValue: '+$_canastaAttrValue);
        console.log('4. _catalogoAttrValue: '+$_catalogoAttrValue);
        console.log('4. _maxCjsCAttrValue: '+$_maxCjsCAttrValue);
        console.log('4. _minCjsCAttrValue: '+$_minCjsCAttrValue);
        console.log('4. _maxCjsMAttrValue: '+$_maxCjsMAttrValue);
        console.log('4. _minPzsMAttrValue: '+$_minPzsMAttrValue);

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
            console.log('6. _codigoValue: '+$_codigoValue);
            console.log('6. _canastaValue: '+$_canastaValue);
            console.log('6. _catalogoValue: '+$_catalogoValue);
            console.log('6. _maxCjsCValue: '+$_maxCjsCValue);
            console.log('6. _minCjsCValue: '+$_minCjsCValue);
            console.log('6. _maxCjsMValue: '+$_maxCjsMValue);
            console.log('6. _minPzsMValue: '+$_minPzsMValue);
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
        });
    });
});
    