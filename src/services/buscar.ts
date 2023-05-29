import { Response, Request} from 'express';
import { RequestExt } from "../interfaces/request.inferface";
import mongoose from 'mongoose';

import { Usuario, Producto } from "../models";

const coleccionesPermitidas = [
    'usuarios',
    'productos',
];

const buscarUsuarios = async( termino = '', res: Response ) => {

    const esMongoID = mongoose.Types.ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });

}


const buscarProductos = async( termino = '', res: Response ) => {

    const esMongoID = mongoose.Types.ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const producto = await Producto.findById(termino)
                            .populate('categoria','nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const productos = await Producto.find({ nombre: regex, estado: true })
                            .populate('categoria','nombre')

    res.json({
        results: productos
    });

}


const buscar = ( expressRequest: Request, res: Response ) => {
    const req = expressRequest as RequestExt;
    const { coleccion, termino  } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            })
    }

}



export {
    buscar
}