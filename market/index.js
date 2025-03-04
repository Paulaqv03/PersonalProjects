const readline = require("readline");

let rl = readline.createInterface(
    process.stdin, 
    process.stdout 
);

const categorias = {
    verduras: [],
    aseo: [],
    mecato: [],
};

function menu(){
    console.log("Selecciones una categoria: ");
    console.log("1. Verduras");
    console.log("2. Aseo");
    console.log("3. Mecato");
    console.log("4. Salir");

    rl.question("Ingrese una opcion: ", (opcion) => {
        switch(opcion){
            case "1": 
                gestionCategorias("verduras");
                break;
            case "2": 
                gestionCategorias("aseo");
                break;
            case "3":
                gestionCategorias("mecato");
                break;
            case "4": 
                console.log("Saliendo...");
                rl.close();
                break;
            default:
                console.log("Opcion invalida");
                menu();
        }
    });
}

function gestionCategorias(nombre){
    console.log(`Gestionar categorias ${nombre}: `);
    console.log("1. Agregar productos");
    console.log("2. Eliminar productos");
    console.log("3. Ver lista");
    console.log("4. Volver");

    rl.question("Ingrese una opcion: ", (opcion) => {
        switch (opcion) {
            case "1":
                rl.question(`Ingrese el producto para la categoria ${nombre}: `, (producto) => {
                    categorias[nombre].push(producto);
                    console.log(`El producto ${producto} fue agregado a la categoria de ${nombre}`);
                    gestionCategorias(nombre);
                });
                break;
            case "2": 
                rl.question(`Ingrese el producto que desea eliminar de ${nombre}: `, (producto) =>{
                    let index = categorias[nombre].indexOf(producto);
                    if(index !== -1){
                        categorias[nombre].splice(index, 1);
                        console.log(`El producto ${producto} ha sido eliminado de ${nombre} `);
                    } else{
                        console.log("Producto no encontrado")
                    }
                    gestionCategorias(nombre);
                });
                break;
            case "3":
                console.log(`Lista de ${nombre}`, categorias[nombre]);
                gestionCategorias(nombre);
                break;
            case "4": 
                menu();
                break;
            default:
                console.log("Opcion invalida");
                gestionCategorias(nombre);
        }
    });
}

menu();