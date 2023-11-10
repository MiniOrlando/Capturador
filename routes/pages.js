var express = require('express');
var router = express.Router();
const pagesController = require("../controllers/pagesController")

/* GET home page. */
router.get('/maxmin', pagesController.maxmin);
router.post('/maxmin', pagesController.auth);
router.get('/captura', pagesController.captura);
router.get('/rebajas', pagesController.rebajas);
router.post('/getProductData', pagesController.getProductData);
router.post('/getTopTenProductsData', pagesController.getTopTenProductsData);
router.post('/getProductDataById', pagesController.getProductDataById);
router.post('/editarDatosMM', pagesController.editarDatosMM);
router.post('/guardarDatosMM', pagesController.guardarDatosMM);
router.post('/eliminarDatosMM', pagesController.eliminarDatosMM);

module.exports = router;