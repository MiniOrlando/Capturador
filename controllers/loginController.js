const jwt = require('jsonwebtoken')
const conexion = require('../config/config')
const {promisify} = require('util')

//PROCEDIMIENTO PARA INICIAR SESION
module.exports={
    login:function (req,res) {
        res.render('login/login', {
            alert: false,
            alertTitle: "Error",
            alertText: "No ha ingresado usuario o contraseña",
            alertIcon: "error",
            alertButton: "Ok"
        });
    },

    logout:function (req,res) {
        req.session.loggedin = false;
        req.session.nombre_lar = null;
        req.session.puesto = null;
        req.session.sucursal = null;
        console.log(req.session.loggedin);
        console.log(req.session.nombre_lar);
        console.log(req.session.puesto);
        console.log(req.session.sucursal);
        res.render('login/login', {
            alert: false,
            alertTitle: "Error",
            alertText: "No ha ingresado usuario o contraseña",
            alertIcon: "error",
            alertButton: "Ok"
        });
        
    },

    auth:async function (req, res) {
        /*if(req.session.loggedin) {
            new conexion.Request()
            .query('SELECT * FROM cap_maxmin', async(error, results) => {
                data = {
                    nombre_lar: req.session.nombre_lar,
                    puesto: req.session.puesto,
                    sucursal: req.session.sucursal,
                    tabla: results.recordset
                }
                res.render('pages/maxmin', {data:data});
            });
        } else {*/
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
                            
                            console.log(nombre_lar);
                            new conexion.Request()
                            .input('usr', nombre_lar)
                            .query('SELECT * FROM cap_maxmin WHERE usr = @usr', async(error, results) => {
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
            /*}catch(error){
                console.log(error)
            }*/
        } catch(error){
            console.log(error)
        }
    }
}
/*
}
*/