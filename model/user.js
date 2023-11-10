module.exports = {
    getUserData:function (conexion, user, funcion) {
        //conexion.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email], [password], funcion);
        var data;
        new conexion.Request()
            .input('user', user)
            .query('SELECT * FROM tcausr WHERE nombre = @user', async (error, results) => {
                console.log('se hizo el select');
                console.log('results');
                console.log(results.recordset);
                console.log('results length');
                console.log(results.recordset.length);
                console.log('results puesto');
                console.log(results.recordsets[0][0].puesto.trim());
                data = results.recordset;
                return data;
                //return results.recordset;
            });
    },
}