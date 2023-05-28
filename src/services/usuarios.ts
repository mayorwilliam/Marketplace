import { Response, Request} from 'express';
import { RequestExt } from "../interfaces/request.inferface";
import bcryptjs from "bcryptjs";

import Usuario from "../models/usuario";
import Producto from "../models/producto";



const usuariosGet = async(expressRequest: Request, res: Response) => {
    const req = expressRequest as RequestExt;

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}

const obtenerUsuario= async(expressRequest: Request, res: Response ) => {
    const req = expressRequest as RequestExt;
    const { id } = req.params;
    const usuario = await Usuario.findById( id )
    res.json( usuario );

}

const obtenerProductosVendedor = async(expressRequest: Request, res: Response ) => {
    const req = expressRequest as RequestExt;
    const { id } = req.params;
    const idComprador = await Usuario.findById( id )
                            .populate('usuario', 'nombre')
    const producto = await Producto.find( { "usuario"  : idComprador._id} )
    res.json( producto );

}

const usuariosPost = async(expressRequest: Request, res: Response) => {
    const req = expressRequest as RequestExt;
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}







export {
    usuariosGet,
    obtenerProductosVendedor,
    obtenerUsuario,
    usuariosPost
}