import { Router } from "express";
import { check } from "express-validator";

import { validarJWT, validarCampos, esAdminRole, esVendedor  } from "../middlewares";

import { crearProducto,
        obtenerProductos,
        obtenerProducto } from "../services/productos";

import { existeProductoPorId } from "../helpers/db-validators";

const routerProductos = Router();


//  Obtener todos los productos solo si eres Administrador y estás autentificado
routerProductos.get('/',[
    validarJWT,
    esAdminRole
    ],
     obtenerProductos );

// Obtener un producto por id 
routerProductos.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], obtenerProducto );



// Crear Producto - privado
routerProductos.post('/', [ 
    validarJWT,
    esVendedor,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto );




export default routerProductos;