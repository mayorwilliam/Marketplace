import { Response, NextFunction, Request} from 'express';
import { RequestExt } from "../interfaces/request.inferface";


const esAdminRole = ( expressRequest: Request, res: Response, next: NextFunction ): any =>  {
    const req = expressRequest as RequestExt;
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;
    
    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}

const esVendedor = ( expressRequest: Request, res: Response, next: NextFunction ) => {
    const req = expressRequest as RequestExt;
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;
    
    if ( rol !== 'COMPRADOR_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } no es vendedor - No puede hacer esto`
        });
    }

    next();
}


export {
    esAdminRole,
    esVendedor
}