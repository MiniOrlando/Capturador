$(document).ready(function() {
    console.log('entrando en auto-search.js');
    /* Event listener */
    document.getElementsByName("codigo")[0].addEventListener('input', function() {
        var dataProductos = [];
        var searchValue = $('#c-codigo').val();
        var sugerencias = document.getElementById('sugerencias');
        var $_getValidationField = document.getElementsByClassName('validation-text');
        
        if (searchValue != "") {
            $_getValidationField[0].style.display = 'none';
        }
        var url = '/getTopTenProductsData';
        $.ajax({
            url: url,
            type: 'POST',
            data: { searchValue: searchValue },
            success: function(data) {
                // Handle the response data here
                // Clear the suggestions div
                //suggestions.innerHTML = '';
                if (data.data.hayCoincidencias) {
                    sugerencias.style.display = 'block';
                    sugerencias.innerHTML = '';
                    for (let i = 0; i < data.data.productos.length; i++) {
                        dataProductos.push(data.data.productos[i].CveArt.trim()+" - "+data.data.productos[i].SubAlm.trim()+" - "+data.data.productos[i].Descripcion.trim());
                        console.log(dataProductos[i]);
                        
                        /*const suggestion = document.createElement('div');
                        suggestion.textContent = dataProductos[i];
                        suggestions.appendChild(suggestion);

                        if(searchValue == "") {
                            suggestions.innerHTML = '';
                        }*/
                        var cardInfo = document.getElementsByClassName('info-box-3');
                        cardInfo[0].style.display = 'none';
                        const sugerencia = document.createElement('option');
                        sugerencia.textContent = dataProductos[i];
                        sugerencia.id = 'producto'+i;
                        sugerencia.value = dataProductos[i];
                        sugerencias.appendChild(sugerencia);

                        if(searchValue == "") {
                            sugerencias.style.display = 'none';
                        }
                        //sugOption[0].appendChild = dataProductos[i];
                        //sugerencias.style.display = 'block'
                    }
                    console.log(dataProductos);
                } else {
                    sugerencias.style.display = 'none';
                    sugerencias.innerHTML = '';
                }
                
                //$('#c-vta-prom').attr('placeholder', 'Venta promedio: '+data.data.promedio);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });

    document.getElementById("sugerencias").addEventListener('change', (event) => {
        var dataProductos = [];
        let value = event.target.value;
        const cve_art = value.split(" ")[0];
        const sub_alm = value.split(" ")[2];
        console.log(value);
        console.log('cve_art: '+cve_art);
        console.log('sub_alm: '+sub_alm);
        $.ajax({
            url: '/getProductDataById',
            type: 'POST',
            data: { searchValue: cve_art, sub_alm: sub_alm },
            success: function(data) {
                //sugerencias.style.display = 'block';
                //sugerencias.innerHTML = '';
                var cardInfo = document.getElementsByClassName('info-box-3');
                var cardInfoTitle = document.getElementsByClassName('info-box-3-title');
                var cardInfoContent = document.getElementsByClassName('info-box-3-content');
                var cardInfoContentCod = document.getElementsByClassName('info-box-3-content-cod');
                var cardInfoContentProm = document.getElementsByClassName('info-box-3-content-prom');
                var cardInfoContentSub = document.getElementsByClassName('info-box-3-content-sub');
                var cardInfoContentBar = document.getElementsByClassName('info-box-3-content-bar');
                cardInfoTitle[0].innerHTML = data.data.descripcion;
                /*cardInfoContent[0].innerHTML = `Promedio de ventas: `+data.data.promedio+`<br>
                                                Sub Almacén: `+sub_alm+`<br> 
                                                Código de barras: `+data.data.barcode;*/
                cardInfoContentCod[0].innerHTML = 'Clave de artículo: '+data.data.codigo;
                cardInfoContentProm[0].innerHTML = 'Promedio de ventas: '+data.data.promedio;
                cardInfoContentSub[0].innerHTML = 'Sub Almacén: '+data.data.subalm;
                cardInfoContentBar[0].innerHTML = 'Código de barras: '+data.data.barcode;
                if (window.innerWidth <= 575) {
                cardInfo[0].style.display = 'block';
                } else {
                cardInfo[0].style.display = 'flex';
                }
                var sugerencias = document.getElementById('sugerencias');
                sugerencias.innerHTML = '';
                sugerencias.style.display = 'none';
                //$('#c-vta-prom').attr('placeholder', 'Venta promedio: '+data.data.promedio);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });
    
});