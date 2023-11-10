$(document).ready(function() {
  console.log('entrando en search.js')
  $('#search-art').click(function() {
    var searchValue = $('#c-codigo').val();
    $.ajax({
      url: '/getProductData',
      type: 'POST',
      data: { searchValue: searchValue },
      success: function(data) {
        // Handle the response data here
        search(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  });

  document.getElementById("c-codigo").addEventListener('keypress', function(event) {
    console.log("Se presionó una tecla");
    if (event.key === 'Enter') {
      var searchValue = $('#c-codigo').val();
      $.ajax({
        url: '/getProductData',
        type: 'POST',
        data: { searchValue: searchValue },
        success: function(data) {
          // Handle the response data here
          search(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
      });
    }
  });

  function search(data) {
    var cardInfo = document.getElementsByClassName('info-box-3');
    var cardInfoTitle = document.getElementsByClassName('info-box-3-title');
    var cardInfoContent = document.getElementsByClassName('info-box-3-content');
    var cardInfoContentCod = document.getElementsByClassName('info-box-3-content-cod');
    var cardInfoContentProm = document.getElementsByClassName('info-box-3-content-prom');
    var cardInfoContentSub = document.getElementsByClassName('info-box-3-content-sub');
    var cardInfoContentBar = document.getElementsByClassName('info-box-3-content-bar');
    cardInfoTitle[0].innerHTML = data.data.descripcion;
    /*cardInfoContent[0].innerHTML = `Promedio de ventas: `+data.data.promedio+`<br>
                                    Sub Almacén: `+data.data.subalm+`<br>
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
  }
});
  