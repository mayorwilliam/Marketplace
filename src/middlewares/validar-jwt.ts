import { Response, Request, NextFunction} from 'express';
import { RequestExt } from "../interfaces/request.inferface";
import { verifyToken } from "../helpers/jwt.handle";

import Usuario from "../models/usuario";


export const validarJWT = async( expressRequest: Request, res: Response<any, Record<string, any>>, next: NextFunction ): Promise<any> => {
    const req = expressRequest as RequestExt;

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { id } = verifyToken(`${token}`) as { id: string};

        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( id );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        
        
        req.usuario = usuario;
        return next();

    } catch (error) {

        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
        
    }

}
