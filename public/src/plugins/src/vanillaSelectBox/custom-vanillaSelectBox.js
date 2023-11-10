selectBoxProductos = new vanillaSelectBox("#selectProductos", {
    "keepInlineStyles":true,
    "maxHeight": 200,
    "minWidth": 250,
    "width":350,
    "maxWidth":500,
    "search": true,
    "placeHolder": "Seleccione un producto..." 
});
selectBox = new vanillaSelectBox("#selectPanes", {
    "keepInlineStyles":true,
    "maxHeight": 200,
    "minWidth":210,
    "search": true,
    "placeHolder": "Choose..." 
});
frameworkCMS = new vanillaSelectBox("#frameworkCMS", {
    "maxHeight": 400,
    "search": true,
    translations: { "all": "All", "items": "Selected" },
    "minWidth":210,
    "placeHolder": "Choose..." 
});
selectBox3 = new vanillaSelectBox("#multipleSelect", {
    "minWidth":210,
    "maxHeight": 200,
    "search": true,
    "stayOpen":true
});