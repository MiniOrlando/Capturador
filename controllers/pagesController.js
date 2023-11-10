const jwt = require('jsonwebtoken');
const conexion = require('../config/config');
const moment = require('moment');

module.exports={
    auth:async function (req, res) {
        if(req.session.loggedin) {
            var dateToConsult = moment().format('YYYY-MM-DD');
            dateToConsult = dateToConsult.replace(/-/gi, '');
            console.log(dateToConsult);
            new conexion.Request()
            .input('usr', req.session.nombre_lar)
            .input('dateToConsult', dateToConsult)
            .query('SELECT * FROM cap_maxmin WHERE usr = @usr AND fec_cre >= @dateToConsult', async(error, results) => {
                data = {
                    nombre_lar: req.session.nombre_lar,
                    puesto: req.session.puesto,
                    sucursal: req.session.sucursal,
                    tabla: results.recordset
                }
                res.render('pages/maxmin', {data:data});
            });
        } else {
            try{
                //RECIBE LAS VARIABLES DEL HTML
                const user = req.body.user.toUpperCase().trim()
                const contraseña = req.body.password
                console.log("Usuario: "+user+" Contraseña: "+contraseña);
        
                //COMPRUEBA EXISTENCIA DE DATOS Y DE ESTAR MAL RECARGA LA PÁGINA CON UNA ALERTA
                if(!user || !contraseña){
                    console.log("Usuario y contraseña vacíos");
                    res.render('login/login', {
                        alert: true,
                        alertTitle: "Error",
                        alertText: "No ha ingresado usuario o contraseña",
                        alertIcon: "error",
                        alertButton: "Ok"
                    })
                }
                
                //BUSCA LOS DATOS DE ACCESO EN LA DB
                else{
                    console.log("Usuario y contraseña no vacíos");
                    new conexion.Request()
                    .input('user', user)
                    .query('SELECT * FROM tcausr WHERE nombre = @user', async (error, results) => {
                        
                        //SI NO EXISTE EL USUARIO O LA CONTRASEÑA NO COINCIDE RECARGA LOGIN CON UNA ALERTA
                        if(results.recordset.length == 0 || contraseña != results.recordsets[0][0].pwd.trim()){
                            console.log('Usuario no existe o contraseña incorrecta')
                            res.render('login/login', {
                                alert: true,
                                alertTitle: "Error",
                                alertText: "Datos de acceso incorrectos",
                                alertIcon: "error",
                                alertButton: "Ok"
                            });  
                        }
                        
                        //EN CASO DE QUE EL USUARIO SEA CORRECTO, ACCEDE AL DASHBOARD
                        else{
                            console.log('usuario si existe')
                            //GENERA EL TOKEN
                            const token = jwt.sign({id:user}, process.env.JWT_SECRETO, {
                                expiresIn: process.env.JWT_TIEMPO_EXPIRA
                            })
                            console.log(process.env.JWT_SECRETO);
        
                            //GENERA LA COOKIE
                            const cookiesOptions = {
                                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
                                httpOnly: true
                            }
                            res.cookie('jwt', token, cookiesOptions)
        
                            //LO REDIRIGUE AL DASHBOARD
                            console.log('dashboard')
                            req.session.loggedin = true;
                            req.session.user = user;

                            var data;
                            const nombre_lar = results.recordsets[0][0].nombre_lar.trim();
                            const puesto = results.recordsets[0][0].puesto.trim();
                            const sucursal = results.recordsets[0][0].cia_ventas.trim();
                            req.session.nombre_lar = nombre_lar;
                            req.session.puesto = puesto;
                            req.session.sucursal = sucursal;

                            var today = new Date();
                            today = new Date().toDateString().split(" ");
                            console.log("todays date", today);

                            var dateToConsult = moment().format('YYYY-MM-DD');
                            dateToConsult = dateToConsult.replace(/-/gi, '');
                            console.log(dateToConsult);
                            
                            new conexion.Request()
                            .input('usr', nombre_lar)
                            .input('dateToConsult', dateToConsult)
                            .query('SELECT * FROM cap_maxmin WHERE usr = @usr AND fec_cre >= @dateToConsult', async(error, results) => {
                                data = {
                                    nombre_lar: nombre_lar,
                                    puesto: puesto,
                                    sucursal: sucursal,
                                    tabla: results.recordset,
                                    alert: true,
                                    alertTitle: "¡Bienvenido!",
                                    alertText: "Datos de acceso correctos",
                                    alertIcon: "success",
                                    alertButton: "Ok"
                                }
                                console.log(results.recordset);
                                console.log('length: '+results.recordset.length);
                                res.render('pages/maxmin', {data:data});
                            });
                            
                            //res.redirect('../pages/');
                        }
                    })
                }
        
            //MANEJO DEL ERROR
            }catch(error){
                console.log(error)
            }
        }
    },

    maxmin:function (req,res) {
        if(req.session.loggedin) {
            var dateToConsult = moment().format('YYYY-MM-DD');
            dateToConsult = dateToConsult.replace(/-/gi, '');
            console.log(dateToConsult);
            new conexion.Request()
            .input('usr', req.session.nombre_lar)
            .input('dateToConsult', dateToConsult)
            .query('SELECT * FROM cap_maxmin WHERE usr = @usr AND fec_cre >= @dateToConsult', async(error, results) => {
                data = {
                    nombre_lar: req.session.nombre_lar,
                    puesto: req.session.puesto,
                    sucursal: req.session.sucursal,
                    tabla: results.recordset
                }
                res.render('pages/maxmin', {data:data});
            });
        } else {
            res.redirect('/');
        }
    },

    captura:function (req,res) {
        if(req.session.loggedin) {
            data = {
                nombre_lar: req.session.nombre_lar,
                puesto: req.session.puesto
            }
            res.render('pages/captura', {data:data});
        } else {
            res.redirect('/');
        }
    },

    rebajas:function (req,res) {
        if(req.session.loggedin) {
            data = {
                nombre_lar: req.session.nombre_lar,
                puesto: req.session.puesto
            }
            res.render('pages/rebajas');
        } else {
            res.redirect('/');
        }
    },

    getProductData: function(req, res) {
        // OBTENEMOS VALORES CODIGO Y SUCURSAL PARA REALIZAR BÚSQUEDA
        const sucursal = req.session.sucursal;
        const codigo = req.body.searchValue;
        // CONFIGURAMOS ALMC, ALMM Y CODE PARA QUE FUNCIONEN COMO CALUSULAS WHERE PARA DEFINIR LA BÚSQUEDA
        const almC = sucursal+"C";
        const almM = sucursal+"M";
        var code = codigo+"%";
        // ACCEDEMOS A LA DB PARA OBTENER DATOS
        new conexion.Request()
        .input('code', code)
        .input('sucursal', sucursal)
        .input('almc', almC)
        .input('almm', almM)
        .query(`SELECT DISTINCT TOP 10
        iar.art CveArt, iar.cve_lar Barcode, iars.alm Almacen, iars.sub_alm SubAlm, iar.lin Linea, iar.des1 Descripcion, iars.existencia Existencia, iar.marca Marca
        FROM inviar iar
        JOIN invart iart ON iar.art = iart.art
        JOIN invars iars ON iar.art = iars.cve_art
        WHERE iars.alm = @sucursal AND iars.sub_alm IN (@almc,@almm) AND (iar.art LIKE @code OR iar.des1 LIKE @code OR iar.cve_lar LIKE @code)
        ORDER BY iar.art ASC`, async(error, results) => {
            // SI HEMOS OBTENIDO 1 O MÁS RESULTADOS EN NUESTRA BÚQUEDA, CONTINUAMOS, CASO CONTRARIO ES QUE NO HAY COINCIDENCIAS
            if (results.rowsAffected>0) {
                console.log("4. results: ");
                console.log(results);
                // DEFINIMOS VARIABLE CON DATOS QUE OCUPAREMOS MÁS ADELANTE
                const dataTemp = {
                    codigo: results.recordsets[0][0].CveArt,
                    existenciaAlmC: results.recordsets[0][0].Existencia,
                    descripcion: results.recordsets[0][0].Descripcion.trim(),
                    barcode: results.recordsets[0][0].Barcode.trim(),
                    subalm: results.recordsets[0][0].SubAlm.trim(),
                    productos: results.recordset
                }
                // CREAMOS UNA NUEVA CONSULTA PARA SABER LA VENTA PROMEDIO
                new conexion.Request()
                .input('codigo', dataTemp.codigo)
                .query(`SELECT * FROM resumendos WHERE Codigo = @codigo`, async(error, results) => {
                    console.log(results);
                    // SI OBTENEMOS MÁS DE UN RESULTADO ES PORQUE TIENE VALORES EN ALMACÉN C Y M
                    if (results.rowsAffected > 1) {
                        var datos = results.recordsets;
                        console.log('datos');
                        console.log(datos);
                        // SUMAMOS LOS VALORES EN ALMACÉN C Y M PARA OBTENER EL PROMEDIO FINAL
                        var promedio = results.recordsets[0][0].PromUnidades + results.recordsets[0][1].PromUnidades;
                        promedio = Math.round(promedio * 10000) / 10000;
                        // CREAMOS UNA VARIABLE DATA CON TODA LA INFORMACIÓN
                        const data = {
                            nombre_lar: req.session.nombre_lar,
                            puesto: req.session.puesto,
                            sucursal: req.session.sucursal,
                            codigo: dataTemp.codigo,
                            existenciaAlmC: dataTemp.existenciaAlmC,
                            descripcion: dataTemp.descripcion,
                            barcode: dataTemp.barcode,
                            subalm: dataTemp.subalm,
                            productos: dataTemp.productos,
                            promedio: promedio
                        }
                        // ENVIAMOS LA INFORMACIÓN
                        res.send({data:data});
                    // SI SÓLO ES UN RESULTADO ES PORQUE SÓLO TIENEN VALORES EN C Ó EN M, APLICAMOS DIRECTO EL VALOR
                    } else if (results.rowsAffected == 1) {
                        const data = {
                            nombre_lar: req.session.nombre_lar,
                            puesto: req.session.puesto,
                            sucursal: req.session.sucursal,
                            codigo: dataTemp.codigo,
                            existenciaAlmC: dataTemp.existenciaAlmC,
                            descripcion: dataTemp.descripcion,
                            barcode: dataTemp.barcode,
                            subalm: dataTemp.subalm,
                            productos: dataTemp.productos,
                            promedio: results.recordsets[0][0].PromUnidades
                        }
                        // ENVIAMOS LA INFORMACIÓN
                        res.send({data:data});
                    }
                });
                //getPromedioVentas(data);
                //res.send({data:data});
            } else {
                //TODO: Enviar un SweetAlert que diga "Sin existencias"
            }
        });
    },

    getTopTenProductsData: function(req, res) {
        console.log('entrando en método para buscar top 10 artículos');
        // OBTENEMOS VALORES CODIGO Y SUCURSAL PARA REALIZAR BÚSQUEDA
        const sucursal = req.session.sucursal;
        const codigo = req.body.searchValue;
        // CONFIGURAMOS ALMC, ALMM Y CODE PARA QUE FUNCIONEN COMO CALUSULAS WHERE PARA DEFINIR LA BÚSQUEDA
        const almC = sucursal+"C";
        const almM = sucursal+"M";
        var code = codigo+"%";
        // ACCEDEMOS A LA DB PARA OBTENER DATOS
        new conexion.Request()
        .input('code', code)
        .input('sucursal', sucursal)
        .input('almc', almC)
        .input('almm', almM)
        .query(`SELECT DISTINCT TOP 10
        iar.art CveArt, iars.sub_alm SubAlm, iar.des1 Descripcion
        FROM inviar iar
        JOIN invars iars ON iar.art = iars.cve_art
        WHERE iars.sub_alm IN (@almc,@almm) AND (iar.art LIKE @code OR iar.des1 LIKE @code OR iar.cve_lar LIKE @code)
        ORDER BY iar.art ASC`, async(error, results) => {
            // SI HEMOS OBTENIDO 1 O MÁS RESULTADOS EN NUESTRA BÚQUEDA, CONTINUAMOS, CASO CONTRARIO ES QUE NO HAY COINCIDENCIAS
            console.log('query ejecutado');
            
            if (results.rowsAffected>0) {
                console.log('rowsAffected > 0');
                console.log("4. results: ");
                console.log(results);
                // DEFINIMOS VARIABLE CON DATOS QUE OCUPAREMOS MÁS ADELANTE
                const data = {
                    productos: results.recordset,
                    hayCoincidencias: true,
                    msg: "Hay coincidencias"
                }
                // ENVIAMOS LA INFORMACIÓN
                res.send({data:data});
            } else {
                console.log('rowsAffected <= 0');
                const data = {
                    hayCoincidencias: false,
                    msg: 'No hay coincidencias'
                }
                res.send({data:data});
                //TODO: Enviar un SweetAlert que diga "Sin existencias"
            }

            
        });
    },

    getProductDataById: function(req, res) {
        const sucursal = req.session.sucursal;
        const codigo = req.body.searchValue;
        const sub_alm = req.body.sub_alm;
        console.log("cve_art seleccionado: "+codigo);
        console.log("sucursal seleccionado: "+sucursal);
        console.log("sub_alm seleccionado: "+sub_alm);
        new conexion.Request()
        .input('codigo', codigo)
        .input('sucursal', sucursal)
        .input('subAlm', sub_alm)
        .query(`SELECT DISTINCT 
        iar.art CveArt, iar.cve_lar Barcode, iars.alm Almacen, iars.sub_alm SubAlm, iar.lin Linea, iar.des1 Descripcion, iars.existencia Existencia, iar.marca Marca
        FROM inviar iar
        JOIN invart iart ON iar.art = iart.art
        JOIN invars iars ON iar.art = iars.cve_art
        WHERE iars.alm = @sucursal AND iars.sub_alm = @subAlm AND iar.art = @codigo 
        ORDER BY iar.art`, async(error, results) => {
            if(results.rowsAffected>0) {
                const dataTemp = {
                    codigo: results.recordsets[0][0].CveArt,
                    existenciaAlmC: results.recordsets[0][0].Existencia,
                    descripcion: results.recordsets[0][0].Descripcion.trim(),
                    barcode: results.recordsets[0][0].Barcode.trim(),
                    subalm: results.recordsets[0][0].SubAlm.trim(),
                    productos: results.recordset
                }
                // CREAMOS UNA NUEVA CONSULTA PARA SABER LA VENTA PROMEDIO
                new conexion.Request()
                .input('codigo', dataTemp.codigo)
                .query(`SELECT * FROM resumendos WHERE Codigo = @codigo`, async(error, results) => {
                    console.log(results);
                    // SI OBTENEMOS MÁS DE UN RESULTADO ES PORQUE TIENE VALORES EN ALMACÉN C Y M
                    if (results.rowsAffected > 1) {
                        var datos = results.recordsets;
                        console.log('datos');
                        console.log(datos);
                        // SUMAMOS LOS VALORES EN ALMACÉN C Y M PARA OBTENER EL PROMEDIO FINAL
                        var promedio = results.recordsets[0][0].PromUnidades + results.recordsets[0][1].PromUnidades;
                        promedio = Math.round(promedio * 10000) / 10000;
                        // CREAMOS UNA VARIABLE DATA CON TODA LA INFORMACIÓN
                        const data = {
                            nombre_lar: req.session.nombre_lar,
                            puesto: req.session.puesto,
                            sucursal: req.session.sucursal,
                            codigo: dataTemp.codigo,
                            existenciaAlmC: dataTemp.existenciaAlmC,
                            descripcion: dataTemp.descripcion,
                            barcode: dataTemp.barcode,
                            subalm: dataTemp.subalm,
                            productos: dataTemp.productos,
                            promedio: promedio
                        }
                        // ENVIAMOS LA INFORMACIÓN
                        res.send({data:data});
                    // SI SÓLO ES UN RESULTADO ES PORQUE SÓLO TIENEN VALORES EN C Ó EN M, APLICAMOS DIRECTO EL VALOR
                    } else if (results.rowsAffected == 1) {
                        const data = {
                            nombre_lar: req.session.nombre_lar,
                            puesto: req.session.puesto,
                            sucursal: req.session.sucursal,
                            codigo: dataTemp.codigo,
                            existenciaAlmC: dataTemp.existenciaAlmC,
                            descripcion: dataTemp.descripcion,
                            barcode: dataTemp.barcode,
                            subalm: dataTemp.subalm,
                            productos: dataTemp.productos,
                            promedio: results.recordsets[0][0].PromUnidades
                        }
                        // ENVIAMOS LA INFORMACIÓN
                        res.send({data:data});
                    }
                });
            }
        })
    },

    guardarDatosMM: function(req, res) {
        if(req.session.loggedin) {
            console.log('entrando en el método para guardar datos');
            const codigo = req.body.cCodigo;
            const descripcion = req.body.cDescripcion;
            const promedio = req.body.cPromedio;
            const canasta = req.body.cCanasta;
            const catalogo = req.body.cCatalogo;
            const maxCjsC = req.body.cMaxCjsC;
            const minCjsC = req.body.cMinCjsC;
            const maxCjsM = req.body.cMaxCjsM;
            const minPzsM = req.body.cMinPzsM;
            const subAlm = req.body.cSubAlm;
            var date = moment().format('YYYY-MM-DD HH:mm:ss');
            console.log(date);
            var dateToConsult = moment().format('YYYY-MM-DD');
            dateToConsult = dateToConsult.replace(/-/gi, '');
            console.log(dateToConsult);

            // ANTES DE INCERTAR EL REGISTRO VALIDAMOS QUE NO EXISTA NINGÚN REGISTRO PARA 
            // ESE ARTÍCULO EN LA MISMA FECHA
            new conexion.Request()
            .input('codigo', codigo)
            .input('subAlm', subAlm)
            .input('dateToConsult', dateToConsult)
            .query(`SELECT * FROM cap_maxmin 
                    WHERE cve_art = @codigo AND sub_alm = @subAlm AND fec_cre >= @dateToConsult`, 
                    async(err, result) => {
                        if(result.rowsAffected!=0) {
                            const data = {
                                nombre_lar: req.session.nombre_lar,
                                puesto: req.session.puesto,
                                sucursal: req.session.sucursal,
                                addToList: false,
                                alert: true,
                                alertTitle: "¡ERROR!",
                                alertText: "Ya existe un registro para este producto el día de hoy",
                                alertIcon: "error"
                            }
                            res.send({data:data});
                        } else {
                            // COMPROBAMOS QUE NO EXISTE NINGÚN REGISTRO IGUAL EN LA MISMA FECHA
                            // AHORA SI INSERTAMOS
                            new conexion.Request()
                            .input('codigo', codigo)
                            .input('descripcion', descripcion)
                            .input('promedio', promedio.trim())
                            .input('canasta', canasta)
                            .input('catalogo', catalogo)
                            .input('maxCjsC', maxCjsC)
                            .input('minCjsC', minCjsC)
                            .input('maxCjsM', maxCjsM)
                            .input('minPzsM', minPzsM)
                            .input('date', date)
                            .input('usr', req.session.nombre_lar)
                            .input('sucursal', req.session.sucursal)
                            .input('subAlm', subAlm)
                            .query("INSERT INTO cap_maxmin VALUES (@codigo, @descripcion, @promedio, @canasta, @catalogo, @maxCjsC, @minCjsC, @maxCjsM, @minPzsM, '0', '0', @date, @usr, @sucursal, @subAlm)", async(err, result) => {
                                console.log('Se insertó, creo');
                                console.log(codigo);
                                console.log(descripcion);
                                console.log(promedio.trim());
                                console.log(canasta);
                                console.log(catalogo);
                                console.log(maxCjsC);
                                console.log(minCjsC);
                                console.log(maxCjsM);
                                console.log(minPzsM);
                                console.log(date);
                                console.log(req.session.nombre_lar);
                                console.log(req.session.sucursal);
                                console.log(result);
                                const data = {
                                    nombre_lar: req.session.nombre_lar,
                                    puesto: req.session.puesto,
                                    sucursal: req.session.sucursal,
                                    addToList: true,
                                    alert: true,
                                    alertTitle: "¡Guardado!",
                                    alertText: "Producto agregado correctamente",
                                    alertIcon: "success"
                                }
                                res.send({data:data});
                            });
                        }
                    });
        } else {
            res.redirect('/');
        }
    },

    editarDatosMM: function(req, res) {
        if(req.session.loggedin) {
            console.log('entrando en el método para actualizar datos');
            const codigo = req.body.cCodigo;
            const canasta = req.body.cCanasta;
            const catalogo = req.body.cCatalogo;
            const maxCjsC = req.body.cMaxCjsC;
            const minCjsC = req.body.cMinCjsC;
            const maxCjsM = req.body.cMaxCjsM;
            const minPzsM = req.body.cMinPzsM;
            var date = moment().format('YYYY-MM-DD HH:mm:ss');
            console.log(date);
            var dateToConsult = moment().format('YYYY-MM-DD');
            dateToConsult = dateToConsult.replace(/-/gi, '');
            console.log(dateToConsult);

            new conexion.Request()
            .input('codigo', codigo)
            .input('canasta', canasta)
            .input('catalogo', catalogo)
            .input('maxCjsC', maxCjsC)
            .input('minCjsC', minCjsC)
            .input('maxCjsM', maxCjsM)
            .input('minPzsM', minPzsM)
            .input('date', date)
            .input('dateToConsult', dateToConsult)
            .query(`UPDATE cap_maxmin 
                    SET cta_bsc = @canasta, art_cat_serv = @catalogo, 
                    max_cjs_c = @maxCjsC, min_cjs_c = @minCjsC,
                    max_cjs_m = @maxCjsM, min_pzs_m = @minPzsM,
                    fec_cre = @date
                    WHERE cve_art = @codigo AND fec_cre >= @dateToConsult`, async(err, result) => {
                console.log('Se actualizó, creo');
                console.log(result);
                const data = {
                    nombre_lar: req.session.nombre_lar,
                    puesto: req.session.puesto,
                    sucursal: req.session.sucursal,
                    alert: true,
                    alertTitle: "¡Guardado!",
                    alertText: "Producto agregado correctamente",
                    alertIcon: "success"
                }
                res.send({data:data});
            });
        } else {
            res.redirect('/');
        }
    },

    eliminarDatosMM: function(req, res) {
        if (req.session.loggedin) {
            console.log('entrando en el método para eliminar datos');
            const codigo = req.body.cCodigo;
            var dateToConsult = moment().format('YYYY-MM-DD');
            dateToConsult = dateToConsult.replace(/-/gi, '');
            console.log(dateToConsult);
            console.log("codigo: "+codigo.trim());
            console.log("------");

            new conexion.Request()
            .input('codigo', codigo.trim())
            .input('dateToConsult', dateToConsult)
            .query(`DELETE FROM cap_maxmin 
                    WHERE cve_art = @codigo AND fec_cre >= @dateToConsult`, async(err, result) => {
                console.log('Se eliminó, creo');
                console.log(result);
                const data = {
                    nombre_lar: req.session.nombre_lar,
                    puesto: req.session.puesto,
                    sucursal: req.session.sucursal,
                    alert: true,
                    alertTitle: "¡Eliminado!",
                    alertText: "Producto eliminado correctamente",
                    alertIcon: "success"
                }
                res.send({data:data});
            });
        } else {
            res.redirect('/');
        }
    }
}