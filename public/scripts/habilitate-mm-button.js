$(document).ready(function() {
    console.log('entrando en habilitate-mm-button.js');
    $('#btn-add-maxmin').prop('disabled', true);
    var ini = new Date();
    ini.setHours(8,0,0);
    var fin = new Date();
    fin.setHours(17,50,0);
    var hoy = new Date();

    var habilitate = ini.getTime() <= hoy.getTime() && hoy.getTime() <= fin.getTime();

    if (habilitate) {
        $('#btn-add-maxmin').prop('disabled', false);
    }

});