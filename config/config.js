const conexion = require('mssql')
const jwt = require('jsonwebtoken')

//MÓDULOS A EXPORTAR
module.exports = conexion

//VARIABLES DE CONEXION
/*var SQLConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false
    }
}*/

var SQLConfig = {
    user: 'sa',
    password: '12345678',
    server: 'localhost',
    database: 'TCADBMAB',
    options: {
        encrypt: false
    }
}


//MANEJO DEL ERROR
conexion.on('error', error => {
    console.log("Error de conexión. " , error)
})

//ESTABLECE LA CONEXION
conexion.connect(SQLConfig, error => {
    if(error){
        throw error 
    }
    console.log('Conexión establecida')
})